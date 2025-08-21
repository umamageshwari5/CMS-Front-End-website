// src/components/StudentLoginForm.jsx

import React from "react";
import { Form, Input, Button, message } from "antd";
import { Card, Link } from "@mui/material";
import "./FormStyles.css";

const StudentLoginForm = ({
  onLogin,
  onRegister,
  onForgotPassword,
  allUsers,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    const user = allUsers.find(
      (u) =>
        u.email === values.email &&
        u.password === values.password &&
        u.role === "student"
    );
    if (user) {
      onLogin(user);
    } else {
      message.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <Card className="form-card">
      <h2 style={{ textAlign: "center" }}>Student Login</h2>
      <Form
        form={form}
        name="login_form"
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
      <div style={{ textAlign: "center", marginTop: "16px" }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => onForgotPassword(form.getFieldValue("email"))}
          style={{ marginRight: "16px" }}>
          Forgot password?
        </Link>
        <Link component="button" variant="body2" onClick={onRegister}>
          Register now!
        </Link>
      </div>
    </Card>
  );
};

export default StudentLoginForm;
