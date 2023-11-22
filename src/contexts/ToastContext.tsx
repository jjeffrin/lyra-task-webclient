import { ToastId, UseToastOptions, useToast } from "@chakra-ui/react";
import { PropsWithChildren, createContext } from "react";

interface IToastContext {
    showToast: (title?: React.ReactNode, description?: React.ReactNode, status?: "info" | "warning" | "success" | "error" | "loading" | undefined, duration?: number | null | undefined, isClosable?: boolean | undefined) => ToastId,
    showErrorToast: (error: string, duration?: number, isClosable?: boolean) => ToastId
}

export const ToastContext = createContext<IToastContext>({} as IToastContext)

export const ToastContextProvider = (props: PropsWithChildren) => {

    const toast = useToast()

    const showToast = (title?: React.ReactNode, description?: React.ReactNode, status?: "info" | "warning" | "success" | "error" | "loading" | undefined, duration?: number | null | undefined, isClosable?: boolean | undefined) => {
        return toast({
            title: title,
            description: description,
            status: status,
            duration: duration ?? 5000,
            isClosable: isClosable ?? false
        })
    }

    const showErrorToast = (error: string, duration?: number, isClosable?: boolean) => {
        return toast({
            title: "Oops! we broke hard :(",
            description: `Something went wrong. Please try again. Error: ${error}`,
            status: 'error',
            duration: duration ?? 5000,
            isClosable: isClosable ?? false
        })
    }

    return (
        <ToastContext.Provider value={{ showToast, showErrorToast }}>
            {props.children}
        </ToastContext.Provider>
    )
}
