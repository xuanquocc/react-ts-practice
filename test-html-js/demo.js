let localStream

const init = async () => {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false})
        document.getElementById('user-1').srcObject = localStream
    } catch (error) {
        
    }
}


document.getElementById('mic-btn').addEventListener('click', toggleMic)
init()