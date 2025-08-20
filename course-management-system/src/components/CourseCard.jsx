import React from "react";
import { Card, CardContent, Typography, CardActionArea } from "@mui/material";
import { Laptop, Code, Storage } from "@mui/icons-material";

// Function to choose the correct icon based on the course
const getIcon = (courseTitle) => {
  if (courseTitle.includes("React"))
    return <Laptop color="primary" sx={{ fontSize: 60 }} />;
  if (courseTitle.includes("Node.js"))
    return <Code color="primary" sx={{ fontSize: 60 }} />;
  if (courseTitle.includes("MongoDB"))
    return <Storage color="primary" sx={{ fontSize: 60 }} />;
  return null;
};

const CourseCard = ({ course, onClick }) => {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardContent sx={{ textAlign: "center" }}>
          {getIcon(course.title)}
          <Typography variant="h6" sx={{ mt: 2 }}>
            {course.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default CourseCard;
