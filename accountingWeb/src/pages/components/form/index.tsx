import { Modal, Space } from "antd";
import { Dispatch, FC, SetStateAction, useEffect } from "react";

interface editModal {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    recoard: any[]
}
export const EditModal: FC<editModal> = (props) => {
    useEffect(() => {
        console.log([props.recoard]);

    }, [])
    return (
        <Modal open={props.isOpen} onCancel={() => { props.setIsOpen(!props.isOpen) }}>
            <Space>
                <h1>hi</h1>
            </Space>
        </Modal>)
}
