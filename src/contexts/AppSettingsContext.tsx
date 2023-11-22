import { PropsWithChildren, createContext } from "react";

interface IAppSettingsContext {
    getStatusDescription: (statusCd: string) => "ACTIVE" | "PROPOSED" | "RESOLVED" | "CLOSED" | "READY FOR QA" | "INDETERMINATE",
    getStatusColorScheme: (statusCd: string) => "yellow" | "purple" | "blue" | "green" | "red" | "gray"
}

export const AppSettingsContext = createContext<IAppSettingsContext>({} as IAppSettingsContext)

export const AppSettingsContextProvider = (props: PropsWithChildren) => {

    const getStatusDescription = (statusCd: string) => {
        if (statusCd === 'ACT') return "ACTIVE"
        if (statusCd === 'PRO') return "PROPOSED"
        if (statusCd === 'RES') return "RESOLVED"
        if (statusCd === 'CLS') return "CLOSED"
        if (statusCd === 'QA') return "READY FOR QA"
        else return "INDETERMINATE"
    }

    const getStatusColorScheme = (statusCd: string) => {
        if (statusCd === 'ACT') return "yellow"
        if (statusCd === 'PRO') return "purple"
        if (statusCd === 'RES') return "blue"
        if (statusCd === 'CLS') return "green"
        if (statusCd === 'QA') return "red"
        else return "gray"
    }

    return (
        <AppSettingsContext.Provider value={{ getStatusDescription, getStatusColorScheme }}>
            {props.children}
        </AppSettingsContext.Provider>
    )
}