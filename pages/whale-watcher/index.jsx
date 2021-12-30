import Head from "next/head";
import styles from "../../styles/Home.module.css";
import { useMoralis } from "react-moralis";

const WhaleWatcher = ({ account, setAccount }) => {
    const { Moralis } = useMoralis();

    const onSubmit = async () => {
        let alert_methods = document.getElementsByName("alert_method");
        let selected_alert_method;
        alert_methods.forEach((alert_method) => {
            if (alert_method.checked) {
                selected_alert_method = alert_method.value;
            }
        });

        let condition = document.getElementById("condition").value;
        let threshold = document.getElementById("threshold").value;
        let note = document.getElementById("note").value;

        // capture address
        const params = {
            address: account.toLowerCase(),
            alert_method: selected_alert_method,
            conditions: condition,
            threshold: threshold,
            notes: note,
        };

        const watch = await Moralis.Cloud.run("watchAddress", params);
        // user feedback
        if (watch) {
            window.alert(JSON.stringify(account.toLowerCase() + " added to watch list 🐋", 0, 2));
        } else {
            window.alert(JSON.stringify("🚫 You're already watching this address 🚫", 0, 2));
        }
    };

    function accountChanged(event) {
        setAccount(event.target.value.toLowerCase());
    }

    return (
        <>
            <Head>
                <title>Whale Watcher</title>
                <meta name="description" content="Watch Wallet Address" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>🐋 &nbsp;Whale Watcher</h1>
                <p className={styles.description}>On the lookout for whales</p>

                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        onSubmit();
                    }}
                    className="w-2/3 grid grid-cols-5 gap-4"
                >
                    <div className="col-span-4">
                        <div className="relative rounded-md shadow-sm">
                            <input
                                type="text"
                                name="address"
                                id="address"
                                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-4 pr-12 sm:text-sm border-gray-300 rounded-md"
                                placeholder="Enter a wallet address to lookup"
                                autoComplete="off"
                                onChange={accountChanged}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                                <label htmlFor="blockchain" className="sr-only">
                                    Blockchain
                                </label>
                                <select
                                    id="blockchain"
                                    name="blockchain"
                                    className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md cursor-pointer"
                                    onChange={(e) => chainChanged(e)}
                                >
                                    <option data-chainlookupvalue="matic testnet">Mumbai (Matic Testnet)</option>
                                    <option data-chainlookupvalue="matic">Polygon (Matic) Mainnet</option>
                                    <option data-chainlookupvalue="eth">Ethereum Mainnet</option>
                                    <option data-chainlookupvalue="ropsten">Ropsten</option>
                                    <option data-chainlookupvalue="rinkeby">Rinkeby</option>
                                    <option data-chainlookupvalue="goerli">Goerli</option>
                                    <option data-chainlookupvalue="kovan">Kovan</option>
                                    <option data-chainlookupvalue="bsc">BSC Mainnet</option>
                                    <option data-chainlookupvalue="bsc testnet">BSC Testnet</option>
                                    <option data-chainlookupvalue="avalanche">Avalanche Mainnet</option>
                                    <option data-chainlookupvalue="avalanche testnet">Avalanche Testnet</option>
                                    <option data-chainlookupvalue="fantom">Fantom Mainnet</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <input
                        type="submit"
                        className="self-end h-full cursor-pointer bg-white hover:bg-gray-100 text-gray-600 font-semibold border border-gray-300 rounded"
                    />

                    <div className="col-span-5 mt-8">
                        <div className="flex justify-center">
                            <div className="form-check form-check-inline mr-10">
                                <label className="form-check-label inline-block text-gray-800 font-semibold">Alert Method:</label>
                            </div>
                            <div className="form-check form-check-inline mr-10">
                                <input
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    type="checkbox"
                                    name="alert_method"
                                    id="telegram"
                                    value="telegram"
                                />
                                <label className="form-check-label inline-block text-gray-800 cursor-pointer" htmlFor="telegram">
                                    Telegram
                                </label>
                            </div>
                            <div className="form-check form-check-inline mr-10">
                                <input
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    type="checkbox"
                                    name="alert_method"
                                    id="twitter"
                                    value="twitter"
                                />
                                <label className="form-check-label inline-block text-gray-800 cursor-pointer" htmlFor="twitter">
                                    Twitter
                                </label>
                            </div>
                            <div className="form-check form-check-inline">
                                <input
                                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                    type="checkbox"
                                    name="alert_method"
                                    id="email"
                                    value="email"
                                />
                                <label className="form-check-label inline-block text-gray-800 cursor-pointer" htmlFor="email">
                                    Email
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-5 mt-4">
                        <div className="flex justify-center">
                            <div className="form-check form-check-inline mr-10">
                                <label className="form-check-label inline-block text-gray-800 font-semibold">Conditions:</label>
                            </div>
                            <select
                                id="condition"
                                className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-1 pl-3 pr-12 text-gray-500 border-gray-300 sm:text-sm rounded-md cursor-pointer"
                            >
                                <option name="conditions" value="increase">
                                    ⬆ Increase
                                </option>
                                <option name="conditions" value="decrease">
                                    ⬇ Decrease
                                </option>
                                <option name="conditions" value="change">
                                    𝚫 Change
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className="col-span-5 mt-4 w-full">
                        <div className="flex justify-center w-full">
                            <label className="block w-2/5">
                                <div className="form-check form-check-inline">
                                    <span className="form-check-label inline-block text-gray-800 font-semibold">Threshold</span>
                                </div>
                                <input
                                    type="number"
                                    id="threshold"
                                    className="w-full focus:ring-indigo-500 focus:border-indigo-500 text-gray-500 border-gray-300 sm:text-sm rounded-md cursor-pointer form-input block"
                                    placeholder="$ 300,000"
                                    step="0.001"
                                />
                            </label>
                        </div>
                    </div>

                    <div className="col-span-5 mt-4 w-full">
                        <div className="flex justify-center w-full">
                            <label className="block w-2/5">
                                <div className="form-check form-check-inline">
                                    <span className="form-check-label inline-block text-gray-800 font-semibold">Note</span>
                                </div>
                                <textarea
                                    id="note"
                                    className="w-full focus:ring-indigo-500 focus:border-indigo-500 text-gray-500 border-gray-300 sm:text-sm rounded-md cursor-pointer form-input block"
                                    rows="3"
                                    placeholder="Eg. Binance ETH Whale"
                                ></textarea>
                            </label>
                        </div>
                    </div>
                </form>
            </main>
        </>
    );
};

export default WhaleWatcher;
