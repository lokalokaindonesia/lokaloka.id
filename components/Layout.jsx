import Head from 'next/head'
import { useSession } from 'next-auth/client'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const Layout = ({ title, children }) => {
    const [session, loading] = useSession()
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>

            {/* Header - Navbar */}
            <Header session={session} />

            {children}

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Layout
