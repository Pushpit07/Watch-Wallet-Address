import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script'

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link rel="manifest" href="/manifest.json" />
					<link rel="apple-touch-icon" href="/icon.png"></link>
					<meta name="theme-color" content="#fff" />
				</Head>
				<body>
					<Main />
					<NextScript />
					<Script src="https://kit.fontawesome.com/0366dd7992.js" crossorigin="anonymous"></Script>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
