import { Modal, Space } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { L1FromGenerator } from '../utilsComponent'
import { l1Dctionary } from '../../../utils/dictionary'
interface editModalType {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    recoard: Record<string, any>;
    dictionaryName: string;
    reload: () => void
    post: (data: any) => Promise<void>
}

export const EditModal: FC<editModalType> = (props) => {
    const dictionary = l1Dctionary[props.dictionaryName]
    return (
        <Modal open={props.isOpen}
            width={location.pathname=='/dashboard/cash'?'40vw':'60vw'}
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
