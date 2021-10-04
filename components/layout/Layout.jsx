import Head from 'next/head'
import Footer from '@/components/layout/footer/Footer'
import Header from '@/components/layout/header/Header'
import HeaderNotSignIn from '@/components/layout/header/HeaderNotSignIn'
import Banner from '@/components/ui/Banner'
import { useSession } from 'next-auth/client'
import BottomMenuBar from '../bottomBar/BottomMenuBar'

const Layout = ({ title, children }) => {
    const [session, loading] = useSession()
    const clientKey = process.env.MIDTRANS_CLIENT_KEY
    const urlMidtransSnap = process.env.NEXT_PUBLIC_MIDTRANS_SNAP
    return (
        <div className='bg-blueGray-50 text-blueGray-800'>
            <Head>
                <title>{title}</title>
                <meta name='description' content='Lokaloka Indonesia - Belanja oleh-oleh dengan mudah !!!' />
                <script type='text/javascript' src={urlMidtransSnap} data-client-key={clientKey}></script>
            </Head>
            {/* Header - Navbar */}
            <div className='sticky top-0 z-30 backdrop-filter backdrop-blur-sm bg-opacity-75 shadow bg-white'>{session ? <Header /> : <HeaderNotSignIn />}</div>

            {children}

            {/* Footer */}
            <Footer />

            {/* Bottom Mobile Menu */}
            <BottomMenuBar />
            {/* End Bottom Mobile Menu */}
            {/* <Banner msg='This is Beta Version, You transaction only a simulation. Please leave a feedback on this email (kampungvector@gmail.com)' /> */}
        </div>
    )
}

export default Layout
