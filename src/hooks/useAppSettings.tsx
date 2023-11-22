import { useContext } from "react"
import { AppSettingsContext } from "../contexts/AppSettingsContext"

export const useAppSettings = () => {
    return useContext(AppSettingsContext)
}