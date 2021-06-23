import NextAuth from "next-auth";
import Providers from "next-auth/providers";

const options = {
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Providers.Facebook({
            clientId: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET
        }),
        Providers.Credentials({
            name: 'Credentials',

            authorize: async (credentials, req) => {
                const { email, password } = req.body
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
                    method: "POST",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    body: JSON.stringify({ identifier: email, password })
                })

                const user = res.json()

                if (user) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    database: process.env.NEXT_PUBLIC_DATABASE_URL,
    session: {
        jwt: true,
    },
    callbacks: {
        session: async (session, user) => {
            session.jwt = user.jwt;
            session.id = user.id;
            return Promise.resolve(session);
        },
        jwt: async (token, user, account) => {
            const isSignIn = user ? true : false;
            if (isSignIn) {
                const provider = account.provider === 'credentials' ? 'local' : account.provider
                const accessToken = account.provider === 'credentials' ? user.jwt : account?.accessToken

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}/callback?access_token=${accessToken}`);
                const data = await response.json();

                if (account.provider !== 'google' || account.id === 'credentials') {
                    if (response.ok) {
                        token.jwt = data.jwt;
                        token.id = data.user.id;
                        return
                    }
                    return console.log({ message: data.message[0].messages[0].message })
                }
                token.jwt = data.jwt;
                token.id = data.user.id;
            }
            return Promise.resolve(token);
        },
    },
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth