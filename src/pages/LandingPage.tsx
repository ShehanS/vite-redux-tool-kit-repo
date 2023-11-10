import {FC, useEffect} from "react";
import {useAppDataContext} from "../context/AppDataContext";
import {useNavigate} from "react-router-dom"

const LandingPage: FC = (props: any) => {
    const navigate = useNavigate();

    useEffect(() => {

    }, [])

    const {appDataContext, setAppDataContext} = useAppDataContext();
    return (
        <>
            <p>Landing Page</p>
            {appDataContext?.refreshToken}

        </>
    )
}
export default LandingPage;
