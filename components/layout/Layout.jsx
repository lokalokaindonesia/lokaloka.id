import Head from 'next/head'
import Footer from '@/components/layout/footer/Footer'
import Header from '@/components/layout/header/Header'
import Banner from '@/components/ui/Banner'

const Layout = ({ title, children }) => {
    return (
        <div className='bg-blueGray-50'>
            <Head>
                <title>{title}</title>
                <meta name='description' content='Lokaloka Indonesia - Belanja oleh-oleh dengan mudah !!!' />
            </Head>
            {/* Header - Navbar */}
            <div className='sticky top-0 z-30 backdrop-filter backdrop-blur-sm bg-opacity-75 shadow bg-white'>
                <Header />
            </div>

            {children}

            {/* Footer */}
            <Footer />
            <Banner msg='This is Beta Version, You transaction only a simulation. Please leave a feedback on this email (kampungvector@gmail.com)' />
        </div>
    )
}

export default Layout
