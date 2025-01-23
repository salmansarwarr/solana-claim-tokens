import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Navbar from "./Elements/Navbar";
import Footer from "./Components/Footer";

import TokenClaimPage from "./Pages/TokenClaimPage";
import { ToastContainer } from "react-toastify";
import Admin from "./Pages/Admin";

const App = () => {
    return (
        <div>
            <Router>
                <Navbar />
                <ToastContainer />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/claim-token" element={<TokenClaimPage />} />
                    <Route path="/admin" element={<Admin />} />
                </Routes>

                <Footer />
            </Router>
        </div>
    );
};

export default App;
