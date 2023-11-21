import { useEffect, useState } from "react"
import { useFetch } from "../hooks/useFetch"
import { useAuthState } from "../hooks/useAuthState"
import { useNavigate } from "react-router-dom"
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Text, Flex, Heading, Input, Button, InputGroup, InputRightElement, IconButton, FormControl, FormErrorMessage } from "@chakra-ui/react"
import { useToast } from "../hooks/useToast";

export const AuthPage = () => {

    const { getFetch } = useFetch()
    const { isAuthenticated } = useAuthState()
    const navigate = useNavigate()
    const { showToast, showErrorToast } = useToast()

    const [registerForm, setRegisterForm] = useState<boolean>(false)
    const [btnLoading, setBtnLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<string>("")
    const [name, setName] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [repassword, setRepassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showRepassword, setShowRepassword] = useState<boolean>(false)
    const [validName, setValidName] = useState<boolean>(true)
    const [validEmail, setValidEmail] = useState<boolean>(true)
    const [validPassword, setValidPassword] = useState<boolean>(true)
    const [validRepassword, setValidRepassword] = useState<boolean>(true)

    const showNameField = () => {
        if (registerForm) return (
            <FormControl maxW={'22rem'} mb={'1rem'} isInvalid={!validName}>
                <Input type="text" placeholder="name" onChange={(e) => setName(e.target.value)} />
                <FormErrorMessage>Name is required.</FormErrorMessage>
            </FormControl>
        )
    }

    const showRePasswordField = () => {
        if (registerForm) return (
            <FormControl maxW={'22rem'} mb={'1rem'} isInvalid={!validRepassword}>
                <InputGroup>
                    <Input
                        type={showRepassword ? 'text' : 'password'}
                        placeholder='retype password'
                        onChange={e => setRepassword(e.target.value)}
                    />
                    <InputRightElement>
                        {showRepassword ?
                            <IconButton icon={<FaEyeSlash />} aria-label={""} onClick={() => setShowRepassword(!showRepassword)} /> :
                            <IconButton icon={<FaEye />} aria-label={""} onClick={() => setShowRepassword(!showRepassword)} />}
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>Password is required.</FormErrorMessage>
            </FormControl>
        )
    }

    const toggleAuthForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setRegisterForm(!registerForm)
    }

    const getAuthFormBtnText = () => {
        if (registerForm) return "create account"
        return "login"
    }

    const getAuthFormHelperText = () => {
        if (registerForm) return "already have an account?"
        return "don't have an account?"
    }

    const getAuthFormHelperBtnText = () => {
        if (registerForm) return "login here"
        return "register here"
    }

    const validateRegisterForm = () => {
        if (name === '') {
            setValidName(false)
        }
        else if (email === '') {
            setValidEmail(false)
        }
        else if (password === '') {
            setValidPassword(false)
        }
        else if (repassword === '') {
            setValidRepassword(false)
        }
        else if (password !== repassword) {
            setValidRepassword(false)
        }
    }

    const onAuthSubmit = () => {
        setBtnLoading(true)
        if (registerForm) {
            // perform registration
            getFetch("https://lyrausersvc.jjeffr.in/api/Auth/Register", "POST", JSON.stringify({ Name: name, Email: email, Password: password }))
                .then((response) => {
                    if (response.ok) {
                        // SHOW TOAST TO ASK USER TO LOGIN
                        showToast('User account created!', 'Please lease login to proceed.', 'success')
                        setRegisterForm(false)
                        // CLEAR THE FORM
                    }
                    else {
                        showToast("Try again", "Something went wrong", 'error')
                    }
                }).catch((error) => {
                    // SHOW ERROR TOAST
                    showErrorToast(error)
                    console.log(error)
                }).finally(() => {
                    setBtnLoading(false)
                })
        }
        else {
            getFetch("https://lyrausersvc.jjeffr.in/api/Auth/AccessToken", "POST", JSON.stringify({ Email: email, Password: password }))
                .then((response) => {
                    if (response.ok) {
                        showToast('Welcome :)', 'Authentication successful.', 'success')
                        setTimeout(() => navigate('/'), 1000)
                    }
                    else {
                        showToast("Try again", "Something went wrong", 'error')
                    }
                }).catch((error) => {
                    // SHOW ERROR TOAST
                    showErrorToast(error)
                    console.log(error)
                }).finally(() => {
                    setBtnLoading(false)
                })
        }
    }

    useEffect(() => {
        if (isAuthenticated()) {
            navigate('/')
        }
    })

    return (
        <Flex flexDir={'column'} h={'calc(100vh - 2rem)'} alignItems={'center'} justifyContent={'Center'}>
            <Heading fontWeight={'black'}>Lyra.</Heading>
            <Text fontWeight={'bold'} mb={'2rem'}>task management, simplified.</Text>
            {showNameField()}
            <FormControl maxW={'22rem'} mb={'1rem'} isInvalid={!validEmail}>
                <Input type="email" placeholder="email" onChange={e => setEmail(e.target.value)} />
                <FormErrorMessage>Email is required.</FormErrorMessage>
            </FormControl>
            <FormControl maxW={'22rem'} mb={'1rem'} isInvalid={!validPassword}>
                <InputGroup>
                    <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='password'
                        onChange={e => setPassword(e.target.value)}
                    />
                    <InputRightElement>
                        {showPassword ?
                            <IconButton icon={<FaEyeSlash />} aria-label={""} onClick={() => setShowPassword(!showPassword)} /> :
                            <IconButton icon={<FaEye />} aria-label={""} onClick={() => setShowPassword(!showPassword)} />}
                    </InputRightElement>
                </InputGroup>
                <FormErrorMessage>Password is required.</FormErrorMessage>
            </FormControl>
            {showRePasswordField()}
            <Button isLoading={btnLoading} onClick={() => onAuthSubmit()} mb={'1rem'}>{getAuthFormBtnText()}</Button>
            <div>{getAuthFormHelperText()} <Button variant={'link'} onClick={(e) => toggleAuthForm(e)}>{getAuthFormHelperBtnText()}</Button></div>
        </Flex>
    )
}