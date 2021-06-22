import React from 'react'
import { signIn } from 'next-auth/client'

const signin = ({ providers }) => {
    signIn(providers.google.id, {
        callbackUrl: process.env.NEXTAUTH_URL,
    })
    return <div></div>
}

export const getStaticProps = async () => {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/providers`)
    const data = await res.json()

    return {
        props: {
            providers: data,
        },
    }
}

export default signin
