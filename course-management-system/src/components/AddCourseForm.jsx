import React from "react";
import { Form, Input, Button, message } from "antd";
import { Typography, Card, CardContent, Box, Container } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import "./FormStyles.css";

const AddCourseForm = ({ onAddCourse, onBackClick }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Adding course:", values);
    onAddCourse(values);
    form.resetFields();
    message.success("Course added successfully!");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      {/* Here's the added Back to Dashboard button */}
      <Button onClick={onBackClick} startIcon={<ArrowBack />} sx={{ mb: 2 }}>
        Back to Dashboard
      </Button>
      <br /><br />
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Add New Course
          </Typography>
          <Form
            form={form}
            name="add_course_form"
            onFinish={onFinish}
            layout="vertical">
            <Form.Item
              label="Course Title"
              name="title"
              rules={[
                { required: true, message: "Please input the course title!" },
              ]}>
              <Input placeholder="e.g., Introduction to JavaScript" />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                { required: true, message: "Please input a description!" },
              ]}>
              <Input.TextArea
                rows={4}
                placeholder="A brief overview of the course content."
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Course
              </Button>
            </Form.Item>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AddCourseForm;
