// src/components/ForgotPassword.jsx

import React from "react";
import { Form, Input, Button, message } from "antd";
import { Card } from "@mui/material";
import "./FormStyles.css";

const ForgotPassword = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Password reset requested for:", values);
    message.success(`A password reset link has been sent to ${values.email}.`);
    // Here we will add logic to send a reset email in the future
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
    </Card>
  );
};

export default ForgotPassword;
