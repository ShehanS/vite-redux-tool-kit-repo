import {ROUTES} from "./const/Routes";
import Home from "./Pages/Home.";
import Apps from "./Pages/Apps";
import {AppDataContextProvider} from "./context/AppDataContext";
import {DrawerContextProvider} from "./context/DrawerContext";
import Login from "./Pages/Login";
import Layout from "./Components/Layout";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import "./App.css"


export default function App() {


    return (
        <AppDataContextProvider>
            <DrawerContextProvider>
                    <Router>
                        <Routes>
                            <Route path={"/"}>
                                <Route path={ROUTES.LOGIN} element={<Login/>}/>
                                {/*<Route element={<Authenticate/>}>*/}
                                <Route path={ROUTES.APP} element={<Apps/>}>
                                    <Route element={<Layout/>}>
                                        <Route path={ROUTES.HOME} element={<Home/>}/>
                                    </Route>
                                </Route>
                            </Route>
                            {/*</Route>*/}
                        </Routes>
                    </Router>
            </DrawerContextProvider>
        </AppDataContextProvider>
    );
}
