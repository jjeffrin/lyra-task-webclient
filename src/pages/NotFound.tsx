import { Button, Flex, Image, SlideFade, Text } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"
import NotFound from '../assets/not-found.svg'

export const NotFoundPage = () => {

    const navigate = useNavigate()

    return (
        <SlideFade in={true}>
            <Flex flexDir={'column'} justifyContent={'center'} alignItems={'center'} height={'calc(100vh)'}>
                <Image boxSize={'40rem'} aria-label="This request page is not found." src={NotFound} mb={'2rem'} />
                <Text fontWeight={'black'}>You've reached the end of the internet 😃 </Text>
                <Button mb={'2rem'} variant={'link'} onClick={() => navigate('/auth')}>Take me back to safety.</Button>
            </Flex>
        </SlideFade>
    )
}