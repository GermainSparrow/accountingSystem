export const waveboxDictionary = {
  'key': { vlaue: 'id', type: 'key' },
  'in_time': { value: '进场日期', type: 'datePicker', },
  'model': { value: '型号', type: 'input' },
  'license_plate': { value: '车牌', type: 'input' },
  'cost': { value: '金额', type: 'inputNumber' },
  'getMoneyTime': { value: '收款时间', type: 'datePicker', },
  'Collection': { value: '收款金额', type: 'inputNumber' },
  'Head': { value: '负责人', type: 'select', options: [{ value: '蔡强', label: '蔡强' }, { value: '张胖', label: '张胖' }, { value: '方晓勇', label: '方晓勇' }] },
  'owner': { value: '车主', type: 'input' },
  'Gearbox_model': { value: '波箱型号', type: 'input' },
  'detail': { value: '细节', type: 'textArea' },
  'out_time': { value: '出厂日期', type: 'datePicker' },
  'getMoneyMonth': { value: '收款月份', type: 'monthPicker' },
  'payway': { value: '付款方式', type: 'select', options: [{ value: '微信', label: '微信' }, { value: '支付宝', label: '支付宝' }, { value: '现金', label: '现金' }] },
  'payee': {
    value: '收款人',
    type: 'select',
    options: [
      { value: '蔡强', lable: '蔡强' },
      { value: '公司账户', lable: '公司账户' },
      { value: '赖敏', lable: '赖敏' },
    ]
  },
  'invoice': { value: '发票', type: 'input' },
}
export const oilSaleDcitionary = {
  'key': 'id',
  'time': '销售时间',
  'head': '负责人',
  'unit': '单位',
  'model': '汽车型号',
  'count': '数量',
  'price': '价格',
  'Plan_sales': '计划销售',
  'real_sales': '实际销售',
  'Discounts': '折扣',
  'getTime': '收款时间',
  'getMonth': '收款月份',
  'collection': '收款金额',
  'payway': '付款方式',
  'payee': '收款人',
  'Uncollected_amount': '未收款金额',
  'off_price': '折扣',
  'remark': '备注',
}
export const cashDictionary = {

}
export const reservesDictionary = {
  'time': '时间',
  'month': '月份',
  'payer': '付款人',
  'payee': '收款人',
  'payWay': '付款方式',
  'in': '备用金支出',
  'usefor': '用途',
  'reimbursers': '报销人',
  'category': '分类',
  'out': '备用金指出',
  'key': 'id',
}
export const l1Dctionary = {
  'wavebox': waveboxDictionary,
  'oilSale': oilSaleDcitionary,
  'reserves': reservesDictionary,
  'cash': cashDictionary,

}