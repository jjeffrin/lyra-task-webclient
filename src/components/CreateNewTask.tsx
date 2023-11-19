import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, Input, FormLabel, Textarea, Select, ButtonGroup } from "@chakra-ui/react"
import { useState } from "react"

interface ICreateNewTask {
    showModal: boolean,
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>,
    createNewTask: (title: string, descr: string, statusCd: string) => void
}

export const CreateNewTask = (props: ICreateNewTask) => {

    const [title, setTitle] = useState<string>("")
    const [descr, setDescr] = useState<string>("")
    const [statusCd, setStatusCd] = useState<string>("PRO")
    const [btnLoading, setBtnLoading] = useState<boolean>(false)

    const createNewTaskHandler = () => {
        if (title === '' || descr === '') {
            // SHOW ERROR MESSAGE
        }
        else {
            setBtnLoading(true)
            props.createNewTask(title, descr, statusCd)
            setBtnLoading(false)
        }
    }

    return (
        <>
            {/* Modal - Create new task */}
            <Modal onClose={() => props.setShowModal(false)} isOpen={props.showModal} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>create new task</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl mb={'1rem'}>
                            <FormLabel>title</FormLabel>
                            <Input type="text" onChange={(e) => setTitle(e.target.value)} />
                        </FormControl>

                        <FormControl mb={'1rem'}>
                            <FormLabel>description</FormLabel>
                            <Textarea onChange={(e) => setDescr(e.target.value)} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>status</FormLabel>
                            <Select onChange={(e) => setStatusCd(e.target.value)}>
                                <option value={'PRO'}>proposed</option>
                                <option value={'ACT'}>active</option>
                                <option value={'RES'}>resolved</option>
                                <option value={'QA'}>ready for QA</option>
                                <option value={'CLS'}>closed</option>
                            </Select>
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup>
                            <Button isLoading={btnLoading} onClick={() => createNewTaskHandler()}>create</Button>
                            <Button onClick={() => props.setShowModal(false)}>cancel</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}