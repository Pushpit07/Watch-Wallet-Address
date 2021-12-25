import { useState, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import InputForm from "../pageComponents/InputForm";
import TxTable from "../pageComponents/TxTable";
import Signup from "../pageComponents/Signup";

export default function Home() {
    const [displayData, setDisplayData] = useState([]);
    const [account, setAccount] = useState("0x48b7cedf1d50ce6595a027c9234d5e5bef54e09c");
    const Web3Api = useMoralisWeb3Api();
    const { Moralis } = useMoralis();

    async function getTransactions(chain) {
        const options = { chain: chain, address: account };
        const data = await Web3Api.account.getTransactions(options);
        setDisplayData(data.result);

        async function subscribeTransactions() {
            let txQuery1 = new Moralis.Query("PolygonTransactions");
            txQuery1.equalTo("from_address", account);

            let txQuery2 = new Moralis.Query("PolygonTransactions");
            txQuery2.equalTo("to_address", account);

            const query = Moralis.Query.or(txQuery1, txQuery2);
            let subscription = await query.subscribe();
            subscription.on("create", (newTransaction) => {
                console.log("newTransaction");
                setDisplayData((displayData) => [newTransaction.attributes, ...displayData]);
            });
        }
        subscribeTransactions();
    }

    useEffect(() => {
        console.log("index-", account);
    }, [account]);

    return (
        <div className={styles.container}>
            <Head>
                <title>Watch Wallet Address</title>
                <meta name="description" content="Watch Wallet Address" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* <Signup /> */}

            <main className={styles.main}>
                <h1 className={styles.title}>Watch Wallet Address</h1>

                <p className={styles.description}>Enter a wallet address and choose required parameters</p>

                <InputForm getTransactions={getTransactions} setAccount={setAccount} />

                <TxTable displayData={displayData} />
            </main>
        </div>
    );
}
