import { Modal, Space, Button } from "antd";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { L1FromGenerator } from '../utilsComponent'
import { l1Dctionary } from '../../../utils/dictionary'
import { FetchData } from "use-http";
interface editModalType {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    recoard: Record<string, any>;
    dictionaryName: string;
    setData: Dispatch<SetStateAction<Record<string, any>>>
    post?: FetchData<any>
    setRecord: Dispatch<SetStateAction<Record<string, any>>>
}

export const EditModal: FC<editModalType> = (props) => {
    const dictionary = l1Dctionary[props.dictionaryName]
    return (
        <Modal open={props.isOpen}
            width={'60vw'}
            footer={[]}
        >
            <Space>
                <L1FromGenerator tableItem={props.recoard} dictionary={dictionary} setData={props.setData} setIsOpen={props.setIsOpen} />
            </Space>
        </Modal>)
}
