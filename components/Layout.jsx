import Head from 'next/head'
import Footer from '@/components/footer/Footer'
import Header from '@/components/header/Header'

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
