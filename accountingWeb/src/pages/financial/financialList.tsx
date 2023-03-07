import React, { useState, useEffect, useCallback } from "react";
import Container from "../Tools/Container";
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
//redux-toolkit
import { useSelector, useDispatch } from "react-redux";
import { searchEnd } from "../../store/counterSearch/counterSearch";
//单个数组元素对象接口
interface Item {
  key: string;
  time: string;
  month: null | string;
  payer: null | string;
  payee: null | string;
  payWay: null | string;
  in: null | string;
  usefor: string | null;
  reimbursers: string | null;
  category: string | null;
  out: string | number | null;
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
  const searchState = useSelector((state: { search: any }) => state.search[0]);
  const dispatch = useDispatch();

  function reload() {
    apis.getFinancialList().then((res) => {
      setData(res.data.data);
    });
  }
  //页面载入检查一下是否是查询后的状态 是则用状态机数据 否则重新查询一次
  useEffect(() => {
    if (!searchState.isSearch) {
      reload();
    } else {
      setData(searchState.data);
    }
  }, [searchState.isSearch]);

  //当侦听到保存完结的时候执行修改
  useEffect(() => {
    if (!searchState.isSearch) {
      reload();
    }
  }, [editState.financeList]);
  //如果是再次查询直接给新的结果
  useEffect(() => {
    if (searchState.isSearch) {
      setData(searchState.data);
    }
  }, [searchState.data]);

  const deleteData = (x) => {
    console.log(x);
    apis
      .deleteFinancialList({
        key: x.key,
      })
      .then((res) => {
        if (res.data.code === 200) {
          message.open({
            content: "删除成功",
            duration: 1.5,
            type: "success",
          });
          reload();
        } else {
          message.open({
            content: "删除失败",
            duration: 1.5,
            type: "error",
          });
        }
      });
  };
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  const [searchData, setSearchData] = useState([]);
  //判断是否是正在修改的数据
  const isEditing = (record: Item) => record.key === editingKey;

  //编辑函数 设置数组的值和 正在修改的key
  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      time: "",
      month: "",
      payer: "",
      payee: "",
      payWay: "",
      in: "",
      usefor: "",
      reimbursers: "",
      category: "",
      out: "",
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
        apis.updateFinancialList({ ...item, ...row }).then((res) => {
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
      title: "付款时间",
      dataIndex: "time",
      width: "15%",
      editable: true,
    },
    {
      title: "月份",
      dataIndex: "month",
      width: "10%",
      editable: true,
    },
    {
      title: "付款人",
      dataIndex: "payer",
      width: "8%",
      editable: true,
    },
    {
      title: "收款人",
      dataIndex: "payee",
      width: "8%",
      editable: true,
    },
    {
      title: "付款方式",
      dataIndex: "payWay",
      width: "5%",
      editable: true,
    },
    {
      title: "备用金收入",
      dataIndex: "in",
      width: "5%",
      editable: true,
    },
    {
      title: "备用金指出",
      dataIndex: "out",
      width: "5%",
      editable: true,
    },
    {
      title: "报销人",
      dataIndex: "reimbursers",
      width: "10%",
      editable: true,
    },
    {
      title: "类别",
      dataIndex: "category",
      width: "10%",
      editable: true,
    },
    {
      title: "用途",
      dataIndex: "usefor",
      width: "10%",
      editable: true,
    },
    {
      title: "操作",
      dataIndex: "operation",
      width: "15%",
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
      <Container isShow={searchState.isSearch}>
        <Button
          style={{ position: "relative", top: "-48px", left: "75%" }}
          type="text"
          danger
          onClick={() => {
            dispatch(searchEnd({ name: "financeList" })),
              console.log("search ENd");
          }}
        >
          取消查询
        </Button>
      </Container>
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
          }}
        />
      </Form>
    </div>
  );
};

export default App;
