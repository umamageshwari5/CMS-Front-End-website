// src/components/ForgotPassword.jsx

import React from "react";
import { Form, Input, Button, message } from "antd";
import { Card } from "@mui/material";
import "./FormStyles.css";

const ForgotPassword = ({ onBackClick, onForgotPassword }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onForgotPassword(values.email);
    form.resetFields();
  };

  return (
    <Card className="form-card">
      <h2 style={{ textAlign: "center" }}>Forgot Password</h2>
      <p style={{ textAlign: "center", color: "gray" }}>
        Enter your email to receive a password reset link.
      </p>
      <Form
        form={form}
        name="forgot_password"
        onFinish={onFinish}
        layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "The input is not a valid email!" },
          ]}>
          <Input placeholder="Enter your email" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-button">
            Send Reset Link
          </Button>
        </Form.Item>
      </Form>
      <Button
        onClick={onBackClick}
        type="link"
        block
        style={{ marginTop: "16px" }}>
        Back to Login
      </Button>
    </Card>
  );
};

export default ForgotPassword;
