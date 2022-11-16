import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
    <Head>
    <title>Subplorer</title>
    <link rel="icon" href="/sparq_logo.svg" />
  </Head>
  <Component {...pageProps} />
  </>
  )
}

export default MyApp
