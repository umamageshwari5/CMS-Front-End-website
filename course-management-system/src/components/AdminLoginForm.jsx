// src/components/AdminLoginForm.jsx

import React from "react";
import { Form, Input, Button, message } from "antd";
import { Card } from "@mui/material";
import "./FormStyles.css";

const AdminLoginForm = ({ onLogin, allUsers }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const user = allUsers.find(
      (u) =>
        u.email === values.email &&
        u.password === values.password &&
        u.role === "admin"
    );
    if (user) {
      onLogin(user);
    } else {
      message.error("Admin login failed. Please check your credentials.");
    }
  };

  return (
    <Card className="form-card">
      <h2 style={{ textAlign: "center" }}>Admin Login</h2>
      <Form
        form={form}
        name="admin_login_form"
        onFinish={onFinish}
        initialValues={{ remember: true }}
        layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}>
          <Input placeholder="Enter your email" autoComplete="off" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password
            placeholder="Enter your password"
            autoComplete="off"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-button">
            Log In
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default AdminLoginForm;
