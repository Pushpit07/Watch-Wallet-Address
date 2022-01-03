import { useState } from "react";
import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import Script from "next/script";
import Layout from "../pageComponents/Layout/Layout";

export default function App({ Component, pageProps }) {
    // const [account, setAccount] = useState("0x48b7cedf1d50ce6595a027c9234d5e5bef54e09c");
    const [account, setAccount] = useState("0x159507b2b3829791fAB794581D2aC074F3596013");

    const MORALIS_APP_ID = process.env.NEXT_PUBLIC_MORALIS_APP_ID;
    const MORALIS_SERVER_URL = process.env.NEXT_PUBLIC_MORALIS_SERVER_URL;

    return (
        <>
            <Script src="https://kit.fontawesome.com/0366dd7992.js" crossorigin="anonymous"></Script>
            <Script src="https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js"></Script>
            <MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
                <Layout>
                    <Component {...pageProps} account={account} setAccount={setAccount} />
                </Layout>
            </MoralisProvider>
        </>
    );
}
