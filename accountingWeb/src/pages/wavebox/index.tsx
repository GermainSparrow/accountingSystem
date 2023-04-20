import React, { useState } from 'react';
import { TableColumnsType, Button } from 'antd';
import { Table, Card } from 'antd';
import { EditModal } from '../components'
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
    const [data, setData] = useState<Item[]>([{
        "key": 175,
        "in_time": "2023-02-28",
        "Head": "蔡强", "owner": "中捷通",
        "model": "捷达",
        "Gearbox_model": "09G",
        "license_plate": "川A9F2N2",
        "cost": "0", "detail": "拖车2.3修2.28返修大力鼓维修150车艺人修线路800",
        "out_time": null,
        "Collection": null,
        "getMoneyTime": null,
        "getMoneyMonth": null,
        "payway": null,
        "payee": null,
        "invoice": null
    }]);
    const [modalOpen, setModalOpen] = useState<boolean>(false)
    const [modelData, setModalData] = useState<Item>('' as Item)
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
    const columns = [
        { title: '进场日期', dataIndex: 'in_time',       key: 'in_time', editable: true },
        { title: '车型号', dataIndex: 'model',           key: 'model', editable: true },
        { title: '车牌', dataIndex: 'license_plate',     key: 'license_plate', editable: true },
        { title: '金额', dataIndex: 'cost',              key: 'cost', editable: true },
        { title: '出场日期', dataIndex: 'createdAt',     key: 'createdAt', editable: true },
        { title: '收款时间', dataIndex: 'getMoneyTime',  key: 'getMoneyTime', editable: true },
        { title: '收款金额', dataIndex: 'Collection',     key: 'Collection', editable: true },
        {
            title: '操作', key: 'operation', editable: false,
            render: (recoard: Item) => <Button onClick={() => {
                setModalData({...recoard});
                setModalOpen(!modalOpen);
            }} >编辑</Button>
        },
    ];
    return (
        <>
            <Table
                columns={columns}
                expandable={{ expandedRowRender: (record) => (expandedRowRender([record])), defaultExpandedRowKeys: ['0'] }}
                dataSource={data}
            />
            <EditModal isOpen={modalOpen} setIsOpen={setModalOpen} recoard={modelData} />
        </>
    );
};

