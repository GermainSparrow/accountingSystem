import React from "react";
import { Button, Checkbox, Form, Input, message, Spin } from "antd";
import { useNavigate } from "react-router-dom";
import md5 from "js-md5";
import _ from "lodash";
import useFetch, { CachePolicies } from "use-http";
import '../../index.css'
const onFinishFailed = (errorInfo: any) => {

};

export const Login: React.FC = () => {
  document.title = '小赖的会计系统-登录'
  const navigate = useNavigate();

  const {
    post, loading,
  } = useFetch('/user/login', {
    cachePolicy: CachePolicies.NO_CACHE,
  })

  //登录函数
  const onFinish = (values: any) => {
    //md5加密
    const password = md5(values.password);
    post({
      userName: values.userName,
      password: password,
    }).then((res) => {
      console.log(res);

      if (res.code === 200) {
        localStorage.setItem("ac-jwt-token", res.token);
        localStorage.setItem('user', res.data.userName)
        message.open({
          type: "success",
          content: "登录成功 欢迎您",
        });
        res.data.auth == "edit"
          ? localStorage.setItem("auth", "true")
          : localStorage.removeItem("auth");
        navigate("/dashboard");
      } else {
        message.open({
          type: "error",
          content: "账号或密码错误",
        });
      }
    });
  };
  return (
    <div style={{
      position: "absolute",
      top: "30%",
      left: "50%",
      translate: "-50% -50%",
    }} >
      <Spin spinning={loading} >

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
            <Checkbox>记住密码</Checkbox>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>

      </Spin>
    </div>

  );
};


