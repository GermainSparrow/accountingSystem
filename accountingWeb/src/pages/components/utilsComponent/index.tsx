import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Select, DatePicker, Input, Form, Row, Col, Button, InputNumber, message, Space } from 'antd'
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import dayjs from 'dayjs';
import { waveboxDictionary } from '../../../utils/dictionary'

interface selectChoiceType {
    formItem: { key: string, initialVaule: string },
    dictionary: Record<string, { value: string, type: string, options?: { value: string, label: string }[] }>,
}

const { TextArea } = Input
const SelectChoice: FC<selectChoiceType> = ({ formItem, dictionary }) => {
    const form = Form.useFormInstance()
    switch (dictionary[formItem.key].type) {
        case 'input':
            return <Input defaultValue={formItem.initialVaule} onChange={(val) => { form.setFieldValue(formItem.key, val.target.value) }} />
        case 'inputNumber':
            return <InputNumber defaultValue={formItem.initialVaule} onChange={(val) => { form.setFieldValue([formItem.key], val) }} />
        case 'select':
            return <Select defaultValue={formItem.initialVaule?.trim()} options={dictionary[formItem.key].options} onChange={(val) => { form.setFieldValue([formItem.key], val) }} />
        case 'textArea':
            return <TextArea defaultValue={formItem.initialVaule} autoSize onChange={(val) => { form.setFieldValue([formItem.key], val.target.value) }} />
        case 'datePicker':
            return <DatePicker defaultValue={formItem.initialVaule ? dayjs(formItem.initialVaule?.trim(), 'YYYY-MM-DD') : null} locale={locale} onChange={(val) => { form.setFieldValue([formItem.key], val.format('YYYY-MM-DD')) }} />
        case 'monthPicker':
            return <DatePicker defaultValue={formItem.initialVaule ? dayjs(formItem.initialVaule?.trim(), 'YYYY-MM') : null} picker='month' locale={locale} onChange={(val) => { form.setFieldValue([formItem.key], val.format('YYYY-MM')) }} />
        case 'key':
            return null
    }
}
interface val {
    tableItem: Record<string, any>,
    dictionary: any,
    formVal?: Record<string, any>,
    reload?: () => void
    post: (data: any) => Promise<any>
    setIsOpen: Dispatch<SetStateAction<boolean>>
}
export const L1FromGenerator: FC<val> = (props) => {
    const [form] = Form.useForm()
    const [state, setState] = useState({})
    useEffect(() => {
        setState(props.tableItem)
    }, [])
    return (
        <Form
            layout='vertical'
            onFinish={(val) => {
                console.log(val);
                val.key = state['key']
                props.post(val).then(res => {
                    res.code == '200' ? message.open({ type: 'success', content: '操作成功' }) : message.open({ type: 'error', content: '操作失败' })
                    props.reload()
                    props.setIsOpen(false)
                })

            }}
            form={form}>
            <Row gutter={[16, 16]} key={1}>
                {Object.keys(state).map(items => {
                    if (props.dictionary[items]) {
                        return (
                            items === 'key' ? null :
                                <Col span={8} key={items}>
                                    <Form.Item name={items} label={props.dictionary[items].value} initialValue={state[items]}>
                                        {<SelectChoice formItem={{ key: items, initialVaule: state[items] }} dictionary={props.dictionary as any} />}
                                    </Form.Item>
                                </Col>
                        )
                    }

                })}

            </Row>
            <Row gutter={[16, 8]} key={2}>
                <Col span={16} key={4} />
                <Space size='large' align='center'>
                    <Form.Item>
                        <Button onClick={() => { props.setIsOpen(false) }} type='dashed' >Cancel</Button>
                    </Form.Item>
                    <Form.Item >
                        <Button type='primary' htmlType='submit' >点击提交</Button>
                    </Form.Item>
                </Space>
            </Row>
        </Form>
    )
}