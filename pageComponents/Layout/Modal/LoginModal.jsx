import React from "react";
import { useMoralis } from "react-moralis";

export default function LoginModal({ showLoginModal, setShowLoginModal }) {
    const { authenticate } = useMoralis();
    async function authWalletConnect() {
        const user = authenticate({
            provider: "walletconnect",
            // chainId: 56,
            // mobileLinks: [
            //   "metamask",
            //   "trust",
            //   "rainbow",
            //   "argent",
            //   "imtoken",
            //   "pillar",
            // ],
            signingMessage: "Welcome!",
        });
    }

    return (
        <>
            {showLoginModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div className="items-center content-center place-content-center justify-center border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex p-5 pt-6 pb-4 border-b border-solid border-blueGray-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">Authenticate</h3>
                                </div>
                                {/*body*/}
                                <div className="relative px-10 pb-10 flex-auto">
                                    <p className="mt-6 mb-10 text-gray-600 text-sm leading-relaxed text-center">Authenticate using any one of these methods</p>
                                    <button
                                        type="button"
                                        className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-primary-100 hover:bg-primary-300 active:bg-grey-900 focus:outline-none border-4 border-white transition-all"
                                        onClick={() => authenticate()}
                                    >
                                        Authenticate via Metamask
                                    </button>
                                    <button
                                        type="button"
                                        className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-primary-100 hover:bg-primary-300 active:bg-grey-900 focus:outline-none border-4 border-white transition-all"
                                        onClick={() => authWalletConnect()}
                                    >
                                        Authenticate via WalletConnect
                                    </button>
                                </div>
                                {/*footer*/}
                                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowLoginModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}
