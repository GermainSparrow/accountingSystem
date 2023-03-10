import { useEffect, useState } from "react";
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
import Container from "../Tools/Container";
//单个数组元素对象接口
interface Item {
  key: string;
  extraIncome: null | number;
  otherIncome: null | number;
  bankOut: null | number;
  month: string | null;
  head: string | null;
  oilCount: number | null;
  waveBoxCount: number | null;
  reservesOut: number | null;
  currentBalance: null | number;
  cumulativeBalances: null | number;
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
const Cash: React.FC = () => {
  useEffect(() => {
    apis.getCash({}).then((cash) => {
      setData(cash.data);
    });
  });
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState("");
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
        const { extraIncome, otherIncome } = row;
        const { key } = item;

        apis
          .updateCash({
            extraIncome,
            otherIncome,
            key,
          })
          .then((res) => {
            if (res.data.code == "200") {
              message.open({
                content: "修改成功",
                type: "success",
                duration: 1.5,
              });
            } else {
              message.open({
                content: "修改失败",
                type: "error",
                duration: 1.5,
              });
              setData(res.data.data);
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
      title: "月份",
      dataIndex: "month",
      width: "15%",
      editable: true,
    },
    {
      title: "负责人",
      dataIndex: "head",
      width: "10%",
      editable: true,
    },
    {
      title: "油品收入",
      dataIndex: "oilCount",
      width: "8%",
      editable: true,
    },
    {
      title: "波箱收入",
      dataIndex: "waveBoxCount",
      width: "8%",
      editable: true,
    },
    {
      title: "备用金支出",
      dataIndex: "reservesOut",
      width: "8%",
      editable: true,
    },
    {
      title: "其他收入",
      dataIndex: "extraIncome",
      width: "8%",
      editable: true,
    },
    {
      title: "额外收入",
      dataIndex: "otherIncome",
      width: "8%",
      editable: true,
    },
    {
      title: "银行支出",
      dataIndex: "bankOut",
      width: "8%",
      editable: true,
    },
    {
      title: "本期余额",
      dataIndex: "currentBalance",
      width: "10%",
      editable: true,
    },
    {
      title: "累计余额",
      dataIndex: "cumulativeBalances",
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

export default Cash;
