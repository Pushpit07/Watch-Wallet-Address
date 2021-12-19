import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import Script from 'next/script';
import Layout from '../pageComponents/Layout/Layout';

const MORALIS_APP_ID = "3Fg7xGs8RJcm6hqploLq21zyTJuivkud3yHrYqmZ";
const MORALIS_SERVER_URL = "https://vc8ylcqwpen1.usemoralis.com:2053/server";

export default function App({ Component, pageProps }) {
	return (
		<>
			<Script src="https://kit.fontawesome.com/0366dd7992.js" crossorigin="anonymous"></Script>
			<MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</MoralisProvider>
		</>
	);
}
