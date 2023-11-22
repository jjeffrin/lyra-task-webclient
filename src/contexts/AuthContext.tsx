import { PropsWithChildren, createContext } from "react";
import { User } from "../models/User";

interface IAuthContext {
    isAuthenticated: () => boolean,
    getUser: () => User | null
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthContextProvider = (props: PropsWithChildren) => {

    const getUser = () => {
        const lyraUserCookie = getCookie('lyra_user');
        if (lyraUserCookie) {
            return JSON.parse(lyraUserCookie) as User
        }
        return null
    }

    const isAuthenticated = () => {
        const lyraUserCookie = getCookie('lyra_user');
        if (lyraUserCookie) {
            return true
        } else {
            return false
        }
    }

    // Function to get the value of a cookie by name
    const getCookie = (name: string) => {
        const cookieString = document.cookie;
        const cookies = cookieString.split(';');

        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();

            // Check if the cookie starts with the specified name
            if (cookie.startsWith(name + '=')) {
                // Return the value of the cookie
                return decodeURIComponent(cookie.substring(name.length + 1));
            }
        }

        // If the cookie is not found, return null
        return null;
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, getUser }}>
            {props.children}
        </AuthContext.Provider>
    )
}