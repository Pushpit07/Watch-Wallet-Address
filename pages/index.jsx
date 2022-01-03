import { useState } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import InputForm from "../pageComponents/InputForm";
import AccountInfo from "../pageComponents/AccountInfo";
import TxTable from "../pageComponents/TxTable";
import Signup from "../pageComponents/Signup";

export default function Home({ account, setAccount }) {
    const [txnsData, setTxnsData] = useState([]);
    const [nativeBalance, setNativeBalance] = useState("");
    const [tokenBalances, setTokenBalances] = useState([]);
    const [tokenTransfers, setTokenTransfers] = useState([]);
    const [nftTransfers, setNftTransfers] = useState([]);
    const [accountNFTs, setAccountNFTs] = useState([]);
    const Web3Api = useMoralisWeb3Api();
    const { Moralis } = useMoralis();

    async function getTransactions(chain) {
        const _options = { chain: chain, address: account };

        // Native Balance on the blockchain
        const _nativeBal = await Moralis.Web3API.account.getNativeBalance(_options);
        setNativeBalance(Moralis.Units.FromWei(_nativeBal.balance).toString().slice(0, 5));

        // All Transactions on the blockchain
        const _data = await Web3Api.account.getTransactions(_options);
        setTxnsData(_data.result);

        // All Token balances on the blockchain
        const _balances = await Moralis.Web3API.account.getTokenBalances(_options);
        setTokenBalances(_balances);

        // All Token transfers on the blockchain
        const _tokenTransfers = await Moralis.Web3API.account.getTokenTransfers(_options);
        setTokenTransfers(_tokenTransfers.result);

        // All NFTs of the user
        const _accountNFTs = await Moralis.Web3API.account.getNFTs(_options);
        setAccountNFTs(_accountNFTs.result);

        // All NFT transfers on the blockchain
        const _nftTransfers = await Moralis.Web3API.account.getNFTTransfers(_options);
        setNftTransfers(_nftTransfers.result);

        async function subscribeTransactions() {
            let txQuery1 = new Moralis.Query("PolygonTransactions");
            txQuery1.equalTo("from_address", account);

            let txQuery2 = new Moralis.Query("PolygonTransactions");
            txQuery2.equalTo("to_address", account);

            const query = Moralis.Query.or(txQuery1, txQuery2);
            let subscription = await query.subscribe();
            subscription.on("create", (newTransaction) => {
                console.log("newTransaction");
                setTxnsData((txnsData) => [newTransaction.attributes, ...txnsData]);
            });
        }
        subscribeTransactions();
    }

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

                <AccountInfo account={account} nativeBalance={nativeBalance} />

                <TxTable
                    txnsData={txnsData}
                    tokenTransfers={tokenTransfers}
                    nftTransfers={nftTransfers}
                    tokenBalances={tokenBalances}
                    accountNFTs={accountNFTs}
                />
            </main>
        </div>
    );
}
