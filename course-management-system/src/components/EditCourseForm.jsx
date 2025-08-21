// src/components/EditCourseForm.jsx

import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Typography, Card, CardContent, Container } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import "./FormStyles.css";

const EditCourseForm = ({ course, onUpdateCourse, onBackClick }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (course) {
      form.setFieldsValue({
        title: course.title,
        description: course.description,
      });
    }
  }, [course, form]);

  const onFinish = (values) => {
    console.log("Updating course:", values);
    onUpdateCourse(course._id, values);
    message.success("Course updated successfully!");
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button onClick={onBackClick} startIcon={<ArrowBack />} sx={{ mb: 2 }}>
        Back to Dashboard
      </Button>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Edit Course
          </Typography>
          <Form
            form={form}
            name="edit_course_form"
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
              <Button type="primary" htmlType="submit" className="form-button">
                Update Course
              </Button>
            </Form.Item>
          </Form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default EditCourseForm;
