// Định nghĩa một biến APP_ID chứa chuỗi khóa ứng dụng Agora
let APP_ID = "8c2fe20d8a3e49c9ae76ed72c506a6ad"

// Khởi tạo các biến để lưu trạng thái của ứng dụng
let token = null; // Token để xác thực người dùng (hiện tại null)
let uid = String(Math.floor(Math.random() * 10000)) // ID ngẫu nhiên của người dùng

let client; // Đối tượng AgoraRTM cho việc giao tiếp Real-Time Messaging
let channel; // Kênh trong AgoraRTM

// Lấy tham số truy vấn (query string) từ URL của trình duyệt
let queryString = window.location.search
let urlParams = new URLSearchParams(queryString)
let roomId = urlParams.get('room') // Lấy giá trị của tham số 'room'

// Nếu không có roomId, chuyển hướng người dùng đến trang 'lobby.html'
if (!roomId) {
    window.location = 'lobby.html'
}

let localStream; // Đối tượng luồng video và âm thanh của người dùng hiện tại
let remoteStream; // Đối tượng luồng video và âm thanh từ người dùng khác
let peerConnection; // Đối tượng RTCPeerConnection cho việc kết nối WebRTC

// Cấu hình máy chủ ICE (Interactive Connectivity Establishment) cho WebRTC
const servers = {
    iceServers: [
        {
            urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302']
        }
    ]
}

// Định nghĩa ràng buộc (constraints) cho việc lấy luồng video và âm thanh
let constraints = {
    video: {
        deviceId: '1',
        width: { min: 640, ideal: 1920, max: 1920 },
        height: { min: 480, ideal: 1080, max: 1080 },
    },
    audio: true
}
// Hàm khởi tạo ứng dụng
let init = async () => {
    // Tạo đối tượng AgoraRTM và đăng nhập với uid và token (hiện tại token là null)
    client = await AgoraRTM.createInstance(APP_ID)
    await client.login({ uid, token })

    // Tạo kênh với roomId và tham gia kênh đó
    channel = client.createChannel(roomId)
    await channel.join()

    // Xử lý sự kiện khi thành viên mới tham gia và khi thành viên rời khỏi kênh
    channel.on('MemberJoined', handleUserJoined)
    channel.on('MemberLeft', handleUserLeft)

    // Xử lý tin nhắn từ người dùng khác
    client.on('MessageFromPeer', handleMessageFromPeer)

    // Lấy luồng video và âm thanh của người dùng hiện tại
    localStream = await navigator.mediaDevices.getUserMedia(constraints)
    document.getElementById('user-1').srcObject = localStream

}


// Xử lý khi có thành viên rời khỏi kênh
let handleUserLeft = (MemberId) => {
    document.getElementById('user-2').style.display = 'none' // Ẩn luồng video của người dùng khác
    document.getElementById('user-1').classList.remove('smallFrame') // Loại bỏ class 'smallFrame' của luồng video của người dùng hiện tại
}

// Xử lý tin nhắn từ người dùng khác
let handleMessageFromPeer = async (message, MemberId) => {
    // Giải mã tin nhắn và kiểm tra loại tin nhắn
    message = JSON.parse(message.text)

    if (message.type === 'offer') {
        createAnswer(MemberId, message.offer)
    }

    if (message.type === 'answer') {
        addAnswer(message.answer)
    }

    if (message.type === 'candidate') {
        if (peerConnection) {
            peerConnection.addIceCandidate(message.candidate)
        }
    }
}


// Xử lý khi có thành viên mới tham gia kênh
let handleUserJoined = async (MemberId) => {
    console.log('A new user joined the channel:', MemberId)
    createOffer(MemberId)
}

// Hàm tạo kết nối WebRTC và khởi tạo luồng video và âm thanh
let createPeerConnection = async (MemberId) => {
    peerConnection = new RTCPeerConnection(servers)

    remoteStream = new MediaStream()
    document.getElementById('user-2').srcObject = remoteStream
    document.getElementById('user-2').style.display = 'block'

    document.getElementById('user-1').classList.add('smallFrame')

    // Nếu không có luồng video của người dùng hiện tại, lấy luồng video mới
    if (!localStream) {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        document.getElementById('user-1').srcObject = localStream
    }

    // Thêm các track của luồng video và âm thanh của người dùng hiện tại vào kết nối
    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    })

    // Xử lý khi có luồng từ người dùng khác được thêm vào
    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track)
        })
    }

    // Xử lý ICE candidate và gửi chúng đến người dùng khác
    peerConnection.onicecandidate = async (event) => {
        if (event.candidate) {
            client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'candidate', 'candidate': event.candidate }) }, MemberId)
        }
    }
}

// Hàm tạo offer cho việc kết nối WebRTC
let createOffer = async (MemberId) => {
    await createPeerConnection(MemberId)

    let offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)

    // Gửi offer đến người dùng khác thông qua AgoraRTM
    client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'offer', 'offer': offer }) }, MemberId)
}

// Hàm tạo answer cho offer từ người dùng khác
let createAnswer = async (MemberId, offer) => {
    await createPeerConnection(MemberId)

    await peerConnection.setRemoteDescription(offer)

    let answer = await peerConnection.createAnswer()
    await peerConnection.setLocalDescription(answer)

    // Gửi answer đến người dùng khác thông qua AgoraRTM
    client.sendMessageToPeer({ text: JSON.stringify({ 'type': 'answer', 'answer': answer }) }, MemberId)
}



// Hàm thêm answer từ người dùng khác
let addAnswer = async (answer) => {
    if (!peerConnection.currentRemoteDescription) {
        peerConnection.setRemoteDescription(answer)
    }
}

// Hàm rời khỏi kênh và đăng xuất khỏi AgoraRTM
let leaveChannel = async () => {
    await channel.leave()
    await client.logout()
}

// Hàm bật/tắt camera
let toggleCamera = async () => {
    let videoTrack = localStream.getTracks().find(track => track.kind === 'video')

    if (videoTrack.enabled) {
        videoTrack.enabled = false
        document.getElementById('camera-btn').style.backgroundColor = 'rgb(255, 80, 80)'
    } else {
        videoTrack.enabled = true
        document.getElementById('camera-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
    }
}

// Hàm bật/tắt microphone
let toggleMic = async () => {
    

    if(localStream){
        let audioTrack = localStream.getTracks().find(track => track.kind === 'audio')
         if (audioTrack.enabled) {
        audioTrack.enabled = false
        document.getElementById('mic-btn').style.backgroundColor = 'rgb(255, 80, 80)'
    } else {
        audioTrack.enabled = true
        document.getElementById('mic-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
    }
    }
   
}

// Sự kiện trước khi đóng trình duyệt để đảm bảo rời khỏi kênh và đăng xuất
window.addEventListener('beforeunload', leaveChannel)

// Gán sự kiện cho nút bật/tắt camera và microphone
document.getElementById('camera-btn').addEventListener('click', toggleCamera)
document.getElementById('mic-btn').addEventListener('click', toggleMic)

// Khởi tạo ứng dụng
init()
