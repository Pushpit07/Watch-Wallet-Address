import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import Moralis from "moralis";

const MORALIS_APP_ID = "3Fg7xGs8RJcm6hqploLq21zyTJuivkud3yHrYqmZ";
const MORALIS_SERVER_URL = "https://vc8ylcqwpen1.usemoralis.com:2053/server";

function MyApp({ Component, pageProps }) {
	Moralis.start({ serverUrl: MORALIS_SERVER_URL, appId: MORALIS_APP_ID });

	return (
		<MoralisProvider appId={MORALIS_APP_ID} serverUrl={MORALIS_SERVER_URL}>
			<Component {...pageProps} />
		</MoralisProvider>
	);
}

export default MyApp;
