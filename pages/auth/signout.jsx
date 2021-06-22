import { signOut } from 'next-auth/client'

const signout = () => {
    signOut({
        redirect: true,
        callbackUrl: process.env.NEXTAUTH_URL,
    })

    return <div></div>
}

export default signout
