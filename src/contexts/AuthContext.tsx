import { PropsWithChildren, createContext } from "react";
import { User } from "../models/User";
import { useNavigate } from "react-router-dom";

interface IAuthContext {
    isAuthenticated: () => boolean,
    getUser: () => User | null,
    logout: () => void
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const AuthContextProvider = (props: PropsWithChildren) => {  

    const logout = () => {
        document.cookie = `lyra_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.jjeffr.in`;
    }

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
        <AuthContext.Provider value={{ isAuthenticated, getUser, logout }}>
            {props.children}
        </AuthContext.Provider>
    )
}