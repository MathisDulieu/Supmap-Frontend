import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext.tsx';
import { GeolocationProvider } from './services/GeolocationContext.tsx';
import PrivateRoute from './services/PrivateRoute.tsx';

import Header from './component/structure/Header.tsx';
import Footer from './component/structure/Footer.tsx';
import GeolocationPrompt from './component/notification/GeolocationPrompt.tsx';
import CookiesPopUp from './component/notification/CookiesPopUp.tsx';

import Home from './pages/common/Home.tsx';
import Navigation from './pages/common/Navigation.tsx';
import Support from './pages/common/Support.tsx';
import MobileApp from './pages/common/MobileApp.tsx';
import TermsOfUse from './pages/legal/TermsOfUse.tsx';
import CookiesPolicy from './pages/legal/CookiesPolicy.tsx';
import PrivacyPolicy from './pages/legal/PrivacyPolicy.tsx';
import About from './pages/common/About.tsx';
import Documentation from './pages/common/Documentation.tsx';
import NotFound from './pages/common/NotFound.tsx';

import Login from './pages/auth/Login.tsx';
import Register from './pages/auth/Register.tsx';
import ForgotPassword from './pages/auth/ForgotPassword.tsx';
import ResetPassword from './pages/auth/ResetPassword.tsx';
import EmailValidation from './pages/auth/EmailValidation.tsx';
import RegisterEmail from './pages/auth/RegisterEmail.tsx';

import Profile from './pages/user/Profile.tsx';
import ProfileSettings from './pages/user/ProfileSettings.tsx';

const App: React.FC = () => {
    const [showCookiesPopUp, setShowCookiesPopUp] = useState(false);

    useEffect(() => {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        const cookiesRejected = localStorage.getItem('cookiesRejected');

        if (!cookiesAccepted && !cookiesRejected) {
            const timer = setTimeout(() => {
                setShowCookiesPopUp(true);
            }, 2500);

            return () => clearTimeout(timer);
        }
    }, []);

    const handleCookiesAccept = () => {
        console.log('Cookies accepted');
    };

    const handleCookiesReject = () => {
        console.log('Cookies rejected');
    };

    return (
        <AuthProvider>
            <GeolocationProvider>
                <Router>
                    <div className="flex flex-col min-h-screen">
                        <Header />
                        <GeolocationPrompt />
                        <CookiesPopUp
                            showCookiesPopUp={showCookiesPopUp}
                            onAccept={handleCookiesAccept}
                            onReject={handleCookiesReject}
                        />

                        <main className="flex-grow">
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/navigation" element={<Navigation />} />
                                <Route path="/support" element={<Support />} />
                                <Route path="/mobile/app" element={<MobileApp />} />
                                <Route path="/terms-of-use" element={<TermsOfUse />} />
                                <Route path="/cookies-policy" element={<CookiesPolicy />} />
                                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                                <Route path="/about" element={<About />} />
                                <Route path="/documentation" element={<Documentation />} />

                                <Route element={<PrivateRoute requireAuth={false} redirectPath="/" />}>
                                    <Route path="/login" element={<Login />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/forgot-password" element={<ForgotPassword />} />
                                    <Route path="/reset-password/:token" element={<ResetPassword />} />
                                    <Route path="/email-validation/:token" element={<EmailValidation />} />
                                    <Route path="/register/email" element={<RegisterEmail />} />
                                </Route>

                                <Route element={<PrivateRoute requireAuth={true} redirectPath="/login" />}>
                                    <Route path="/profile" element={<Profile />} />
                                    <Route path="/profile/settings" element={<ProfileSettings />} />
                                </Route>

                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </main>

                        <Footer />
                    </div>
                </Router>
            </GeolocationProvider>
        </AuthProvider>
    );
};

export default App;