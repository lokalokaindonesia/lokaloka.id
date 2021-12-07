import { Provider as ReduxProvider } from 'react-redux'
import { Provider } from 'next-auth/client'
import { store } from '@/redux/store'
import '../styles/globals.css'
import '../styles/tidio.css'
import { Router, useRouter } from 'next/router'
import { useEffect, useState } from 'react'
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
      {loading ? <Loading /> : <Component {...pageProps} />}
    </ReduxProvider>
  </Provider>
}

export default MyApp