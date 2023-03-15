import { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  message,
} from "antd";
import apis from "../../utils/apis/apis";
//react-toolkit
import { useDispatch } from "react-redux";
import { addUncollected } from "../../store/UncolletControl";
import {
  setSearchState,
  addSearch,
} from "../../store/counterSearch/counterSearch";
const { TextArea } = Input;

const FormDisabledDemo = function (props: { x: string; setShow: any }) {
  const dispatch = useDispatch();
  const [key, setKey] = useState("financeList");
  useEffect(() => {
    console.log("props.x", props.x);
    setKey(props.x.trim());
  }, []);

  //提交函数
  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const onFinish = async (values: any) => {
    if (values.choice == undefined) {
      message.error("请选择添加/查询数据");
      return;
    }
    //处理时间格式
    if (values.time) {
      values.time = values.time.format("YYYY-MM-DD");
    }
    if (values.month) {
      values.month = values.month.format("YYYY-MM");
    }
    if (values.getTime) {
      values.getTime = values.getTime.format("YYYY-MM-DD");
    }
    if (values.getMonth) {
      values.getMonth = values.getMonth.format("YYYY-MM");
    }
    if (values.in_time) {
      values.in_time = values.in_time.format("YYYY-MM-DD");
    }
    if (values.out_time) {
      values.out_time = values.out_time.format("YYYY-MM-DD");
    }
    if (values.getMoneyTime) {
      values.getMoneyTime = values.getMoneyTime.format("YYYY-MM-DD");
    }
    if (values.getMoneyMonth) {
      values.getMoneyMonth = values.getMoneyMonth.format("YYYY-MM");
    }
    if (values.choice == "添加数据") {
      delete values.choice;
      // 根据取得的key值调用接口
      switch (props.x.trim()) {
        case "financeList":
          await apis.addFinancialList(values).then((res) => {
            if (res.data.code == 200) {
              message.open({
                content: res.data.msg,
                duration: 1.5,
                type: "success",
              });
            } else {
              message.open({
                content: res.data.msg,
                duration: 1.5,
                type: "error",
              });
            }
          });
          console.log("fffff");

          break;
        case "oil":
          await apis.addOliList(values).then((res) => {
            if (res.data.code == 200) {
              message.open({
                content: res.data.msg,
                duration: 1.5,
                type: "success",
              });
            } else {
              message.open({
                content: res.data.msg,
                duration: 1.5,
                type: "error",
              });
            }
          });
          console.log("ooooo");

          break;
        case "waveBox":
          await apis.addWavesList(values).then((res) => {
            if (res.data.code == 200) {
              message.open({
                content: res.data.msg,
                duration: 1.5,
                type: "success",
              });
            } else {
              message.open({
                content: res.data.msg,
                duration: 1.5,
                type: "error",
              });
            }
          });

          break;
        default:
          break;
      }
      //添加结束发送到状态机 那边决定要不要添加
      dispatch(addSearch({ data: values, name: props.x.trim() }));
      values.cost > values.Collection || values.Uncollected_amount > 0
        ? dispatch(addUncollected({ name: props.x.trim(), data: values }))
        : null;
    } else {
      delete values.choice;
      let p: any;
      switch (props.x.trim()) {
        case "financeList": {
          p = apis.searchData({
            table: "reserves",
            ...values,
          });
          break;
        }
        case "oil": {
          p = apis.searchData({
            table: "oil_sale",
            ...values,
          });
          break;
        }
        case "waveBox": {
          p = apis.searchData({
            table: "wavebox",
            ...values,
          });
          break;
        }
      }
      await p.then((res) => {
        if (res.data.code == 200) {
          message.open({
            content: res.data.msg,
            duration: 1.5,
            type: "success",
          });
        } else {
          message.open({
            content: res.data.msg,
            duration: 1.5,
            type: "error",
          });
        }
        //把查询到的数据传给状态机
        dispatch(
          setSearchState({
            name: props.x.trim(),
            data: res.data.data,
            rule: { ...values },
          })
        );
      });
    }
    props.setShow(false);
  };
  //渲染列表
  switch (key) {
    case "financeList ":
      return (
        <div
          style={{
            position: "absolute",
            zIndex: "999",
            backgroundColor: "white",
            height: "800px",
            width: " 800px",
            left: "50%",
            translate: "-50%",
            top: "20%",
          }}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600 }}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
          >
            <Form.Item label="模式选择" name="choice">
              <Select>
                <Select.Option value="添加数据">添加数据</Select.Option>
                <Select.Option value="搜索数据">搜索数据</Select.Option>
              </Select>
            </Form.Item>
            {/* 选择时间 */}
            <Form.Item label="选择时间" name="time">
              <DatePicker format={"YYYY/MM/DD"} />
            </Form.Item>
            {/* 选择月份 */}
            <Form.Item label="选择月份" name="month">
              <DatePicker picker="month" />
            </Form.Item>
            {/* 选择付款人 */}
            <Form.Item label="选择付款人" name="payer">
              <Select>
                <Select.Option value="赖敏">赖敏</Select.Option>
                <Select.Option value="蔡强">蔡强</Select.Option>
              </Select>
            </Form.Item>
            {/* 选择收款人 */}
            <Form.Item label="选择收款人" name="payee">
              <Select>
                <Select.Option value="赖敏">赖敏</Select.Option>
                <Select.Option value="蔡强">蔡强</Select.Option>
              </Select>
            </Form.Item>
            {/* 付款方式 */}
            <Form.Item label="选择付款方式" name="payway">
              <Select>
                <Select.Option value="微信">微信</Select.Option>
                <Select.Option value="支付宝">支付宝</Select.Option>
                <Select.Option value="现金">现金</Select.Option>
              </Select>
            </Form.Item>
            {/* 备用金收入金额 */}
            <Form.Item label="备用金收入金额" name="in">
              <InputNumber />
            </Form.Item>
            {/* 备用金指出金额 */}
            <Form.Item label="备用金支出金额" name="out">
              <InputNumber />
            </Form.Item>
            {/* 用途 */}
            <Form.Item label="用途" name="usefor">
              <TextArea rows={2} />
            </Form.Item>
            {/* 报销人 */}
            <Form.Item label="报销人" name="reimbursers">
              <Select>
                <Select.Option value="赖敏">赖敏</Select.Option>
                <Select.Option value="蔡强">蔡强</Select.Option>
                <Select.Option value="周树文">周树文</Select.Option>
                <Select.Option value="刘浪">刘浪</Select.Option>
                <Select.Option value="方晓勇">方晓勇</Select.Option>
                <Select.Option value="王从林">王从林</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="类别" name="category">
              <Select>
                <Select.Option value="管理费用">管理费用</Select.Option>
                <Select.Option value="贷款">贷款</Select.Option>
                <Select.Option value="运费">运费</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="点击添加">
              <Button type="primary" htmlType="submit">
                点击提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    case "oil":
      return (
        <div
          style={{
            position: "absolute",
            zIndex: "999",
            backgroundColor: "white",
            height: "1000px",
            width: " 800px",
            left: "50%",
            translate: "-50%",
            top: "20%",
          }}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            style={{ maxWidth: 600, margin: "30px auto" }}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
          >
            <Form.Item label="模式选择" name="choice">
              <Select>
                <Select.Option value="添加数据">添加数据</Select.Option>
                <Select.Option value="搜索数据">搜索数据</Select.Option>
              </Select>
            </Form.Item>
            {/* 选择时间 */}
            <Form.Item label="销售时间" name="time">
              <DatePicker />
            </Form.Item>
            {/* 选择负责人 */}
            <Form.Item label="选择负责人" name="head">
              <Select>
                <Select.Option value="赖敏">赖敏</Select.Option>
                <Select.Option value="蔡强">蔡强</Select.Option>
              </Select>
            </Form.Item>
            {/* 单位 */}
            <Form.Item label="单位" name="unit">
              <TextArea rows={1} />
            </Form.Item>
            {/* 型号 */}
            <Form.Item label="型号" name="model">
              <TextArea rows={1} />
            </Form.Item>
            {/* 数量L */}
            <Form.Item label="数量L" name="count">
              <InputNumber />
            </Form.Item>
            {/* 价格 */}
            <Form.Item label="价格" name="price">
              <InputNumber />
            </Form.Item>
            {/* 计划销售 */}
            <Form.Item label="计划销售" name="Plan_sales">
              <InputNumber />
            </Form.Item>
            {/* 实际销售 */}
            <Form.Item label="实际销售" name="real_sales">
              <InputNumber />
            </Form.Item>
            {/* 优惠折扣 */}
            <Form.Item label="优惠折扣" name="Discounts">
              <InputNumber />
            </Form.Item>
            {/* 选择收款时间 */}
            <Form.Item label="收款时间" name="getTime">
              <DatePicker />
            </Form.Item>
            {/* 选择收款月份 */}
            <Form.Item label="收款月份" name="getMonth">
              <DatePicker picker="month" format={"YYYY-MM"} />
            </Form.Item>
            {/* 未收货款 */}
            <Form.Item label="收款金额" name="collection">
              <InputNumber />
            </Form.Item>
            {/* 收款方式 */}
            <Form.Item label="收款方式" name="payway">
              <Select>
                <Select.Option value="微信">微信</Select.Option>
                <Select.Option value="支付宝">支付宝</Select.Option>
                <Select.Option value="现金">现金</Select.Option>
              </Select>
            </Form.Item>
            {/* 收款人 */}
            <Form.Item label="收款人" name="payee">
              <Select>
                <Select.Option value="赖敏">赖敏</Select.Option>
                <Select.Option value="蔡强">蔡强</Select.Option>
              </Select>
            </Form.Item>
            {/* 未收货款 */}
            <Form.Item label="未收货款" name="Uncollected_amount">
              <InputNumber />
            </Form.Item>
            {/* 冲抵贷款 */}
            <Form.Item label="冲抵贷款" name="off_price">
              <InputNumber />
            </Form.Item>
            {/* 备注 */}
            <Form.Item label="备注" name="remark">
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item label="点击添加">
              <Button type="primary" htmlType="submit">
                点击提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    case "waveBox":
      return (
        <div
          style={{
            position: "absolute",
            zIndex: "999",
            backgroundColor: "white",
            height: "900px",
            width: " 800px",
            left: "50%",
            translate: "-50%",
            top: "20%",
          }}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            style={{ maxWidth: 600, margin: "30px auto" }}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
          >
            <Form.Item label="模式选择" name="choice">
              <Select>
                <Select.Option value="添加数据">添加数据</Select.Option>
                <Select.Option value="搜索数据">搜索数据</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="进厂日期" name="in_time">
              <DatePicker />
            </Form.Item>
            {/* 负责人 */}
            <Form.Item label="负责人" name="Head">
              <Select>
                <Select.Option value="方晓勇">方晓勇</Select.Option>
                <Select.Option value="蔡强">蔡强</Select.Option>
                <Select.Option value="张胖">张胖</Select.Option>
              </Select>
            </Form.Item>
            {/* 车主 */}
            <Form.Item label="车主" name="owner">
              <TextArea rows={1} />
            </Form.Item>
            {/* 型号 */}
            <Form.Item label="型号" name="model">
              <TextArea rows={1} />
            </Form.Item>
            {/* 波箱型号 */}
            <Form.Item label="波箱型号" name="Gearbox_model">
              <TextArea rows={1} />
            </Form.Item>
            {/* 车牌号 */}
            <Form.Item label="车牌号" name="license_plate">
              <TextArea rows={1} />
            </Form.Item>
            {/* 费用 */}
            <Form.Item label="费用" name="cost">
              <InputNumber />
            </Form.Item>
            {/* 细节 */}
            <Form.Item label="细节" name="detail">
              <TextArea rows={2} />
            </Form.Item>
            {/* 出厂日期 */}
            <Form.Item label="出厂日期" name="out_time">
              <DatePicker />
            </Form.Item>
            {/* 还款金额 */}
            <Form.Item label="还款金额" name="Collection">
              <InputNumber />
            </Form.Item>
            {/* 还款时间 */}
            <Form.Item label="还款时间" name="getMoneyTime">
              <DatePicker />
            </Form.Item>
            {/* 还款月份 */}
            <Form.Item label="还款月份" name="getMoneyMonth">
              <DatePicker picker={"month"} />
            </Form.Item>
            <Form.Item label="还款方式" name="payway">
              <Select>
                <Select.Option value="微信">微信</Select.Option>
                <Select.Option value="支付宝">支付宝</Select.Option>
                <Select.Option value="现金">现金</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="票据" name="invoice">
              <TextArea rows={1} />
            </Form.Item>
            <Form.Item label="点击添加">
              <Button type="primary" htmlType="submit">
                点击提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    default:
      return (
        <div
          style={{
            position: "absolute",
            zIndex: "999",
            backgroundColor: "white",
            height: "800px",
            width: " 800px",
            left: "50%",
            translate: "-50%",
            top: "20%",
          }}
        >
          <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            style={{ maxWidth: 600, margin: "20px auto" }}
            onFinishFailed={onFinishFailed}
            onFinish={onFinish}
          >
            <Form.Item label="模式选择" name="choice">
              <Select>
                <Select.Option value="添加数据">添加数据</Select.Option>
                <Select.Option value="搜索数据">搜索数据</Select.Option>
              </Select>
            </Form.Item>
            {/* 选择时间 */}
            <Form.Item label="选择时间" name="time">
              <DatePicker />
            </Form.Item>
            {/* 选择月份 */}
            <Form.Item label="选择月份" name="month">
              <DatePicker picker="month" format={"YYYY-MM"} />
            </Form.Item>
            {/* 选择付款人 */}
            <Form.Item label="选择付款人" name="payer">
              <Select>
                <Select.Option value="赖敏">赖敏</Select.Option>
                <Select.Option value="蔡强">蔡强</Select.Option>
              </Select>
            </Form.Item>
            {/* 选择收款人 */}
            <Form.Item label="选择收款人" name="payee">
              <Select>
                <Select.Option value="赖敏">赖敏</Select.Option>
                <Select.Option value="蔡强">蔡强</Select.Option>
              </Select>
            </Form.Item>
            {/* 付款方式 */}
            <Form.Item label="选择付款方式" name="payway">
              <Select>
                <Select.Option value="微信">微信</Select.Option>
                <Select.Option value="支付宝">支付宝</Select.Option>
                <Select.Option value="现金">现金</Select.Option>
              </Select>
            </Form.Item>
            {/* 备用金收入金额 */}
            <Form.Item label="备用金收入金额" name="in">
              <InputNumber />
            </Form.Item>
            {/* 备用金指出金额 */}
            <Form.Item label="备用金支出金额" name="out">
              <InputNumber />
            </Form.Item>
            {/* 用途 */}
            <Form.Item label="用途" name="usefor">
              <TextArea rows={2} />
            </Form.Item>
            {/* 还款方式 */}
            <Form.Item label="还款方式" name="payway">
              <Select>
                <Select.Option value="微信">微信</Select.Option>
                <Select.Option value="支付宝">支付宝</Select.Option>
                <Select.Option value="现金">现金</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="收款人" name="payee">
              <Select>
                <Select.Option value="方晓勇">方晓勇</Select.Option>
                <Select.Option value="蔡强">蔡强</Select.Option>
                <Select.Option value="张胖">张胖</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="点击添加">
              <Button type="primary" htmlType="submit">
                点击提交
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
  }
};

export default FormDisabledDemo;
