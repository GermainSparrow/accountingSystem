import { Dispatch, FC, SetStateAction, } from "react";
import { Radio, Space, Button, Checkbox, Input } from "antd";
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
interface nav {
    setTable?: Dispatch<SetStateAction<string>>
}
export const Nav: FC<nav> = () => {
    const naviage = useNavigate()
    return (
        <Space size={'large'}>
            <Button shape="circle" icon={<PlusOutlined />} />
            <Checkbox >只展示未收款</Checkbox>
            <Input placeholder="search-box" suffix={<SearchOutlined />} />
            <Radio.Group onChange={(item) => {
                naviage(`/dashboard/${item.target.value}`)
            }}>
                <Radio.Button value={'reserves'}>备用金表</Radio.Button>
                <Radio.Button value={'oilSale'}>油品表</Radio.Button>
                <Radio.Button value={'waveBox'}>波箱维修表</Radio.Button>
                <Radio.Button value={'cash'}>每日现金表</Radio.Button>
            </Radio.Group>
        </Space>
    )
} 