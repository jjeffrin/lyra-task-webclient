import { useContext } from "react"
import { ToastContext } from "../contexts/toastContext"

export const useToast = () => {
    return useContext(ToastContext)
}