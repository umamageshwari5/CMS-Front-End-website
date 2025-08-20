// src/components/Dashboard.jsx
import React from "react";
import { Typography, Container, Grid } from "@mui/material";
import CourseCard from "./CourseCard";

const Dashboard = ({ courses, onCourseClick }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Your Dashboard!
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Your Enrolled Courses
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        {courses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <CourseCard course={course} onClick={() => onCourseClick(course)} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
