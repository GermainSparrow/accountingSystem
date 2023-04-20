import { Modal, Space } from "antd";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { L1FromGenerator } from '../utilsComponent'
interface editModal {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    recoard: Record<string, any>
}

export const EditModal: FC<editModal> = (props) => {
    useEffect(() => {
        console.log(props.recoard, 'xxx');
    }, [props.recoard])
    return (
        <Modal open={props.isOpen} onCancel={() => { props.setIsOpen(!props.isOpen) }} onOk={() => {
            console.log(props.recoard);
        }} style={{width:'65%',height:'30%'}}>
            <Space>
                <L1FromGenerator tableItem={props.recoard} />
            </Space>
        </Modal>)
}
