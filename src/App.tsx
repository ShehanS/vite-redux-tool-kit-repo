import React from "react";
import {GoogleOAuthProvider} from "@react-oauth/google";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ROUTES} from "./constants/routes";
import LoginPage from "./pages/LoginPage"
import LandingPage from "./pages/LandingPage";
import {AppDataContextProvider} from "./context/AppDataContext";
import Authenticate from "./pages/Authenticate";
import Layout from "./components/Layout";


function App() {
    return (
        <>
            <AppDataContextProvider>
                <GoogleOAuthProvider
                    clientId="186010490777-6jfkm42ni28k4u29e1qbmq5mvhgcmlip.apps.googleusercontent.com">
                    <Router>
                        <Routes>
                            <Route path={ROUTES.login} element={<LoginPage/>}/>
                            <Route path={ROUTES.root} element={<LoginPage/>}/>
                            <Route path={ROUTES.ladingPage} element={<Authenticate><Layout><LandingPage/></Layout></Authenticate>}/>
                        </Routes>
                    </Router>
                </GoogleOAuthProvider>
            </AppDataContextProvider>
        </>
    )
}

export default App
