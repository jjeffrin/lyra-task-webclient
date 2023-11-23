import { useEffect, useState } from "react"
import { useAuthState } from "../hooks/useAuthState"
import { useNavigate } from "react-router-dom"
import { Box, Button, ButtonGroup, Flex, Heading, IconButton, Image, SlideFade, Text } from "@chakra-ui/react"
import { useFetch } from "../hooks/useFetch"
import { Task } from "../models/Task"
import { TaskItem } from "../components/TaskItem"
import { CreateNewTask } from "../components/CreateNewTask"
import { MdAddTask, MdLogout } from "react-icons/md";
import { HTTP_GET, HTTP_POST, TASK_BASE_URL } from "../Constants"
import EmptyList from "../assets/empty-list.svg"

export const DashboardPage = () => {

    const { isAuthenticated, getUser, logout } = useAuthState()
    const [tasks, setTasks] = useState<Task[]>([])
    const [showModal, setShowModal] = useState<boolean>(false)
    const navigate = useNavigate()
    const { getFetch } = useFetch()

    const logoutCurrentUser = () => {
        logout()
        navigate('/auth')
    }

    useEffect(() => {
        if (!isAuthenticated()) {
            navigate('/auth')
        }
        getTasks()
    }, [])

    const getTasks = () => {
        const currUser = getUser()
        if (currUser) {
            getFetch(`${TASK_BASE_URL}WorkItems/GetByUserId?id=${currUser.userId}`, HTTP_GET)
                .then(async (response) => {
                    const data = await response.json() as Task[]
                    setTasks(data)
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    const createNewTask = (title: string, descr: string, statusCd: string) => {
        const currUser = getUser()
        if (currUser) {
            getFetch(`${TASK_BASE_URL}/WorkItems`, HTTP_POST, JSON.stringify({ title: title, description: descr, statusCode: statusCd, userId: +currUser.userId } as Task))
                .then(async (response) => {
                    if (response.ok) {
                        getTasks()
                        // SHOW SUCCESS TOAST
                        setShowModal(false)
                    }
                    else {
                        // SHOW ERROR TOAST
                    }
                }).catch((error) => {
                    // SHOW ERROR TOAST
                    console.log(error)
                })
        }
    }

    return (
        <SlideFade in={true}>
            <Flex flexDir={'row'} justifyContent={'space-between'} alignItems={'center'} mt={'2rem'} mb={'2rem'} bgColor={'gray.50'} p={'2rem'} borderRadius={'1rem'}>
                <Heading fontSize={'1.5rem'} fontWeight={'black'}>welcome, {getUser()?.name}</Heading>
                <ButtonGroup size={'sm'}>
                    <IconButton icon={<MdAddTask />} aria-label="create new task" onClick={() => setShowModal(true)} />
                    <IconButton icon={<MdLogout />} aria-label="logout" onClick={() => logoutCurrentUser()} />
                </ButtonGroup>
            </Flex>

            {
                tasks.length === 0 ?
                    <Box>
                        <Image mx={'auto'} boxSize={'30rem'} src={EmptyList} aria-label="No tasks found." />
                        <Text fontWeight={'bold'} textAlign={'center'}>No tasks found. Add a new task to view them here.</Text>
                    </Box> :
                    <></>
            }

            {tasks.map(task => {
                return <TaskItem key={task.id} task={task} />
            })}

            <CreateNewTask showModal={showModal} setShowModal={setShowModal} createNewTask={createNewTask} />

        </SlideFade>
    )
}