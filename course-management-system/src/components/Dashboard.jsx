// src/components/Dashboard.jsx

import React from "react";
import { Typography, Container, Grid, Card } from "@mui/material";
import CourseCard from "./CourseCard";

const Dashboard = ({
  enrolledCourses,
  availableCourses,
  onCourseClick,
  onEnroll,
}) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome to Your Dashboard!
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        gutterBottom
        sx={{ mt: 4 }}>
        Your Enrolled Courses
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        {Array.isArray(enrolledCourses) && enrolledCourses.length > 0 ? (
          enrolledCourses.map((course) => (
            <Grid item key={course._id} xs={12} sm={6} md={4}>
              <CourseCard
                course={course}
                onClick={() => onCourseClick(course)}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            You are not enrolled in any courses yet.
          </Typography>
        )}
      </Grid>
      <Typography
        variant="h6"
        color="text.secondary"
        gutterBottom
        sx={{ mt: 4 }}>
        Available Courses
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        {Array.isArray(availableCourses) && availableCourses.length > 0 ? (
          availableCourses.map((course) => (
            <Grid item key={course._id} xs={12} sm={6} md={4}>
              <CourseCard
                course={course}
                onClick={() => onCourseClick(course)}
                showEnrollButton={true}
                onEnroll={() => onEnroll(course._id)}
              />
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 2 }}>
            There are no new courses available at the moment.
          </Typography>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
