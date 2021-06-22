import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Head from 'next/head'

const Layout = ({ title, children, session }) => {
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
