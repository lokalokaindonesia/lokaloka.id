import Head from 'next/head'
import Footer from '@/components/layout/footer/Footer'
import Header from '@/components/layout/header/Header'

const Layout = ({ title, children }) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name='description' content='Lokaloka Indonesia - Belanja oleh-oleh dengan mudah !!!' />
            </Head>

            {/* Header - Navbar */}
            <div className='sticky top-0 z-50 bg-white'>
                <Header />
            </div>

            {children}

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Layout
