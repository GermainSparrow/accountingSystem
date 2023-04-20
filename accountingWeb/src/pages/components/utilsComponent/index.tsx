import { FC, Dispatch, SetStateAction } from 'react'
import { Select, DatePicker, Input } from 'antd'
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

interface selectChoice {
    dataIndex: string,
    defaultVale?: string
}
export const SelectChoice = (dataIndex, defaultVale = '') => {
    switch (dataIndex) {
        case 'in_time':
            return (<DayPicker defaultValue={defaultVale} />);
        case 'out_time':
            return (<DayPicker defaultValue={defaultVale} />);
        case 'payee':
            return (<PayeeSelect defaultValue={defaultVale} />);
        case 'payway':
            return (<PaywaySelect defaultValue={defaultVale} />);
        case 'head':
            return (<HeadSelect defaultValue={defaultVale} />)
        default:
            return (<Input defaultValue={defaultVale} />)
    }
}