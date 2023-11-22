import { Outlet } from "react-router-dom"
import { useAuthState } from "../hooks/useAuthState"
import { AuthPage } from "../pages/Auth"

export const AuthRoute = () => {

    const { isAuthenticated } = useAuthState()
    return isAuthenticated() ? <Outlet /> : <AuthPage />
}
