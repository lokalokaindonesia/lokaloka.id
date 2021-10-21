import { XIcon } from '@heroicons/react/solid'

const close = () => {
    return true
}

setTimeout(() => {
    close()
}, 3000)

const Toast = ({ status, content, icon }) => {
    return (
        <div className='p-4 border border-blueGray-100 bg-white shadow-md max-w-md rounded-md top-16 right-10 absolute'>
            <div className='flex space-x-4 justify-start'>
                {icon}
                <div>
                    <h6 className='text-base font-bold text-orange-500 capitalize'>{status}</h6>
                    <span className='text-sm text-blueGray-600'>{content}</span>
                </div>
                <XIcon className='w-6 h-6 text-blueGray-700' onClick={() => close()} />
            </div>
        </div>
    )
}

export default Toast
