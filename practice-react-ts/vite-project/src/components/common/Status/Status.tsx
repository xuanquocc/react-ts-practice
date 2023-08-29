import './status.css'
import {memo} from 'react'

interface StatusTagType{
    status: string
}

function StatusTag ({status}: StatusTagType) {
    return(
        <div className={`${status}`}>
            {status}
        </div>
    )
}

export default memo(StatusTag)
