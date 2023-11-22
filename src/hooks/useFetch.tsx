import { useContext } from "react"
import { FetchContext } from "../contexts/FetchContext"

export const useFetch = () => {
    return useContext(FetchContext)
}