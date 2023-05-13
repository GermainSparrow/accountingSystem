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
export const Cash: React.FC = () => {
  const { post, loading,get } = useFetch(
    '',
    { cachePolicy: CachePolicies.NO_CACHE }
  )
  const [data, setData] = useState<Item[] | [] | any>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [record, setRecord] = useState<Item>('' as Item)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [addModalRecord, setAddModalRecord] = useState<Item | null>(null)
  const [showUncollect, setShowUncollect] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  //expand table
  const expandedRowRender = (data: InnerType) => {
    const columns: TableColumnsType<Item> = [
      { title: '分类', dataIndex: 'category', key: 'category' },
    ];
    return <Card><Table columns={columns} dataSource={data} pagination={false} size='small' /></Card>;
  };
  const loadData = () => {
    get('/cash').then(res => {
        setData(res.data)
      const tempData = { ...res.data[0] }
      Object.keys(tempData).map(items => {
        tempData[items] = ''
      })
      tempData['time'] = dayjs(new Date()).format('YYYY-MM-DD')
      tempData['month'] = dayjs(new Date()).format('YYYY-MM')
      tempData['key'] = res.data[0]['key'] + 1
      setAddModalRecord(tempData)
      console.log(showUncollect);
    })

  }
  const editData = (data: any) => {
    const res = post('/cash/update', data)
    return res
  }
  const searchData = (keyword: string) => {
    post('crud/search', {
      table: 'reserves',
      keyword
    }).then(res => {
      setData(res.data)

    })
  }
  useEffect(() => {
    loadData()
  }, [])

  const columns = [
    { title: '月份', dataIndex: 'month', key: 'month' },
    { title: '账户名称', dataIndex: 'head', key: 'head' },
    { title: '波箱收入', dataIndex: 'waveBoxCount', key: 'waveBoxCount' },
    { title: '油品收入', dataIndex: 'oilCount', key: 'oilCount' },
    { title: '额为收入', dataIndex: 'extraIncome', key: 'extraIncome' },
    { title: '其他收入', dataIndex: 'otherIncome', key: 'otherIncome' },
    { title: '银行支出', dataIndex: 'bankOut', key: 'bankOut' },
    { title: '备用金支出', dataIndex: 'reservesOut', key: 'reservesOut' },
    { title: '本期余额', dataIndex: 'currentBalance', key: 'currentBalance' },
    { title: '累计余额', dataIndex: 'cumulativeBalances', key: 'cumulativeBalances' },
    {
      title: '操作', key: 'operation', editable: false,
      render: (recoard: Item) => <Space>
        <Button onClick={() => {
          setRecord({ ...recoard });
          setModalOpen(!modalOpen);
        }} >编辑</Button>
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
        uncollectMoney={'该页面没有未收款属性'}
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
          dictionaryName='cash'
          reload={loadData}
          post={editData}
        />
        {/* //add modal */}
      </Spin>
    </Card>
  );
};
