import { Modal, Space, Button } from "antd";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { L1FromGenerator } from '../utilsComponent'
import { l1Dctionary } from '../../../utils/dictionary'
import { FetchData } from "use-http";
import { TRUE } from "sass";
interface editModalType {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    recoard: Record<string, any>;
    dictionaryName: string;
    reload: () => void
    post: (val: { type: string, data: any }) => Promise<void>
}

export const EditModal: FC<editModalType> = (props) => {
    const dictionary = l1Dctionary[props.dictionaryName]
    return (
        <Modal open={props.isOpen}
            width={'60vw'}
            footer={[]}
            destroyOnClose={true}
        >
            <Space>
                <L1FromGenerator
                    tableItem={props.recoard}
                    dictionary={dictionary}
                    reload={props.reload}
                    setIsOpen={props.setIsOpen}
                    post={props.post}
                />
            </Space>
        </Modal>)
}
