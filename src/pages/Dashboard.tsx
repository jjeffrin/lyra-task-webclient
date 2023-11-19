import { useEffect, useState } from "react"
import { useAuthState } from "../hooks/useAuthState"
import { useNavigate } from "react-router-dom"
import { Button, ButtonGroup, Flex, Heading, SlideFade, Stack, Text } from "@chakra-ui/react"
import { useFetch } from "../hooks/useFetch"
import { Task } from "../models/Task"
import { TaskItem } from "../components/TaskItem"

export const DashboardPage = () => {

    const { isAuthenticated, getUser } = useAuthState()
    const [tasks, setTasks] = useState<Task[]>([])
    const navigate = useNavigate()
    const { getFetch } = useFetch()

    const logout = () => {
        document.cookie = `${'lyra_user'}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        navigate('/auth')
    }

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/auth')
        }
        const currUser = getUser()
        console.log(currUser)
        if (currUser) {
            getFetch(`https://localhost:7251/api/WorkItems/GetByUserId?id=${currUser.userId}`, "GET")
                .then(async (response) => {
                    const data = await response.json() as Task[]
                    setTasks(data)
                    console.log(data)
                }).catch((error) => {
                    console.log(error)
                })
        }
    }, [])

    return (
        <SlideFade in={true}>
            <Flex flexDir={'row'} justifyContent={'space-between'} alignItems={'center'} mb={'2rem'}>
                <Heading fontSize={'2rem'} fontWeight={'black'}>welcome, {getUser()?.name}</Heading>
                <ButtonGroup>
                    <Button onClick={() => navigate('/createTask')}>create task</Button>
                    <Button onClick={() => logout()}>logout</Button>
                </ButtonGroup>
            </Flex>

            {tasks.map(task => {
                return <TaskItem key={task.id} task={task} />
            })}
            {/* <Box backgroundColor={'gray.50'} borderRadius={'2rem'} p={'2rem'} mb={'1rem'}>
                <Flex flexDir={'row'} justifyContent={'space-between'} alignItems={'center'} mb={'1rem'}>
                    <Heading fontSize={'1rem'}>Implement sorting to task list</Heading>
                    <Text>25/02/2024 13:33:13AM</Text>
                </Flex>
                <Text textAlign={'justify'} mb={'1rem'} fontWeight={'medium'}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos non quibusdam nemo corrupti. Magnam dolorum doloremque, hic dolore sed tenetur est molestiae. Eligendi ipsam odio tempora temporibus esse, dolores blanditiis molestias nisi labore dolor optio, culpa non tempore, recusandae numquam!</Text>
                <Badge colorScheme='purple'>PROPOSED</Badge>
            </Box>

            <Box backgroundColor={'gray.50'} borderRadius={'2rem'} p={'2rem'} mb={'1rem'}>
                <Flex flexDir={'row'} justifyContent={'space-between'} alignItems={'center'} mb={'1rem'}>
                    <Heading fontSize={'1rem'}>Implement sorting to task list</Heading>
                    <Text>25/02/2024 13:33:13AM</Text>
                </Flex>
                <Text textAlign={'justify'} mb={'1rem'} fontWeight={'medium'}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos non quibusdam nemo corrupti. Magnam dolorum doloremque, hic dolore sed tenetur est molestiae. Eligendi ipsam odio tempora temporibus esse, dolores blanditiis molestias nisi labore dolor optio, culpa non tempore, recusandae numquam!</Text>
                <Badge colorScheme='purple'>PROPOSED</Badge>
            </Box> */}
        </SlideFade>
    )
}