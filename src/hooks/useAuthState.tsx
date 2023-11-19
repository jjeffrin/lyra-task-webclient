import { useContext } from "react"
import { AuthContext } from "../contexts/authContext"

export const useAuthState = () => {
    return useContext(AuthContext)
}