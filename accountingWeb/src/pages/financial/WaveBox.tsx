import React, { useState, useEffect } from "react";

import apis from "../../utils/apis/apis";
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  message,
  Button,
} from "antd";
//引入取消按钮
import CancelButton from "../Tools/CancelButton";
//引入显示未收款按钮
import UncollectedButton from "../Tools/UncollectedButton";
//redux-toolkit
import { useSelector } from "react-redux";
import deleteIf from "../Tools/utils";
import Container from "../Tools/Container";
//单个数组元素对象接口
interface Item {
  key: string;
  in_time: string;
  Head: string;
  owner: string;
  model: string;
  Gearbox_model: string;
  license_plate: string;
  cost: string;
  detail: string;
  out_time: string;
  Collection: string;
  getMoneyTime: string;
  getMoneyMonth: string;
  payway: string;
  payee: string;
  invoice: string;
}
//创建一个数组

//创建一个 编辑接口
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}
//输入框结点
const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: false,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

//组件使用
const App: React.FC = () => {
  //redux-toolkit
  const editState = useSelector((state: { edit: any }) => state.edit);
  const searchState = useSelector((state: { search: any }) => state.search[2]);
  const uncollectedState = useSelector(
    (state: { uncollected: any }) => state.uncollected[1]
  );
  const reload = () => {
    apis.getWavesList().then((res) => {
      setData(res.data);
    });
  };
  const deleteData = (x) => {
    console.log(x);
    apis
      .deleteWavesList({
        key: x.key,
      })
      .then((res) => {
        if (res.data.code === 200) {
          deleteIf(
            reload,
            "waveBox",
            searchState.isSearch,
            uncollectedState.isShow,
            data.filter((items) => items.key != x.key)
          );
          message.open({
            content: "删除成功",
            duration: 1.5,
            type: "success",
          });
        } else {
          message.open({
            content: "删除失败",
            duration: 1.5,
            type: "error",
          });
        }
      });
  };
  //页面载入检查一下是否是查询后的状态 是则用状态机数据 否则重新查询一次
  useEffect(() => {
    if (!searchState.isSearch && !uncollectedState.isShow) {
      reload();
    } else if (uncollectedState.isShow) {
      setData(uncollectedState.data);
    } else {
      setData(searchState.data);
    }
  }, [searchState.isSearch]);

  //当侦听到保存完结的时候执行修改
  useEffect(() => {
    if (!searchState.isSearch && !uncollectedState.isShow) {
      reload();
    }
  }, [editState.waveBox]);
  //如果是再次查询直接给新的结果
  useEffect(() => {
    if (searchState.isSearch) {
      setData(searchState.data);
    }
  }, [searchState.data]);
  //对未收款账户的操作
  useEffect(() => {
    if (searchState.isSearch) {
      setData(searchState.data);
    } else if (uncollectedState.isShow) {
      setData(uncollectedState.data);
    } else {
      reload();
    }
  }, [uncollectedState.isShow]);
  //当侦听到在展示未收款的情况下删除数据
  useEffect(() => {
    if (uncollectedState.isShow) {
      setData(uncollectedState.data);
    }
  }, [uncollectedState.data]);
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");

  //判断是否是正在修改的数据
  const isEditing = (record: Item) => record.key === editingKey;

  //编辑函数 设置数组的值和 正在修改的key
  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      key: "",
      in_time: "",
      Head: "",
      owner: "",
      model: "",
      Gearbox_model: "",
      license_plate: "",
      cost: "",
      detail: "",
      out_time: "",
      Collection: "",
      getMoneyTime: "",
      getMoneyMonth: "",
      payway: "",
      payee: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  //保存函数
  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as Item;

      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });

        //发送数据到后台
        apis.updateWavesList({ ...item, ...row }).then((res) => {
          if (res.data.code === 200) {
            message.open({
              content: "修改成功",
              duration: 1,
              type: "success",
            });
          } else {
            message.open({
              content: "修改失败",
              duration: 1,
              type: "error",
            });
          }
        });

        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };

  const columns = [
    {
      title: "进厂日期",
      dataIndex: "in_time",
      width: "10%",
      editable: true,
    },
    {
      title: "负责人",
      dataIndex: "Head",
      width: "5%",
      editable: true,
    },
    {
      title: "HUA",
      dataIndex: "owner",
      width: "5%",
      editable: true,
    },
    {
      title: "型号",
      dataIndex: "model",
      width: "5%",
      editable: true,
    },
    {
      title: "变速箱型号",
      dataIndex: "Gearbox_model",
      width: "10%",
      editable: true,
    },
    {
      title: "车牌",
      dataIndex: "license_plate",
      width: "7%",
      editable: true,
    },
    {
      title: "金额",
      dataIndex: "cost",
      width: "8%",
      editable: true,
    },
    {
      title: "细节",
      dataIndex: "detail",
      width: "15%",
      editable: true,
    },
    {
      title: "出场日期",
      dataIndex: "out_time",
      width: "10%",
      editable: true,
    },
    {
      title: "收款金额",
      dataIndex: "Collection",
      width: "5%",
      editable: true,
    },
    {
      title: "收款时间",
      dataIndex: "getMoneyTime",
      width: "5%",
      editable: true,
    },
    {
      title: "收款月份",
      dataIndex: "getMoneyMonth",
      width: "7%",
      editable: true,
    },
    {
      title: "付款方式",
      dataIndex: "payway",
      width: "5%",
      editable: true,
    },
    {
      title: "收款人",
      dataIndex: "payee",
      width: "5%",
      editable: true,
    },
    {
      title: "票据",
      dataIndex: "invoice",
      width: "5%",
      editable: true,
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: "10%",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{ marginRight: 8 }}
            >
              保存修改
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>取消修改</a>
            </Popconfirm>
          </span>
        ) : (
          <Container
            isShow={localStorage.getItem("auth") == "true" ? true : false}
          >
            <div>
              <Typography.Link
                disabled={editingKey !== ""}
                onClick={() => edit(record)}
              >
                编辑
              </Typography.Link>
              <Typography.Link
                style={{ marginLeft: "15px", color: "red" }}
                onClick={() => deleteData(record)}
              >
                删除
              </Typography.Link>
            </div>
          </Container>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <CancelButton isSow={searchState.isSearch} name="waveBox" />
      <UncollectedButton
        exit={true}
        isShow={uncollectedState.isShow}
        data={data.filter((items) => items.cost > items.Collection)}
        name="waveBox"
        isSearch={searchState.isSearch}
      />
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
            total: data.length,
            showTotal: (total, range) => `共 ${total} 条`,
            defaultPageSize: 6,
            pageSizeOptions: [5, 10, 15, 20],
          }}
        />
      </Form>
    </div>
  );
};

export default App;
