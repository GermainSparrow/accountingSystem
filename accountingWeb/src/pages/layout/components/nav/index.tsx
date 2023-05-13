import { Dispatch, FC, SetStateAction, useEffect, } from "react";
import { Radio, Space, Button, Checkbox, Input, Popover } from "antd";
import { SearchOutlined, PlusOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom";
import { debounce } from 'lodash'
interface nav {
    setTable?: Dispatch<SetStateAction<string>>
    setAddModalOpen: Dispatch<SetStateAction<boolean>>
    setShowUncollect: Dispatch<SetStateAction<boolean>>
    showUncollect: boolean
    uncollectMoney: number | null | string
    searchData: (val: string) => void
    setSearchVal: Dispatch<SetStateAction<string | null>>
}

export const Nav: FC<nav> = ({ setAddModalOpen, setShowUncollect, showUncollect, uncollectMoney, searchData, setSearchVal }) => {
    const naviage = useNavigate()
    return (
        <Space size={'large'}>
            <Button shape="circle" icon={<PlusOutlined />} onClick={() => { setAddModalOpen(true) }} />
            <Popover title={'未收款金额为'} content={uncollectMoney} trigger='click'>
                <Checkbox onChange={() => { setShowUncollect(!showUncollect) }}>只展示未收款</Checkbox>
            </Popover>
            <Input placeholder="search-box" onChange={debounce(val => {
                searchData(val.target.value)
                setSearchVal(val.target.value)
                console.log(val.target.value);

            }, 500)} suffix={<SearchOutlined />} />
            <Radio.Group onChange={(item) => {
                naviage(`/dashboard/${item.target.value}`)
            }}
                value={location.pathname.substring(11, location.pathname.length )}
            >
                <Radio.Button value={'reserves'}>备用金表</Radio.Button>
                <Radio.Button value={'oilSale'}>油品表</Radio.Button>
                <Radio.Button value={'waveBox'}>波箱维修表</Radio.Button>
                <Radio.Button value={'cash'}>每日现金表</Radio.Button>
            </Radio.Group>
        </Space>
    )
} 