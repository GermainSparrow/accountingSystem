import React, { Dispatch, FC, SetStateAction } from 'react'
import { Select, DatePicker, Input, Form, Row, Col, Button, } from 'antd'
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { FetchData } from 'use-http';
import dayjs from 'dayjs';
import { waveboxDictionary } from '../../../utils/dictionary'

<DatePicker locale={locale} />;
interface selectType {
    defaultValue?: string
}
export const HeadSelect: FC<selectType> = (props) => {
    const options = [
        { value: '蔡强', lable: '蔡强' },
        { value: '方晓勇', lable: '方晓勇' },
        { value: '张胖', lable: '张胖' },
    ]
    return (<Select options={options} onChange={(val) => {
        console.log(val);
    }} />)
}

export const PaywaySelect: FC<selectType> = (props) => {
    const options = [
        { value: '微信', lable: '微信' },
        { value: '支付宝', lable: '支付宝' },
        { value: '现金', lable: '现金' },
    ]
    return (<Select options={options} />)
}

export const PayeeSelect: FC<selectType> = (props) => {
    const options = [
        { value: '蔡强', lable: '蔡强' },
        { value: '公司账户', lable: '公司账户' },
        { value: '赖敏', lable: '赖敏' },
    ]
    return (<Select options={options} />)
}
export const DayPicker: FC<selectType> = (props) => {
    return (<DatePicker picker='date' locale={locale} />)
}
export const MonthPicker: FC<selectType> = (props) => {
    return (<DatePicker picker='month' locale={locale} />)
}
interface selectChoiceType {
    dataIndex: string,
    defaultValue: string,
    key: string,
    dictionary: Record<string, string>,
    formVal?: Record<string, any>,
    setFormVal?: Dispatch<SetStateAction<Record<string, any>>>
}
interface val {
    tableItem: Record<string, any>,
    dictionary: Record<string, string>,
    formVal?: Record<string, any>,
    setData?: Dispatch<SetStateAction<Record<string, any>>>
    api?: FetchData<any>
    setIsOpen: Dispatch<SetStateAction<boolean>>
}
const { TextArea } = Input
const selectChoice = (props: selectChoiceType): React.ReactNode => {
    switch (props.dataIndex) {
        case 'in_time':
            return <DayPicker />
        case 'out_time':
            return <DayPicker />
        case 'getMoneyTime':
            return <DayPicker />
        case 'getMoneyMonth':
            return <MonthPicker />
        case 'payee':
            return <PayeeSelect />
        case 'payway':
            return <PaywaySelect />
        case 'Head':
            return <HeadSelect />
        case 'detail':
            return <TextArea autoSize />
        default:
            return <Input />
    }

}

export const L1FromGenerator: FC<val> = (props) => {
    return (
        <Form
            layout='vertical'
            style={{ width: '100%' }}
            onFinish={(val) => {
                console.log(val);
                props.setIsOpen(false)
            }}
            initialValues={props.tableItem}>
            <Row gutter={[16, 16]} key={1}>
                {Object.keys(props.tableItem).map(items => {
                    return (
                        items === 'key' ? null :
                            <Col span={8} key={items}>
                                <Form.Item name={items} label={waveboxDictionary[items]}>
                                    {selectChoice({ dataIndex: items, defaultValue: props.tableItem[items], key: items, dictionary: props.dictionary })}
                                </Form.Item>
                            </Col>
                    )
                })}

            </Row>
            <Row gutter={[16, 8]} key={2}>
                <Col span={16} key={4} />
                <Col span={4} key={5}>
                    <Button onClick={() => { props.setIsOpen(false) }} type='dashed' >Cancel</Button>
                </Col>
                <Col span={4} key={6}>
                    <Form.Item >
                        <Button type='primary' htmlType='submit' >点击提交</Button>
                    </Form.Item>
                </Col>
            </Row>
        </Form>
    )
}