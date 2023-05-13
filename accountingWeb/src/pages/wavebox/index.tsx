import React, { useEffect, useState } from 'react';
import { TableColumnsType, Button, Spin, Space, Popconfirm, message } from 'antd';
import dayjs from 'dayjs';
import { Table, Card } from 'antd';
import { EditModal } from '../components'
import useFetch, { CachePolicies } from 'use-http'
import { Nav } from '../layout/components/nav';
type waveboxItemType = string | number | undefined

interface Item {
    key?: React.Key;
    editable?: boolean;
    in_time?: waveboxItemType;
    out_time?: waveboxItemType;
    model?: waveboxItemType;
    license_plate?: waveboxItemType;
    cost?: waveboxItemType;
    staus?: React.ReactNode;
    Collection?: waveboxItemType;
    getMoneyTime?: waveboxItemType;
    getMoneyMonth?: waveboxItemType;
    Head?: waveboxItemType;
    owner?: waveboxItemType;
    Gearbox_model?: waveboxItemType;
    detail?: waveboxItemType;
    payway?: waveboxItemType;
    payee?: waveboxItemType;
    invoice?: waveboxItemType;
}
type InnerType = Item[]
export const WaveBox: React.FC = () => {
    const { get, post, loading } = useFetch(
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
    const [searchVal, setSearchVal] = useState("")
    //expand table
    const expandedRowRender = (data: InnerType) => {
        const columns: TableColumnsType<Item> = [
            { title: '负责人', dataIndex: 'Head', key: 'date' },
            { title: '车主', dataIndex: 'owner', key: 'owner' },
            { title: '波箱型号', dataIndex: 'Gearbox_model', key: 'Gearbox_model' },
            { title: '维修细节', dataIndex: 'detail', key: 'detail' },
            { title: '付款方式', dataIndex: 'payway', key: 'payway' },
            { title: '开票', dataIndex: 'invoice', key: 'invoice' },
        ];
        return <Card><Table columns={columns} dataSource={data} pagination={false} size='small' /></Card>;
    };
    const loadData = () => {
        post('/crud/search',{
            table: 'wavebox',
            keyword:searchVal
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
            tempData['getMoneyTime'] = dayjs(new Date()).format('YYYY-MM-DD')
            tempData['getMoneyMonth'] = dayjs(new Date()).format('YYYY-MM')
            tempData['out_time'] = dayjs(new Date()).format('YYYY-MM-DD')
            tempData['in_time'] = dayjs(new Date()).format('YYYY-MM-DD')
            tempData['key'] = res.data[0]['key'] + 1
            setAddModalRecord(tempData)
            console.log(showUncollect);
        })

    }
    const editData = (data: any) => {
        const res = post('/waveBox/updateWaveBox', data)
        return res
    }
    const addData = (data: any) => {
        const res = post('/waveBox/addWaveBox', data)
        return res
    }
    const searchData = (keyword: string) => {
        post('crud/search', {
            table: 'wavebox',
            keyword
        }).then(res => {
            setData(res.data)

        })
    }
    useEffect(() => {
        if (showUncollect) {
            let account = 0
            setData(data.filter(items => {
                !items.Collection || items.Collection < items.cost ? account += (parseFloat(items.cost)-parseFloat(items.Collection?items.Collection:"0")) : null
                return items.cost && (!items.Collection || items.Collection < items.cost)
            }))
            setUncollectMoney(account)
        } else {
            loadData()
        }
    }, [showUncollect])

    const columns = [
        { title: '进场日期', dataIndex: 'in_time', key: 'in_time' },
        { title: '车型号', dataIndex: 'model', key: 'model' },
        { title: '车牌', dataIndex: 'license_plate', key: 'license_plate' },
        { title: '金额', dataIndex: 'cost', key: 'cost' },
        { title: '出场日期', dataIndex: 'createdAt', key: 'createdAt' },
        { title: '收款时间', dataIndex: 'getMoneyTime', key: 'getMoneyTime' },
        { title: '收款金额', dataIndex: 'Collection', key: 'Collection' },
        {
            title: '操作', key: 'operation', editable: false,
            render: (recoard: Item) => <Space>
                <Button onClick={() => {
                    setRecord({ ...recoard });
                    setModalOpen(!modalOpen);
                }} >编辑</Button>
                <Popconfirm title="确定要删除吗?" onConfirm={() => {
                    console.log(recoard);
                    post('/waveBox/delete', { key: recoard.key }).then((res) => {
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
                    dictionaryName='wavebox'
                    reload={loadData}
                    post={editData}
                />
                {/* //add modal */}
                <EditModal
                    isOpen={addModalOpen}
                    setIsOpen={setAddModalOpen}
                    recoard={addModalRecord}
                    dictionaryName='wavebox'
                    reload={loadData}
                    post={addData}
                />
            </Spin>
        </Card>
    );
};

