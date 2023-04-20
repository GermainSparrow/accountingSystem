import React, { FC } from 'react'
import { Select, DatePicker, Input, Form, Row, Col } from 'antd'
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';

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
    key: string
}
const selectChoice = (props: selectChoiceType): React.ReactNode => {
    switch (props.dataIndex) {
        case 'in_time':
            return (<Col><Form.Item style={{ height: 'auto',width:'100%' }} key={props.key}><DayPicker defaultValue={props.defaultValue} /></Form.Item>   </Col>);
        case 'out_time':
            return (<Col><Form.Item style={{ height: 'auto',width:'100%' }} key={props.key}><DayPicker defaultValue={props.defaultValue} /></Form.Item>   </Col>);
        case 'payee':
            return (<Col><Form.Item style={{ height: 'auto',width:'100%' }} key={props.key}><PayeeSelect defaultValue={props.defaultValue} /></Form.Item> </Col>);
        case 'payway':
            return (<Col><Form.Item style={{ height: 'auto',width:'100%' }} key={props.key}><PaywaySelect defaultValue={props.defaultValue} /></Form.Item></Col>);
        case 'head':
            return (<Col><Form.Item style={{ height: 'auto',width:'100%' }} key={props.key}><HeadSelect defaultValue={props.defaultValue} /></Form.Item>  </Col>);
        default:
            return (<Col><Form.Item style={{ height: 'auto',width:'100%' }} key={props.key}><Input defaultValue={props.defaultValue} /></Form.Item>       </Col>);
    }
}
interface val {
    tableItem: Record<string, any>
}
export const L1FromGenerator: FC<val> = (props) => {
    const selectArr: React.ReactNode[] = Object.keys(props.tableItem).map(items => {
        return (selectChoice({ dataIndex: items, defaultValue: props.tableItem[items], key: items })
        )
    })
    return (
        <Form layout='inline'  style={{width:'100%'}}>
            <Row gutter={[20, 20]}>
                {selectArr}
            </Row>
        </Form>
    )
}