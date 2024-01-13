import '@/styles/globals.css'
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";


export default function App({ Component, pageProps:{ session, ...pageProps } }) {
  // console.log(pageProps)
  return(
    <div>
    <SessionProvider session={session}>
    <Toaster position="bottom-center" />
     <Component {...pageProps} />
    </SessionProvider>
    </div>
    )
}
