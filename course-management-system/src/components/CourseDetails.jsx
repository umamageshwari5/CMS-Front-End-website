// src/components/CourseDetails.jsx

import React from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

const CourseDetails = ({ course, onBackClick }) => {
  if (!course) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h5">Course not found.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button onClick={onBackClick} startIcon={<ArrowBack />} sx={{ mb: 2 }}>
        Back to Dashboard
      </Button>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {course.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {course.description}
          </Typography>
          <Typography variant="body2" sx={{ fontStyle: "italic", mt: 4 }}>
            More details about the course content, lessons, and assignments
            would go here.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CourseDetails;
