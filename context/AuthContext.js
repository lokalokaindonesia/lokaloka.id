import { createContext, useState, useEffect } from "react";
import { useRouter } from 'next/router'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => checkUserLoggedIn(), [])

    const router = useRouter()

    // Register
    const register = async (user) => {
        const res = await fetch(`${process.env.NEXT_URL}/api/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })

        const data = await res.json()

        if (res.ok) {
            setUser(data.user)
            router.push('/')
            return
        }
        setError(data.message)
        setError(null)
        return
    }

    // Login
    const login = async ({ email: identifier, password }) => {
        const res = await fetch(`${process.env.NEXT_URL}/api/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ identifier, password })
        })

        const data = await res.json()

        if (res.ok) {
            setUser(data.user)
            router.push('/')
            return
        }
        setError(data.message)
        setError(null)
        return

    }

    // Logout
    const logout = async () => {
        const res = await fetch(`${process.env.NEXT_URL}/api/logout`, {
            method: 'POST'
        })

        if (res.ok) {
            setUser(null)
            router.push('/account/login')
        }
    }

    // Check is User is Logged In
    const checkUserLoggedIn = async () => {
        const res = await fetch(`${process.env.NEXT_URL}/api/user`)
        const data = await res.json()

        if (res.ok) {
            return setUser(data.user)
        }

        return setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, error, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext