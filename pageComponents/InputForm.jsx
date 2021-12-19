import { useState } from "react";

export default function InputForm({ getTransactions, setAccount }) {
    const [chain, setChain] = useState("matic testnet");

    function chainChanged(event) {
        setChain(
            event.target[event.target.selectedIndex].dataset.chainlookupvalue
        );
    }

    function accountChanged(event) {
        setAccount(event.target.value);
    }

    return (
        <>
            <div className="w-2/3 grid grid-cols-5 gap-4">
                <label
                    htmlFor="address"
                    className="mb-1 block text-sm font-medium text-gray-700 text-left"
                >
                    Wallet address
                </label>
            </div>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    getTransactions(chain);
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
                                <option data-chainlookupvalue="matic testnet">
                                    Mumbai (Matic Testnet)
                                </option>
                                <option data-chainlookupvalue="matic">
                                    Polygon (Matic) Mainnet
                                </option>
                                <option data-chainlookupvalue="eth">
                                    Ethereum Mainnet
                                </option>
                                <option data-chainlookupvalue="ropsten">
                                    Ropsten
                                </option>
                                <option data-chainlookupvalue="rinkeby">
                                    Rinkeby
                                </option>
                                <option data-chainlookupvalue="goerli">
                                    Goerli
                                </option>
                                <option data-chainlookupvalue="kovan">
                                    Kovan
                                </option>
                                <option data-chainlookupvalue="bsc">
                                    BSC Mainnet
                                </option>
                                <option data-chainlookupvalue="bsc testnet">
                                    BSC Testnet
                                </option>
                                <option data-chainlookupvalue="avalanche">
                                    Avalanche Mainnet
                                </option>
                                <option data-chainlookupvalue="avalanche testnet">
                                    Avalanche Testnet
                                </option>
                                <option data-chainlookupvalue="fantom">
                                    Fantom Mainnet
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                <input
                    type="submit"
                    className="self-end h-full cursor-pointer bg-white hover:bg-gray-100 text-gray-600 font-semibold border border-gray-300 rounded"
                />
            </form>
        </>
    );
}
