import { useState, useEffect } from "react";
import Head from "next/head";
import { useMoralis } from "react-moralis";
import ErrorBox from "../../pageComponents/Layout/ErrorBox";

const Profile = () => {
    const { user, isAuthenticated, setUserData, userError } = useMoralis();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            setUsername(user.attributes.username);
            setEmail(user.attributes.email);
        }
    }, [isAuthenticated, user]);

    const handleSave = () => {
        setUserData({
            username,
            email,
            password: password === "" ? undefined : password,
        });
    };

    return (
        <>
            <Head>
                <title>Watch Wallet Address | Profile</title>
                <meta name="description" content="Watch Wallet Address" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="flex flex-wrap justify-center content-center items-center pt-24">
                <div className="w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        id="username"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-500"
                        placeholder="Your username"
                    />
                </div>
            </div>
            <div className="flex flex-wrap justify-center content-center items-center">
                <div className="w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-500"
                        placeholder="Your email"
                    />
                </div>
            </div>
            <div className="flex flex-wrap justify-center content-center items-center">
                <div className="w-1/2 px-3">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        id="password"
                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-100 focus:border-gray-500"
                        placeholder="******************"
                    />
                </div>
            </div>

            {userError && (
                <div className="flex flex-wrap justify-center content-center items-center">
                    <ErrorBox title="User change failed!" message={userError.message} />
                </div>
            )}

            <div className="flex flex-wrap justify-center content-center items-center mt-8 mb-32">
                <button
                    type="button"
                    className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-primary-100 hover:bg-primary-300 active:bg-grey-900 focus:outline-none border-4 border-white transition-all"
                    onClick={handleSave}
                >
                    Save changes
                </button>
            </div>
        </>
    );
};

export default Profile;
