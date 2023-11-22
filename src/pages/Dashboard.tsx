import { useEffect, useState } from "react"
import { useAuthState } from "../hooks/useAuthState"
import { useNavigate } from "react-router-dom"
import { Button, ButtonGroup, Flex, Heading, SlideFade } from "@chakra-ui/react"
import { useFetch } from "../hooks/useFetch"
import { Task } from "../models/Task"
import { TaskItem } from "../components/TaskItem"
import { CreateNewTask } from "../components/CreateNewTask"
import { AUTH_BASE_URL, HTTP_GET, HTTP_POST, TASK_BASE_URL } from "../constants"

export const DashboardPage = () => {

    const { isAuthenticated, getUser } = useAuthState()
    const [tasks, setTasks] = useState<Task[]>([])
    const [showModal, setShowModal] = useState<boolean>(false)
    const navigate = useNavigate()
    const { getFetch } = useFetch()

    const logout = () => {
        document.cookie = `lyra_user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.jjeffr.in`;
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
        console.log(currUser)
        if (currUser) {
            getFetch(`${TASK_BASE_URL}WorkItems/GetByUserId?id=${currUser.userId}`, HTTP_GET)
                .then(async (response) => {
                    const data = await response.json() as Task[]
                    setTasks(data)
                    console.log(data)
                }).catch((error) => {
                    console.log(error)
                })
        }
    }

    const createNewTask = (title: string, descr: string, statusCd: string) => {
        const currUser = getUser()
        if (currUser) {
            getFetch(`${AUTH_BASE_URL}/WorkItems`, HTTP_POST, JSON.stringify({ title: title, description: descr, statusCode: statusCd, userId: +currUser.userId } as Task))
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
            <Flex flexDir={'row'} justifyContent={'space-between'} alignItems={'center'} mb={'2rem'}>
                <Heading fontSize={'2rem'} fontWeight={'black'}>welcome, {getUser()?.name}</Heading>
                <ButtonGroup>
                    <Button onClick={() => setShowModal(true)}>create task</Button>
                    <Button onClick={() => logout()}>logout</Button>
                </ButtonGroup>
            </Flex>

            {tasks.map(task => {
                return <TaskItem key={task.id} task={task} />
            })}

            <CreateNewTask showModal={showModal} setShowModal={setShowModal} createNewTask={createNewTask} />

        </SlideFade>
    )
}