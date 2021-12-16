import { useState } from 'react'; 
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import InputForm from "./InputForm";
import TxTable from "./TxTable";

export default function Home() {
	const { authenticate, isAuthenticated, logout, user } = useMoralis();
	const [displayData, setDisplayData] = useState([]);
	const [account, setAccount] = useState("0x48b7cedF1D50cE6595a027c9234D5e5Bef54E09C");
	const Web3Api = useMoralisWeb3Api();

	async function getTransactions(chain) {
		const options = { chain: chain, address: account };
		const data = await Web3Api.account.getTransactions(options);
		setDisplayData(data.result);
	}

	console.log(displayData)
	return (
		<div className={styles.container}>
			<Head>
				<title>Watch Wallet Address</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>Watch Wallet Address</h1>

				<p className={styles.description}>
					Enter a wallet address and choose required parameters
				</p>
				
				<InputForm getTransactions={getTransactions} setAccount={setAccount} />	

				<TxTable displayData={displayData} />
			</main>

			<footer className={styles.footer}>
				<a href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" target="_blank" rel="noopener noreferrer">
					Powered by{" "}
					<span className={styles.logo}>
						<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
					</span>
				</a>
			</footer>
		</div>
	);
}
