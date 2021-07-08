import axios from "axios";
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
                const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/local`, {
                    identifier: email,
                    password
                })

                const user = res.data

                if (user) {
                    return user
                }

                return null
            }
        })
    ],
    database: process.env.NEXT_PUBLIC_DATABASE_URL,
    session: {
        jwt: true,
    },
    callbacks: {
        jwt: async (token, user, account, profile, isNewUser) => {
            const isSignIn = user ? true : false;
            if (isSignIn) {
                const provider = account.provider === 'credentials' ? 'local' : account.provider
                const accessToken = account.provider === 'credentials' ? user.jwt : account?.accessToken

                if (account.provider !== 'google' || account.id === 'credentials') {
                    try {
                        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
                            headers: {
                                Authorization: 'Bearer ' + user.jwt
                            }
                        })

                        const data = await response.data

                        if (data) {
                            token.jwt = user.jwt
                            token.id = user.user.id
                            token.name = user.user.name
                            token.email = user.user.email
                            return token
                        }
                    } catch (error) {
                        return console.log({ message: error })
                    }
                }

                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/${provider}/callback?access_token=${accessToken}`);
                const data = await response.json();

                token.jwt = data.jwt;
                token.id = data.user.id;
            }
            return Promise.resolve(token);
        },
        session: async (session, user) => {
            session.jwt = user.jwt;
            session.id = user.id;
            return Promise.resolve(session);
        },
    },
};

const Auth = (req, res) => NextAuth(req, res, options);

export default Auth