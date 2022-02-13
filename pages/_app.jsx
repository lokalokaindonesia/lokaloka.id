import { Provider as ReduxProvider } from 'react-redux'
import { Provider } from 'next-auth/client'
import { store } from '@/redux/store'
import '../styles/globals.css'
import '../styles/tidio.css'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Script from 'next/script'
import Loading from '@/components/ui/Loading'
import LoadingOverlay from 'react-loading-overlay'

function MyApp({ Component, pageProps }) {
    const router = useRouter()

    const [loading, setLoading] = useState(false)

    Router.events.on('routeChangeStart', (url) => {
        setLoading(true)
    })
    Router.events.on('routeChangeComplete', (url) => {
        setLoading(false)
    })

    return (
        <Provider session={pageProps.session}>
            <ReduxProvider store={store}>
                <Script strategy='lazyOnload' src={`https://www.googletagmanager.com/gtag/js?id=G-1PVD2RCM5H`} />
                <Script strategy='lazyOnload'>
                    {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-1PVD2RCM5H');`}
                </Script>
                <Script strategy='lazyOnload'>{`
                    !function(){var e=window,i=document,t="customerly",n="queue",o="load",r="settings",u=e[t]=e[t]||[];if(u.t){return void u.i("[customerly] SDK already initialized. Snippet included twice.")}u.t=!0;u.loaded=!1;u.o=["event","attribute","update","show","hide","open","close"];u[n]=[];u.i=function(t){e.console&&!u.debug&&console.error&&console.error(t)};u.u=function(e){return function(){var t=Array.prototype.slice.call(arguments);return t.unshift(e),u[n].push(t),u}};u[o]=function(t){u[r]=t||{};if(u.loaded){return void u.i("[customerly] SDK already loaded. Use customerly.update to change settings.")}u.loaded=!0;var e=i.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://messenger.customerly.io/launcher.js";var n=i.getElementsByTagName("script")[0];n.parentNode.insertBefore(e,n)};u.o.forEach(function(t){u[t]=u.u(t)})}();
                        
                        customerly.load({
                            "app_id": "77d26414",
                            position: {
                                desktop: {  
                                    bottom: 130,
                                    side: 50
                                },
                                mobile: {
                                    bottom: 60,
                                    side: 30
                                }
                            }
                        });
                    `}</Script>
                {loading ? <LoadingOverlay active={loading} spinner className='w-screen h-screen bg-slate-500/20'></LoadingOverlay> : <Component {...pageProps} />}
            </ReduxProvider>
        </Provider>
    )
}

export default MyApp
