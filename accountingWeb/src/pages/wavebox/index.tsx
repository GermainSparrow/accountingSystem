import React, { useEffect, useState } from 'react';
import { TableColumnsType, Button, Spin, Space, Modal, Radio, Typography, Popconfirm } from 'antd';
import { Table, Card } from 'antd';
import { EditModal } from '../components'
import useFetch from 'use-http'
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
    const { get, post, loading } = useFetch('/waveBox')
    const [data, setData] = useState<Item[] | []>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [record, setRecord] = useState<Item>('' as Item)
    //expand table
    const expandedRowRender = (data: InnerType) => {
        const columns: TableColumnsType<Item> = [
            { title: '负责人', dataIndex: 'Head', key: 'date' },
            { title: '车主', dataIndex: 'owner', key: 'owner' },
            { title: '波箱型号', dataIndex: 'Gearbox_model', key: 'Gearbox_model' },
            { title: '维修细节', dataIndex: 'detail', key: 'detail' },
            { title: '付款方式', dataIndex: 'payway', key: 'payway' },
            { title: '未知', dataIndex: 'invoice', key: 'invoice' },
        ];
        return <Card><Table columns={columns} dataSource={data} pagination={false} size='small' /></Card>;
    };
    const loadData = () => {
        get('getWaveBoxList').then(res => {
            setData(res.data)
            console.log('agagin?');

        })
    }
    useEffect(() => {
        loadData(),
            console.log('xx');

    }, [loading])
    // table columns
    const columns = [
        { title: '进场日期', dataIndex: 'in_time', key: 'in_time', editable: true },
        { title: '车型号', dataIndex: 'model', key: 'model', editable: true },
        { title: '车牌', dataIndex: 'license_plate', key: 'license_plate', editable: true },
        { title: '金额', dataIndex: 'cost', key: 'cost', editable: true },
        { title: '出场日期', dataIndex: 'createdAt', key: 'createdAt', editable: true },
        { title: '收款时间', dataIndex: 'getMoneyTime', key: 'getMoneyTime', editable: true },
        { title: '收款金额', dataIndex: 'Collection', key: 'Collection', editable: true },
        {
            title: '操作', key: 'operation', editable: false,
            render: (recoard: Item) => <Space>
                <Button onClick={() => {
                    setRecord({ ...recoard });
                    setModalOpen(!modalOpen);
                }} >编辑</Button>
                <Popconfirm title="Sure to cancel?" onConfirm={() => {
                    post('delete', { key: recoard.key }).then((res) => {
                        console.log(res);

                    })
                }}>
                    <Button type='dashed' danger  >删除</Button>
                </Popconfirm>


            </Space>
        },
    ];

    return (
        <Spin spinning={loading}>
            <Table
                columns={columns}
                expandable={{ expandedRowRender: (record) => (expandedRowRender([record])), defaultExpandedRowKeys: ['0'] }}
                dataSource={data}
            />
            <EditModal isOpen={modalOpen} setIsOpen={setModalOpen} setRecord={setRecord} recoard={record} dictionaryName='wavebox' setData={setData} />
        </Spin>
    );
};

