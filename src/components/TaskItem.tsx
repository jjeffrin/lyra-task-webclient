import { Flex, Heading, Badge, Box, Text, Tooltip } from "@chakra-ui/react"
import { Task } from "../models/Task"
import moment from 'moment'

interface ITaskItem {
    task: Task
}

export const TaskItem = (props: ITaskItem) => {
    return (
        <Box backgroundColor={'gray.50'} borderRadius={'2rem'} p={'2rem'} mb={'1rem'}>
            <Flex flexDir={'row'} justifyContent={'space-between'} alignItems={'center'} mb={'1rem'}>
                <Heading fontSize={'1rem'}>{props.task.title}</Heading>
                <Tooltip label={new Date(props.task.createdTime).toLocaleString()}>
                    <Text>{moment(new Date(props.task.createdTime)).fromNow()}</Text>
                </Tooltip>
            </Flex>
            <Text textAlign={'justify'} mb={'1rem'} fontWeight={'medium'}>
                {props.task.description}
            </Text>
            <Badge colorScheme='purple'>{props.task.statusCode}</Badge>
        </Box>
    )
}