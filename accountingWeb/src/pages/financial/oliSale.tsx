import React, { useState, useEffect } from "react";
import deleteIf from "../Tools/utils";
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
//取消组件
import CancelButton from "../Tools/CancelButton";
//合计组件
import UncollectedButton from "../Tools/UncollectedButton";
//redux-toolkit
import { useSelector } from "react-redux";
import Container from "../Tools/Container";
//单个数组元素对象接口
interface Item {
  key: any;
  time: any;
  head: any;
  unit: any;
  model: any;
  count: any;
  price: any;
  Plan_sales: any;
  real_sales: any;
  Discounts: any;
  getTime: any;
  getMonth: any;
  collection: any;
  payway: any;
  payee: any;
  Uncollected_amount: any;
  off_price: any;
  remark: any;
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
  const searchState = useSelector((state: { search: any }) => state.search[1]);
  const uncollectedState = useSelector(
    (state: { uncollected: any }) => state.uncollected[0]
  );
  function reload() {
    apis.getOliList().then((res) => {
      setData(res.data.data);
    });
  }
  const deleteData = (x) => {
    apis
      .deleteOliList({
        key: x.key,
      })
      .then((res) => {
        deleteIf(
          reload,
          "oil",
          searchState.isSearch,
          uncollectedState.isShow,
          data.filter((items) => items.key != x.key)
        );
        if (res.data.code === 200) {
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

  // 一个useEffect 全部搞定
  useEffect(() => {
    if (!searchState.isSearch && !uncollectedState.isShow) {
      reload();
    } else if (searchState.isSearch && !uncollectedState.isShow) {
      setData(searchState.data);
    } else if (!searchState.isSearch && uncollectedState.isShow) {
      setData(uncollectedState.data);
    } else if ((searchState.isSearch, uncollectedState.isShow)) {
      setData(searchState.data);
    }
  }, [
    searchState.isSearch,
    searchState.data,
    uncollectedState.isShow,
    uncollectedState.data,
  ]);

  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
  //判断是否是正在修改的数据
  const isEditing = (record: Item) => record.key === editingKey;

  //编辑函数 设置数组的值和 正在修改的key
  const edit = (record: Partial<Item> & { key: React.Key }) => {
    form.setFieldsValue({
      key: "",
      time: "",
      head: "",
      unit: "",
      model: "",
      count: "",
      price: "",
      Plan_sales: "",
      real_sales: "",
      Discounts: "",
      getTime: "",
      getMonth: "",
      collection: "",
      payway: "",
      payee: "",
      Uncollected_amount: "",
      off_price: "",
      remark: "",
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
        apis.updateOliList({ ...item, ...row }).then((res) => {
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
      dataIndex: "time",
      width: "8%",
      editable: true,
    },
    {
      title: "负责人",
      dataIndex: "head",
      width: "5%",
      editable: true,
    },
    {
      title: "单位",
      dataIndex: "unit",
      width: "10%",
      editable: true,
    },
    {
      title: "型号",
      dataIndex: "model",
      width: "5%",
      editable: true,
    },
    {
      title: "数量(单位L)",
      dataIndex: "count",
      width: "5%",
      editable: true,
    },
    {
      title: "价格",
      dataIndex: "price",
      width: "5%",
      editable: true,
    },
    {
      title: "计划销售金额",
      dataIndex: "Plan_sales",
      width: "5%",
      editable: true,
    },
    {
      title: "实际销售金额",
      dataIndex: "real_sales",
      width: "5%",
      editable: true,
    },
    {
      title: "优惠折扣",
      dataIndex: "Discounts",
      width: "5%",
      editable: true,
    },
    {
      title: "收款时间",
      dataIndex: "getTime",
      width: "8%",
      editable: true,
    },
    {
      title: "收款金额",
      dataIndex: "collection",
      width: "5%",
      editable: true,
    },
    {
      title: "付款方式",
      dataIndex: "payway",
      width: "5%",
      editable: true,
    },
    {
      title: "付款方式",
      dataIndex: "payway",
      width: "7%",
      editable: true,
    },
    {
      title: "收款人",
      dataIndex: "payee",
      width: "5%",
      editable: true,
    },
    {
      title: "未收款金额",
      dataIndex: "Uncollected_amount",
      width: "5%",
      editable: true,
    },
    {
      title: "备注",
      dataIndex: "remark",
      width: "5%",
      editable: true,
    },
    {
      title: "冲抵贷款",
      dataIndex: "off_price",
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
      {/* 取消按钮 */}
      <CancelButton isSow={searchState.isSearch} name="oil" />
      {/* 获取未收款列表 */}
      <UncollectedButton
        exit={true}
        isShow={uncollectedState.isShow}
        data={data.filter((items) => items.Uncollected_amount > 0)}
        name="oil"
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
            defaultPageSize: 8,
            pageSizeOptions: [5, 10, 15, 20],
          }}
        />
      </Form>
    </div>
  );
};

export default App;
