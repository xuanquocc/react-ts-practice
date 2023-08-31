import { memo } from 'react'

import './image.css'

interface ImageType {
    src: string
}

const Image = ({src}:ImageType) => {
    return(
        <div className='image-wraper'>
            <img className='image-content' src={src} alt={`img-${src}`} />
        </div>
    )
}

export default memo(Image)
