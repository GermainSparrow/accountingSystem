import React, { Dispatch, FC, SetStateAction } from 'react'
import { Select, DatePicker, Input, Form, Row, Col, Button, } from 'antd'
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import { FetchData } from 'use-http';


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
export const DayPicker: FC<selectType> = () => {
    return (<DatePicker picker='date' locale={locale} />)
}
export const MonthPicker: FC<selectType> = () => {
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
    let tempNode = null
    switch (props.dataIndex) {
        case 'in_time':
            tempNode = <DayPicker defaultValue={props.defaultValue} />
            break
        case 'out_time':
            tempNode = <DayPicker defaultValue={props.defaultValue} />
            break
        case 'payee':
            tempNode = <PayeeSelect defaultValue={props.defaultValue} />
            break
        case 'payway':
            tempNode = <PaywaySelect defaultValue={props.defaultValue} />
            break
        case 'head':
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
        <Col flex={1} span={8}>
            <Form.Item initialValue={props.defaultValue} label={props.dictionary[props.dataIndex]} name={props.dataIndex} key={props.dataIndex}>
                {tempNode}
            </Form.Item>
        </Col>
    )
}

export const L1FromGenerator: FC<val> = (props) => {
    return (
        <Form layout='inline' style={{ width: '100%' }} onFinish={(val) => {
            console.log(val);
            props.setIsOpen(false)
        }} >
            <Row gutter={[20, 20]} >
                {Object.keys(props.tableItem).map(items => {
                    return (selectChoice({ dataIndex: items, defaultValue: props.tableItem[items], key: items, dictionary: props.dictionary })
                    )
                })}
                <Col>
                    <Form.Item style={{ float: 'right' }}>
                        <Button type='primary' htmlType='submit' style={{ float: 'right' }}>点击提交</Button>
                    </Form.Item>
                </Col>
            </Row>

        </Form>
    )
}