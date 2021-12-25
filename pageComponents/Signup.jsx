import { useMoralis } from "react-moralis";
import { useState } from "react";

const Signup = () => {
    const { signup } = useMoralis();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="bg-white shadow-md border border-gray-200 rounded-lg max-w-sm p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" action="#">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">Sign up on our platform</h3>
                <div>
                    <label for="email" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                        Your email
                    </label>
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.currentTarget.value)}
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-100 focus:border-primary-100 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required=""
                    />
                </div>
                <div>
                    <label for="password" className="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">
                        Your password
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.currentTarget.value)}
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-100 focus:border-primary-100 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required=""
                    />
                </div>

                <button
                    type="submit"
                    className="w-full text-white bg-primary-100 hover:bg-primary-200 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    onClick={(event) => {
                        event.preventDefault();
                        signup(email, password, email);
                    }}
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Signup;
