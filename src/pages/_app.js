import '@/styles/globals.css'
import Layout from '@/components/layout'
import { LocalStorageProvider } from '@/hooks/useLocalStorage'

export default function App({ Component, pageProps }) {
  return (
    <LocalStorageProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LocalStorageProvider>
  )
}
