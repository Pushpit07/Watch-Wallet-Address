import Navbar from "./Navbar";
import { useState } from "react";
import Footer from "./Footer";
import LoginModal from "./Modal/LoginModal";

const Layout = ({ children }) => {
    const [showLoginModal, setShowLoginModal] = useState(false);

    return (
        <div>
            <Navbar setShowLoginModal={setShowLoginModal} />
            {children}
            <Footer />
            <LoginModal showLoginModal={showLoginModal} setShowLoginModal={setShowLoginModal} />
        </div>
    );
};

export default Layout;
