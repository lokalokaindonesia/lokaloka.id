import Head from 'next/head'
import Footer from '@/components/layout/footer/Footer'

const Layout = ({ title, children }) => {
    return (
        <div className='bg-blueGray-50'>
            <Head>
                <title>{title}</title>
                <meta name='description' content='Lokaloka Indonesia - Belanja oleh-oleh dengan mudah !!!' />
            </Head>

            {children}

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Layout
