import React, { Dispatch, FC, SetStateAction } from 'react'
import { Select, DatePicker, Input, Form, Row, Col, Button, } from 'antd'
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { FetchData } from 'use-http';
import dayjs from 'dayjs';


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
    return (<Select options={options} defaultValue={props.defaultValue} />)
}

export const PaywaySelect: FC<selectType> = (props) => {
    const options = [
        { value: '微信', lable: '微信' },
        { value: '支付宝', lable: '支付宝' },
        { value: '现金', lable: '现金' },
    ]
    return (<Select options={options} defaultValue={props.defaultValue} />)
}

export const PayeeSelect: FC<selectType> = (props) => {
    const options = [
        { value: '蔡强', lable: '蔡强' },
        { value: '公司账户', lable: '公司账户' },
        { value: '赖敏', lable: '赖敏' },
    ]
    return (<Select options={options} defaultValue={props.defaultValue} />)
}
export const DayPicker: FC<selectType> = (props) => {
    return (<DatePicker picker='date' locale={locale} defaultValue={props.defaultValue ? dayjs(props.defaultValue, 'YYYY-MM-DD') : null} />)
}
export const MonthPicker: FC<selectType> = (props) => {
    return (<DatePicker picker='month' locale={locale} defaultValue={props.defaultValue ? dayjs(props.defaultValue, 'YYYY-MM') : null} />)
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
    let tempNode = null
    switch (props.dataIndex) {
        case 'in_time':
            tempNode = <DayPicker defaultValue={props.defaultValue} />
            break
        case 'out_time':
            tempNode = <DayPicker defaultValue={props.defaultValue} />
            break
        case 'getMoneyTime':
            tempNode = <DayPicker defaultValue={props.defaultValue} />
            break
        case 'getMoneyMonth':
            tempNode = <MonthPicker defaultValue={props.defaultValue} />
            break
        case 'payee':
            tempNode = <PayeeSelect defaultValue={props.defaultValue} />
            break
        case 'payway':
            tempNode = <PaywaySelect defaultValue={props.defaultValue} />
            break
        case 'Head':
            tempNode = <HeadSelect defaultValue={props.defaultValue} />
            break
        case 'detail':
            tempNode = <TextArea autoSize defaultValue={props.defaultValue} />
            break
        default:
            tempNode = <Input defaultValue={props.defaultValue} />
            break
    }

    return (
        props.dataIndex === 'key' ? null : <Col span={8} key={props.dataIndex}>
            <Form.Item initialValue={props.defaultValue} label={props.dictionary[props.dataIndex]} name={props.dataIndex} key={props.dataIndex}>
                {tempNode}
            </Form.Item>
        </Col>
    )
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
                    return (selectChoice({ dataIndex: items, defaultValue: props.tableItem[items], key: items, dictionary: props.dictionary })
                    )
                })}

            </Row>
            <Row gutter={[16, 8]} key={2}>
                <Col span={16} key={4} />
                <Col span={4} key={5}>
                    <Button onClick={() => { props.setIsOpen(false) }} >Cancel</Button>
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