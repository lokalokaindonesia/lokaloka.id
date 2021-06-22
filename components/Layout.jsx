import Footer from '@/components/Footer'
import Header from '@/components/Header'
import Head from 'next/head'

const Layout = ({ title, children }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
            </Head>

            {/* Header - Navbar */}
            <Header />

            {children}

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Layout
