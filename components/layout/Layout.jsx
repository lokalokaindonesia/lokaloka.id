import Head from 'next/head'
import Script from 'next/script'
import Footer from '@/components/layout/footer/Footer'
import Header from '@/components/layout/header/Header'
import HeaderNotSignIn from '@/components/layout/header/HeaderNotSignIn'
import { useSession } from 'next-auth/client'
import BottomMenuBar from '../bottomBar/BottomMenuBar'

const Layout = ({ title, children }) => {
    const [session, loading] = useSession()
    const clientKey = process.env.MIDTRANS_CLIENT_KEY
    const urlMidtransSnap = process.env.NEXT_PUBLIC_MIDTRANS_SNAP
    return (
        <div className='bg-white text-slate-800'>
            <Head>
                <title>{title}</title>
                {/* <script src='//code.tidio.co/nntihri39cqwi4krn3esqrl2m11zgv3c.js' async></script> */}
                <meta name='description' content='Lokaloka - Belanja oleh-oleh online' />
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
