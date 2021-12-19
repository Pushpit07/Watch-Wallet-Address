import { useMoralis } from "react-moralis";
import Link from "next/link";

const Navbar = () => {
    const {
        authenticate,
        isAuthenticated,
        isAuthenticating,
        authError,
        logout,
        user,
    } = useMoralis();
    if (user) console.log(user.attributes.username);

    return (
        <nav className="bg-white border-gray-200 px-2 sm:px-4 py-3 dark:bg-gray-800">
            <div className="container flex flex-wrap justify-between items-center mx-auto">
                <a href="#" className="flex">
                    <img
                        src="/icon-512x512.png"
                        alt="logo"
                        className="h-10 mr-2"
                    />
                    <span className="self-center text-lg font-semibold whitespace-nowrap dark:text-white">
                        Watch Wallet Address
                    </span>
                </a>

                <div className="flex md:order-2 ml-auto">
                    {isAuthenticated && user ? (
                        <Link
                            href="#"
                            className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                            <span className="md:text-sm md:font-medium">
                                Hello {user.attributes.username}
                            </span>
                        </Link>
                    ) : (
                        <button
                            type="button"
                            isLoading={isAuthenticating}
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
                            isLoading={isAuthenticating}
                            className="ml-4 px-5 py-2 rounded-xl text-sm font-medium text-white bg-primary-100 hover:bg-primary-300 active:bg-grey-900 focus:outline-none border-4 border-white transition-all md:text-sm md:font-medium"
                            onClick={() => logout()}
                        >
                            Logout
                        </button>
                    ) : null}

                    {authError && (
                        <div
                            class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute top-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            role="alert"
                        >
                            <strong class="font-bold">Auth failed!</strong>
                            <br />
                            <br />
                            <span class="block sm:inline">
                                {authError.message}
                            </span>
                            <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                                <svg
                                    class="fill-current h-6 w-6 text-red-500"
                                    role="button"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                >
                                    <title>Close</title>
                                    <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                </svg>
                            </span>
                        </div>
                    )}
                </div>

                <div
                    className="hidden w-full md:block md:w-auto ml-auto"
                    id="mobile-menu"
                >
                    <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                        <li>
                            <Link
                                href="#"
                                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                                aria-current="page"
                            >
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                About
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Services
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="#"
                                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                            >
                                Pricing
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
