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
  'key': { value: 'id', type: 'key' },
  'time': { value: '销售时间', type: 'datePicker' },
  'head': { value: '负责人', type: 'select', options: [{ value: '蔡强', label: '蔡强' }, { value: '张胖', label: '张胖' }, { value: '方晓勇', label: '方晓勇' }] },
  'unit': { value: '单位', type: 'input' },
  'model': { value: '汽车型号', type: 'input' },
  'count': { value: '数量', type: 'inputNumber' },
  'price': { value: '价格', type: 'inputNumber' },
  'Plan_sales': { value: '计划销售', type: 'inputNumber' },
  'real_sales': { value: '实际销售', type: 'inputNumber' },
  'Discounts': { value: '折扣', type: 'inputNumber' },
  'getTime': { value: '收款时间', type: 'datePicker' },
  'getMonth': { value: '收款月份', type: 'monthPicker' },
  'collection': { value: '收款金额', type: 'inputNumber' },
  'payway': { value: '付款方式', type: 'select', options: [{ value: '微信', label: '微信' }, { value: '支付宝', label: '支付宝' }, { value: '现金', label: '现金' }] },
  'payee': { value: '收款人', type: 'select', options: [{ value: '蔡强', label: '蔡强' }, { value: '张胖', label: '张胖' }, { value: '方晓勇', label: '方晓勇' }] },
  'Uncollected_amount': { value: '未收款金额', type: 'inputNumber' },
  'off_price': { value: '折扣', type: 'inputNumber' },
  'remark': { value: '备注', type: 'input' },
}
export const cashDictionary = {
'bankOut':{value:'银行支出',type:'inputNumber'},
'extraIncome':{value:'额外收入',type:'inputNumber'},
'otherIncome':{value:'其他收入',type:'inputNumber'}
}
export const reservesDictionary = {
  'time': { value: '时间', type: 'datePicker' },
  'month': { value: '月份', type: 'monthPicker' },
  'payer': { value: '付款人', type: 'select', options: [{ value: '蔡强', label: '蔡强' }, { value: '张胖', label: '张胖' }, { value: '方晓勇', label: '方晓勇' }, { value: '赖敏', label: '赖敏' }] },
  'payee': { value: '收款人', type: 'select', options: [{ value: '蔡强', label: '蔡强' }, { value: '张胖', label: '张胖' }, { value: '方晓勇', label: '方晓勇' }, { value: '赖敏', label: '赖敏' }] },
  'payWay': { value: '付款方式', type: 'select' ,options: [{ value: '微信', label: '微信' }, { value: '支付宝', label: '支付宝' }, { value: '现金', label: '现金' }]},
  'in': { value: '备用金收入出', type: 'inputNumber' },
  'usefor': { value: '用途', type: 'input' },
  'reimbursers': { value: '报销人', type: 'select',options: [{ value: '蔡强', label: '蔡强' }, { value: '张胖', label: '张胖' }, { value: '方晓勇', label: '方晓勇' }, { value: '赖敏', label: '赖敏' }]  },
  'category': { value: '分类', type: 'input' },
  'out': { value: '备用金支出', type: 'inputNumber' },
  'key': { value: 'id', type: 'key' },
}
export const l1Dctionary = {
  'wavebox': waveboxDictionary,
  'oilSale': oilSaleDcitionary,
  'reserves': reservesDictionary,
  'cash': cashDictionary,
}