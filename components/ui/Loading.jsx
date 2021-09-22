import Image from 'next/image'
import { useEffect, useRef } from 'react'
const Loading = () => {
    const ref = useRef(null)
    useEffect(() => {
        import('@lottiefiles/lottie-player')
    })
    return (
        <div className='w-screen h-screen flex items-center justify-center'>
            <div className='w-96 h-96'>
                <lottie-player
                    src='https://assets10.lottiefiles.com/datafiles/bEYvzB8QfV3EM9a/data.json'
                    id='verified'
                    ref={ref}
                    autoplay
                    loop
                    mode='normal'
                    style={{ width: '100%', height: '100%' }}
                ></lottie-player>
            </div>
        </div>
    )
}

export default Loading
