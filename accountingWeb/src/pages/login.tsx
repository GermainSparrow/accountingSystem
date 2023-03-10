import React from "react";
import { Button, Checkbox, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import apis from "../utils/apis/apis";
import md5 from "js-md5";
import _ from "lodash";

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  //登录函数
  const onFinish = (values: any) => {
    //md5加密
    const password = md5(values.password);
    apis
      .Login({
        userName: values.userName,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.code === 200) {
          console.log(res.data);
          
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem('user',res.data.data.userName)
          message.open({
            type: "success",
            content: "登录成功 欢迎您",
          });
          res.data.data.auth == "edit"
            ? localStorage.setItem("auth", "true")
            : localStorage.removeItem("auth");
          navigate("/Main");
        } else {
          message.open({
            type: "error",
            content: "账号或密码错误",
          });
        }
      });
  };
  return (
    <div
      style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        translate: "-50% -50%",
      }}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="userName"
          rules={[{ required: true, message: "Please input your userName!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
