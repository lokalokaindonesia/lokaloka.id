import cookie from 'cookie'

export default async (req, res) => {
    if (req.method === 'POST') {
        const { username, email, password } = req.body

        const strapiRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        })

        const data = await strapiRes.json()

        if (strapiRes.ok) {
            // * SET COOKIE
            res.setHeader('Set-Cookie', cookie.serialize('token', data.jwt, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 60 * 60 * 24 * 7,
                sameSite: 'strict',
                path: '/'
            }))

            return res.status(200).json({ user: data.user })
        }
        return res.status(data.statusCode).json({ message: data.message[0].messages[0].message })

    }
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not Allowed` })
    return
}