import { useContext } from "react"
import { FetchContext } from "../contexts/fetchContext"

export const useFetch = () => {
    return useContext(FetchContext)
}