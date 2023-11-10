import React, {createContext, useContext, useState} from "react";


type AppDataContextType = {
    appDataContext: {
        user: any;
        refreshToken: string;
        isOpenDialog: boolean;
        dialogContent: any;
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
        dialogContent: null
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
