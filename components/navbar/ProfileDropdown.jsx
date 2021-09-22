/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { signOut, useSession } from 'next-auth/client'
import Link from 'next/link'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const ProfileDropdown = () => {
    const [session, loading] = useSession()

    const logoutHandler = () => {
        if (session) {
            return signOut({
                redirect: true,
                callbackUrl: process.env.NEXTAUTH_URL,
            })
        }
    }

    return (
        <Menu as='div' className='relative inline-block text-left'>
            <Menu.Button className='w-10 h-10'>
                {!session.user.image && <img alt='Profile Image' src={`https://ui-avatars.com/api/?name=${session.user.name}`} className='rounded-full' />}
                {session.user.image && <Image src={session.user.image} alt='Profile Image' className='rounded-full' width={1} height={1} priority layout='responsive' />}
            </Menu.Button>

            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
            >
                <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                        <Menu.Item>
                            {({ active }) => (
                                <div className='cursor-pointer w-full'>
                                    <Link href='/profile/my-account'>
                                        <div className={classNames(active ? 'bg-gray-100 text-blueGray-800' : 'text-blueGray-700', 'block w-full text-left px-4 py-2 text-sm')}>
                                            Account
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <div className='cursor-pointer w-full'>
                                    <Link href='/profile/my-orders'>
                                        <div className={classNames(active ? 'bg-gray-100 text-blueGray-800' : 'text-blueGray-700', 'block w-full text-left px-4 py-2 text-sm')}>
                                            My orders
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </Menu.Item>
                        <hr className='border border-blueGray-200' />
                        <Menu.Item>
                            {({ active }) => (
                                <div className='cursor-pointer w-full'>
                                    <Link href='#'>
                                        <div className={classNames(active ? 'bg-gray-100 text-blueGray-800' : 'text-blueGray-700', 'block w-full text-left px-4 py-2 text-sm')}>
                                            Support
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </Menu.Item>
                        <hr className='border border-blueGray-200' />
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={() => logoutHandler()}
                                    type='submit'
                                    className={classNames(active ? 'bg-gray-100 text-blueGray-800' : 'text-blueGray-700', 'block w-full text-left px-4 py-2 text-sm')}
                                >
                                    Sign out
                                </button>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}

export default ProfileDropdown
