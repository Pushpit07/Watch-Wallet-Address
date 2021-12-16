import Document, { Html, Head, Main, NextScript } from "next/document";

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
					<script src="https://kit.fontawesome.com/0366dd7992.js" crossorigin="anonymous"></script>
				</body>
			</Html>
		);
	}
}

export default MyDocument;
