import { PropsWithChildren, createContext } from "react";

interface IFetchContext {
    getFetch: (endpoint: string, method: string, body?: BodyInit | null | undefined) => Promise<Response>
}

export const FetchContext = createContext<IFetchContext>({} as IFetchContext)

export const FetchContextProvider = (props: PropsWithChildren) => {

    const getFetch = (endpoint: string, method: string, body?: BodyInit | null | undefined) => {
        return fetch(endpoint, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: body
        })
    }

    return (
        <FetchContext.Provider value={{ getFetch }}>
            {props.children}
        </FetchContext.Provider>
    )
}