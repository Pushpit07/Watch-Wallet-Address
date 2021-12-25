import { useMoralis } from "react-moralis";
import Link from "next/link";
import ErrorBox from "./ErrorBox";

const Navbar = () => {
    const { authenticate, isAuthenticated, authError, logout, user } = useMoralis();
    if (user) console.log(user.attributes.username);

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-3 dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <Link href="/">
                    <a href="#" className="flex">
                        <img src="/icon-512x512.png" alt="logo" className="h-10 mr-2" />
                        <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">Watch Wallet Address</span>
                    </a>
                </Link>

                <div className="flex md:order-2 ml-auto">
                    {isAuthenticated && user ? (
                        <Link
                            href="#"
                            className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                            <span className="md:text-sm md:font-medium">Hello {user.attributes.username}</span>
                        </Link>
                    ) : (
                        <button
                            type="button"
                            className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-primary-100 hover:bg-primary-300 active:bg-grey-900 focus:outline-none border-4 border-white transition-all"
                            onClick={() => authenticate()}
                        >
                            Authenticate via Metamask
                        </button>
                    )}
                </div>

                <div className="flex md:order-3">
                    {isAuthenticated && user ? (
                        <button
                            type="button"
                            className="ml-4 px-5 py-2 rounded-xl text-sm font-medium text-white bg-primary-100 hover:bg-primary-300 active:bg-grey-900 focus:outline-none border-4 border-white transition-all md:text-sm md:font-medium"
                            onClick={() => logout()}
                        >
                            Logout
                        </button>
                    ) : null}

                    {authError && <ErrorBox title={"Auth failed!"} message={authError.message} />}
                </div>

                <div className="hidden w-full md:block md:w-auto ml-auto" id="mobile-menu">
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li className="hover:text-primary-200">
                            <Link
                                href="/"
                                className="block py-2 pr-4 pl-3 text-white bg-blue-700 hover:text-primary-100 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="hover:text-primary-200">
                            <Link
                                href="#"
                                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                About
                            </Link>
                        </li>
                        <li className="hover:text-primary-200">
                            <Link
                                href="#"
                                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Services
                            </Link>
                        </li>
                        <li className="hover:text-primary-200">
                            <Link
                                href="#"
                                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Pricing
                            </Link>
                        </li>
                        <li className="hover:text-primary-200">
                            <Link
                                href="/profile"
                                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:text-primary-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Profile
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
