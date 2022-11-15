// import '../styles/menja.css'
import '../styles/globals.css'
// import '../styles/style.css'
import { SessionProvider } from 'next-auth/react';
function MyApp({ Component, pageProps }) {
  return (
    <>
    <SessionProvider session={pageProps.session}>
    <Component {...pageProps} />
    </SessionProvider>
    </>
  
  )
}

export default MyApp
