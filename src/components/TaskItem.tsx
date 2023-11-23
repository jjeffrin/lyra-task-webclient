import { Flex, Heading, Badge, Box, Text, Tooltip, IconButton } from "@chakra-ui/react"
import { Task } from "../models/Task"
import moment from 'moment'
import { useAppSettings } from "../hooks/useAppSettings"
import { FaTrash } from "react-icons/fa";

interface ITaskItem {
    task: Task,
    onDelClick: (id: number) => void
}

export const TaskItem = (props: ITaskItem) => {

    const { getStatusDescription, getStatusColorScheme } = useAppSettings()

    return (
        <Box backgroundColor={'gray.50'} borderRadius={'2rem'} p={'2rem'} mb={'1rem'}>
            <Flex flexDir={'row'} justifyContent={'space-between'} alignItems={'center'} mb={'1rem'}>
                <Heading fontSize={'1rem'}>{props.task.title}</Heading>
                <Tooltip label={new Date(props.task.createdTime!).toLocaleString()}>
                    <Text fontSize={'0.9rem'}>{moment(new Date(props.task.createdTime!)).fromNow()}</Text>
                </Tooltip>
            </Flex>
            <Text textAlign={'justify'} mb={'1rem'} fontWeight={'medium'}>
                {props.task.description}
            </Text>
            <Flex flexDir={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Badge colorScheme={getStatusColorScheme(props.task.statusCode)}>{getStatusDescription(props.task.statusCode)}</Badge>
                <IconButton color="red.400" size={'sm'} icon={<FaTrash />} onClick={() => props.onDelClick(props.task.id ?? 0)} aria-label="Delete button" />
            </Flex>
        </Box>
    )
}