// src/components/RegistrationForm.jsx

import React from "react";
import { Form, Input, Button, message } from "antd";
import { Card } from "@mui/material";
import "./FormStyles.css";

// The prop now expects to be called with user data
const RegistrationForm = ({ onSuccessfulRegistration }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Registration form submitted:", values);

    message.success("Registration successful! Please log in.");

    // Pass the form values back to the parent component
    onSuccessfulRegistration(values);
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
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}>
          <Input placeholder="Choose a username" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "The input is not a valid email!" },
          ]}>
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password placeholder="Create a password" />
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
