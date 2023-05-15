import React, { useEffect, useState } from 'react';
import { TableColumnsType, Button, Spin, Space, Popconfirm, message } from 'antd';
import dayjs from 'dayjs';
import { Table, Card } from 'antd';
import { EditModal } from '../components'
import useFetch, { CachePolicies } from 'use-http'
import { Nav } from '../layout/components/nav';
type oilSaleType = string | number | undefined

interface Item {
  key?: React.Key;
  time?: oilSaleType;
  head?: oilSaleType;
  model?: oilSaleType;
  unit?: oilSaleType;
  count?: oilSaleType;
  price?: React.ReactNode;
  Plan_sales?: oilSaleType;
  real_sales?: oilSaleType;
  Discounts?: oilSaleType;
  getTime?: oilSaleType;
  getMonth?: oilSaleType;
  collection?: oilSaleType;
  payway?: oilSaleType;
  payee?: oilSaleType;
  Uncollected_amount?: oilSaleType;
  off_price?: oilSaleType;
  remark?: oilSaleType;
}
type InnerType = Item[]
export const OilSale: React.FC = () => {
  const { post, loading } = useFetch(
    '',
    { cachePolicy: CachePolicies.NO_CACHE }
  )
  const [data, setData] = useState<Item[] | [] | any>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [record, setRecord] = useState<Item>('' as Item)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [addModalRecord, setAddModalRecord] = useState<Item | null>(null)
  const [showUncollect, setShowUncollect] = useState(false)
  const [uncollectMoney, setUncollectMoney] = useState(null)
  const [searchVal, setSearchVal] = useState('')
  //expand table
  const expandedRowRender = (data: InnerType) => {
    const columns: TableColumnsType<Item> = [
      { title: '数量', dataIndex: 'count', key: 'count' },
      { title: '单价', dataIndex: 'unit', key: 'unit' },
      { title: '折扣', dataIndex: 'Discounts', key: 'Discounts' },
      { title: '付款方式', dataIndex: 'payway', key: 'payway' },
      { title: '收款人', dataIndex: 'payee', key: 'payee' },
      { title: '备注', dataIndex: 'remark', key: 'remark' },
    ];
    return <Card><Table columns={columns} dataSource={data} pagination={false} size='small' /></Card>;
  };
  const loadData = () => {
    post('crud/search', {
      table: 'oil_sale',
      keyword: searchVal
    }).then(res => {
      if (showUncollect) {
        let account = 0
        setData(res.data.filter(items => {
          !items.Collection || items.Collection < items.cost ? account += parseFloat(items.cost) : null
          return items.cost && (!items.Collection || items.Collection < items.cost)
        }))
        setUncollectMoney(account)
      } else {
        setData(res.data)
      }
      const tempData = { ...res.data[0] }
      Object.keys(tempData).map(items => {
        tempData[items] = ''
      })
      tempData['time'] = dayjs(new Date()).format('YYYY-MM-DD')
      tempData['getMonth'] = dayjs(new Date()).format('YYYY-MM')
      tempData['getTime'] = dayjs(new Date()).format('YYYY-MM-DD')
      tempData['key'] = res.data[0]['key'] + 1
      setAddModalRecord(tempData)
      console.log(showUncollect);
    })

  }
  const editData = (data: any) => {
    const res = post('/oil/updateOilList', data)
    return res
  }
  const addData = (data: any) => {
    const res = post('/oil/addOil', data)
    return res
  }
  const searchData = (keyword: string) => {
    post('crud/search', {
      table: 'oil_sale',
      keyword
    }).then(res => {
      setData(res.data)

    })
  }
  useEffect(() => {
    if (showUncollect) {
      let account = 0
      setData(data.filter(items => {
        !items.collection || items.collection < items.real_sales ? account += (parseFloat(items.real_sales) - parseFloat(items.collection ? items.collection : "0")) : null
        return items.real_sales && (!items.collection || items.collection < items.real_sales)
      }))
      setUncollectMoney(account)
    } else {
      loadData()
    }
  }, [showUncollect])

  const columns = [
    { title: '日期', dataIndex: 'time', key: 'time' },
    { title: '车型号', dataIndex: 'model', key: 'model' },
    { title: '单位', dataIndex: 'unit', key: 'unit' },
    { title: '计划销售', dataIndex: 'Plan_sales', key: 'Plan_sales' },
    { title: '实际销售', dataIndex: 'real_sales', key: 'real_sales' },
    { title: '收款时间', dataIndex: 'getTime', key: 'getTime' },
    { title: '收款金额', dataIndex: 'collection', key: 'collection' },
    { title: '未收款金额', dataIndex: 'Uncollected_amount', key: 'Uncollected_amount' },
    {
      title: '操作', key: 'operation', editable: false,
      render: (recoard: Item) => <Space>
        <Button onClick={() => {
          setRecord({ ...recoard });
          setModalOpen(!modalOpen);
        }} >编辑</Button>
        <Popconfirm title="确定要删除吗?" onConfirm={() => {
          post('/oil/delete', { key: recoard.key }).then((res) => {
            res.code == 200 ? message.open({ type: 'success', content: '删除成功' }) : message.open({ type: 'error', content: '删除失败' })
            loadData()
          })
        }}>
          <Button type='dashed' danger  >删除</Button>
        </Popconfirm>
      </Space>
    },
  ];

  return (
    <Card title={
      <Nav
        setSearchVal={setSearchVal}
        setAddModalOpen={setAddModalOpen}
        setShowUncollect={setShowUncollect}
        showUncollect={showUncollect}
        uncollectMoney={uncollectMoney}
        searchData={searchData}
      />}>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          expandable={{ expandedRowRender: (record) => (expandedRowRender([record])), defaultExpandedRowKeys: ['0'] }}
          dataSource={data}
        />
        {/* //edit modal */}
        <EditModal
          isOpen={modalOpen}
          setIsOpen={setModalOpen}
          recoard={record}
          dictionaryName='oilSale'
          reload={loadData}
          post={editData}
        />
        {/* //add modal */}
        <EditModal
          isOpen={addModalOpen}
          setIsOpen={setAddModalOpen}
          recoard={addModalRecord}
          dictionaryName='oilSale'
          reload={loadData}
          post={addData}
        />
      </Spin>
    </Card>
  );
};


// const columns = [
//   {
//     title: "进厂日期",
//     dataIndex: "time",
//     width: "8%",
//     editable: true,
//   },
//   {
//     title: "负责人",
//     dataIndex: "head",
//     width: "5%",
//     editable: true,
//   },
//   {
//     title: "单位",
//     dataIndex: "unit",
//     width: "10%",
//     editable: true,
//   },
//   {
//     title: "型号",
//     dataIndex: "model",
//     width: "5%",
//     editable: true,
//   },
//   {
//     title: "数量(单位L)",
//     dataIndex: "count",
//     width: "5%",
//     editable: true,
//   },
//   {
//     title: "价格",
//     dataIndex: "price",
//     width: "5%",
//     editable: true,
//   },
//   {
//     title: "计划销售金额",
//     dataIndex: "Plan_sales",
//     width: "5%",
//     editable: true,
//   },
//   {
//     title: "实际销售金额",
//     dataIndex: "real_sales",
//     width: "5%",
//     editable: true,
//   },
//   {
//     title: "优惠折扣",
//     dataIndex: "Discounts",
//     width: "5%",
//     editable: true,
//   },
//   {
//     title: "收款时间",
//     dataIndex: "getTime",
//     width: "8%",
//     editable: true,
//   },
//   {
//     title: "收款金额",
//     dataIndex: "collection",
//     width: "5%",
//     editable: true,
//   },
//   {
//     title: "付款方式",
//     dataIndex: "payway",
//     width: "5%",
//     editable: true,
//   },
//   {
//     title: "付款方式",
//     dataIndex: "payway",
//     width: "7%",
//     editable: true,
//   },
//   {
//     title: "收款人",
//     dataIndex: "payee",
//     width: "5%",
//     editable: true,
//   },
//   {
//     title: "未收款金额",
//     dataIndex: "Uncollected_amount",
//     width: "5%",
//     editable: true,
//   },
//   {
//     title: "备注",
//     dataIndex: "remark",
//     width: "5%",
//     editable: true,
//   },
//   {
//     title: "冲抵贷款",
//     dataIndex: "off_price",
//     width: "5%",
//     editable: true,
//   },
//   {
//     title: "操作",
//     dataIndex: "operation",
//     width: "10%",
//     render: (_: any, record: Item) => {
//       const editable = isEditing(record);
//       return editable ? (
//         <span>
//           <Typography.Link
//             onClick={() => save(record.key)}
//             style={{ marginRight: 8 }}
//           >
//             保存修改
//           </Typography.Link>
//           <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
//             <a>取消修改</a>
//           </Popconfirm>
//         </span>
//       ) : (
//         <L1Container
//           isShow={localStorage.getItem("auth") == "true" ? true : false}
//         >
//           <div>
//             <Typography.Link
//               disabled={editingKey !== ""}
//               onClick={() => edit(record)}
//             >
//               编辑
//             </Typography.Link>
//             <Typography.Link
//               style={{ marginLeft: "15px", color: "red" }}
//               onClick={() => deleteData(record)}
//             >
//               删除
//             </Typography.Link>
//           </div>
//         </L1Container>
//       );
//     },
//   },
// ];