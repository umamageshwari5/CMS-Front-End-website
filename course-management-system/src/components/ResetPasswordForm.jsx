// src/components/ResetPasswordForm.jsx

import React from "react";
import { Form, Input, Button, message } from "antd";
import { Card } from "@mui/material";
import axios from "axios";
import "./FormStyles.css";

const API_URL = "http://localhost:3001/api";

const ResetPasswordForm = ({ token, onSuccessfulReset }) => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      await axios.post(`${API_URL}/auth/reset-password/${token}`, {
        newPassword: values.password,
      });
      message.success(
        "Password has been reset successfully! Please log in with your new password."
      );
      // Call the success callback provided by App.jsx
      onSuccessfulReset();
    } catch (error) {
      console.error(
        "Password reset failed:",
        error.response ? error.response.data.message : error.message
      );
      message.error(
        error.response
          ? error.response.data.message
          : "Failed to reset password. Please try again."
      );
    }
  };

  return (
    <Card className="form-card">
      <h2 style={{ textAlign: "center" }}>Reset Password</h2>
      <Form
        form={form}
        name="reset_password_form"
        onFinish={onFinish}
        layout="vertical">
        <Form.Item
          label="New Password"
          name="password"
          rules={[
            { required: true, message: "Please input your new password!" },
          ]}
          hasFeedback>
          <Input.Password placeholder="Enter a new password" />
        </Form.Item>
        <Form.Item
          label="Confirm New Password"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            { required: true, message: "Please confirm your new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}>
          <Input.Password placeholder="Confirm your new password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="form-button">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default ResetPasswordForm;
