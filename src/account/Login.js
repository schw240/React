import React from "react";
import { Form, Input, Button, Checkbox, message } from 'antd';
import API from 'Api';
import axios from 'axios';
import LoginContext from './Util';

export default function Login() {
  
  const login = React.useContext(LoginContext);
  const [form] = Form.useForm();
    
  const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = values => {    
    axios.post("http://127.0.0.1:8000/account/api-jwt-auth", values)
    .then(res=>{
        window.localStorage.setItem("token", res.data.token)
        login.setIsLogin(true);
    }).catch(error=>{
        message.info('아이디, 패스워드를 확인해주세요');
    })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

    return (
        <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>
  
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>  
  
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            로그인
          </Button>
        </Form.Item>
      </Form>
    )
}