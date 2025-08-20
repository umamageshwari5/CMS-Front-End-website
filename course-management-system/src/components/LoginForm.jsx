// src/components/LoginForm.jsx

import React from "react";
import { Form, Input, Button, message } from "antd";
import { Card, Link } from "@mui/material";
import "./FormStyles.css";

// Accept the new prop `isAdminLogin`
const LoginForm = ({
  onLogin,
  onAdminLogin,
  registeredUser,
  onForgotPassword,
  isAdminLogin,
}) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Login form submitted:", values);

    const adminEmail = "admin@example.com";
    const adminPassword = "adminpassword";

    if (values.email === adminEmail && values.password === adminPassword) {
      message.success("Admin login successful!");
      onAdminLogin();
    } else if (
      !isAdminLogin &&
      registeredUser &&
      values.email === registeredUser.email &&
      values.password === registeredUser.password
    ) {
      // Check against the dynamically registered user only if it's not an admin login
      message.success("Student login successful!");
      onLogin();
    } else {
      message.error("Invalid email or password.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card className="form-card">
      <h2 style={{ textAlign: "center" }}>
        {isAdminLogin ? "Admin Login" : "Student Login"}
      </h2>
      <Form
        form={form}
        name="login_form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        initialValues={{ remember: true }}
        layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}>
          <Input placeholder="Enter your email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}>
          <Input.Password placeholder="Enter your password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-button">
            Log In
          </Button>
        </Form.Item>
      </Form>

      {/* Conditionally render the "Forgot Password" link */}
      {!isAdminLogin && (
        <div style={{ textAlign: "center", marginTop: "16px" }}>
          <Link
            href="#"
            onClick={onForgotPassword}
            color="primary"
            underline="hover">
            Forgot Password?
          </Link>
        </div>
      )}
    </Card>
  );
};

export default LoginForm;
