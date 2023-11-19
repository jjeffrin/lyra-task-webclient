import { useContext } from "react"
import { AppSettingsContext } from "../contexts/appSettingsContext"

export const useAppSettings = () => {
    return useContext(AppSettingsContext)
}