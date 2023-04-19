import { Dispatch, FC, SetStateAction, } from "react";
import { Radio, Space } from "antd";

interface nav {
    setTable: Dispatch<SetStateAction<string>>
}
export const Nav: FC<nav> = () => {
    return (
        <Space>

            <Radio>
                <Radio.Button value={'cash'}>现金表</Radio.Button>
                <Radio.Button value={'oilSale'}>油品表</Radio.Button>
                <Radio.Button value={'reserves'}>波箱维修表</Radio.Button>
                <Radio.Button value={'dayCash'}>每日现金表</Radio.Button>
            </Radio>
        </Space>
    )
} 