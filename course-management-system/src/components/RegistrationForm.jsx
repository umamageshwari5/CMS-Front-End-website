// src/components/RegistrationForm.jsx

import React from "react";
import { Form, Input, Button, message } from "antd";
import { Card } from "@mui/material";
import "./FormStyles.css";

const RegistrationForm = ({ onSuccessfulRegistration, allUsers }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const emailExists = allUsers.some((user) => user.email === values.email);
    if (emailExists) {
      message.error("This email is already registered.");
      return;
    }

    onSuccessfulRegistration({
      email: values.email,
      password: values.password,
      role: "student",
    });
    form.resetFields();
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card className="form-card">
      <h2 style={{ textAlign: "center" }}>Register</h2>
      <Form
        form={form}
        name="registration_form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "The input is not a valid email!" },
          ]}>
          <Input placeholder="Enter your email" autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password placeholder="Create a password" autoComplete="off" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-button">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default RegistrationForm;
