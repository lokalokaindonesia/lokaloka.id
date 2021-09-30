import { MenuAlt3Icon } from '@heroicons/react/solid'

const MobileDropdown = () => {
    return (
        <div className='md:hidden'>
            <MenuAlt3Icon className='text-blueGray-500 w-7 h-7' />
        </div>
    )
}

export default MobileDropdown