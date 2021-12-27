import { Provider as ReduxProvider } from 'react-redux'
import { Provider } from 'next-auth/client'
import { store } from '@/redux/store'
import '../styles/globals.css'
import '../styles/tidio.css'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Script from 'next/script'
import Loading from '@/components/ui/Loading'

function MyApp({
  Component,
  pageProps
}) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  Router.events.on('routeChangeStart', url => {
    setLoading(true)
  })
  Router.events.on('routeChangeComplete', url => {
    setLoading(false)
  })

  return <Provider session={pageProps.session}>
    <ReduxProvider store={store}>
      <Script strategy='lazyOnload' src={`https://www.googletagmanager.com/gtag/js?id=G-1PVD2RCM5H`} />
      <Script strategy='lazyOnload'>
        {
          `window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-1PVD2RCM5H');`
        }
      </Script>
      {loading ? <Loading /> : <Component {...pageProps} />}
    </ReduxProvider>
  </Provider>
}

export default MyApp