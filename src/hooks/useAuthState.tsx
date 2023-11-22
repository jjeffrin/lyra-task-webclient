import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

export const useAuthState = () => {
    return useContext(AuthContext)
}