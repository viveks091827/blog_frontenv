import NavbarWrapper from './navbar';
import '@/styles/globals.css'
import Head from "next/head";
import Script from 'next/script'
import Footer from './footer'
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { SSRProvider } from 'react-bootstrap';

import { useEffect } from 'react';


export default function App({ Component, pageProps }) {


  const SITE_KEY = process.env.NEXT_PUBLIC_SITE_KEY


  return <>
  <SSRProvider>
  <GoogleReCaptchaProvider
      reCaptchaKey = {SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
    <Head>
      <title> Cryptogull </title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <NavbarWrapper />
    <Component {...pageProps} />
    <Footer />
    </GoogleReCaptchaProvider>
    </SSRProvider>
  </>
}
