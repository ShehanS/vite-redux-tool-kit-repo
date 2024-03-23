import React, {createContext, useContext, useState} from "react";


type AppDataContextType = {
    appDataContext: {
        title?: string;
        subTitle?: string;
        user: any;
        refreshToken: string;
        isOpenDialog: boolean;
        dialogContent: any;
        dialogTitle: any;
        isEdit: boolean;
        project:any;
        task: any;
        isLogged: boolean;
    };
    setAppDataContext: (props: any) => void;
};
type AppDataContextProviderProps = {
    children: React.ReactNode;
};

const AppDataContext = createContext<AppDataContextType | undefined>(
    undefined
);

const AppDataContextProvider = ({children}: AppDataContextProviderProps) => {
    const [appDataContext, setAppDataContext] = useState({
        user: null,
        refreshToken: "",
        isOpenDialog: false,
        dialogContent: null,
        dialogTitle: null,
        isEdit: false,
        project: null,
        task: null,
        isLogged: false

    });

    return (
        <AppDataContext.Provider value={{appDataContext, setAppDataContext}}>
            {children}
        </AppDataContext.Provider>
    );
};

const useAppDataContext = () => {
    const context = useContext(AppDataContext);
    if (context === undefined) {
        throw new Error(
            "useAppDataContext must be used within a AppDataContextProvider"
        );
    }
    return context;
};

export {AppDataContextProvider, useAppDataContext};
