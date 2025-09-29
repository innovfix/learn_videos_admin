import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Main from './components/Main';
import ForgetPassword from './components/ForgetPassword';
import ResetPassword from './components/ResetPassword';
import { ToastContainer } from 'react-toastify';
import Logout from './components/Logout';
import { AuthProvider } from './context/Context';
import Maintenance from './components/Maintenance';
import SiteDataLoader from './components/SiteDataLoader';
import LicenseCheck from './components/LicenseCheck';

function App() {
    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
            <Router>
                <AuthProvider>
                    <SiteDataLoader />
                    <Routes>
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/license" element={<LicenseCheck />} />
                        <Route exact path="/logout" element={<Logout />} />
                        <Route path="/forget-password" element={<ForgetPassword />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="/" element={<Main />} />
                        <Route path="/users" element={<Main />} />
                        <Route path="/tickets" element={<Main />} />
                        <Route path="/users/:id" element={<Main />} />
                        <Route path="/shorts" element={<Main />} />
                        <Route path="/shorts/:id" element={<Main />} />
                        <Route path="/media-gallery" element={<Main />} />
                        <Route path="/top-contents" element={<Main />} />
                        <Route path="/actors" element={<Main />} />
                        <Route path="/genres" element={<Main />} />
                        <Route path="/tags" element={<Main />} />
                        <Route path="/types" element={<Main />} />
                        <Route path="/plans" element={<Main />} />
                        <Route path="/vip-plans" element={<Main />} />
                        <Route path="/order-history" element={<Main />} />
                        <Route path="/languages" element={<Main />} />
                        <Route path="/live-tv-categories" element={<Main />} />
                        <Route path="/live-tv-channels" element={<Main />} />
                        <Route path="/notification" element={<Main />} />
                        <Route path="/send-notification" element={<Main />} />
                        <Route path="/movies" element={<Main />} />
                        <Route path="/tv-shows" element={<Main />} />
                        <Route path="/reports" element={<Main />} />
                        <Route path="/settings" element={<Main />} />
                        <Route path="/reward" element={<Main />} />
                        <Route path="/profile" element={<Main />} />
                        <Route path="/payment-method" element={<Main />} />
                        <Route path="/about-us" element={<Main />} />
                        <Route path="/privacy-policy" element={<Main />} />
                        <Route path="/terms-conditions" element={<Main />} />
                        <Route path="/ads-setting" element={<Main />} />
                        <Route path="/ads-setting/:id" element={<Main />} />
						<Route path="/maintenance" element={<Maintenance />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </>
    );
}

export default App;
