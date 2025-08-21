// src/components/CourseCard.jsx

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActionArea,
  Button,
} from "@mui/material";
import {
  Laptop,
  Code,
  Storage,
  Web,
  Computer,
  Cloud,
} from "@mui/icons-material";

const iconMap = {
  Laptop: Laptop,
  Code: Code,
  Storage: Storage,
  Web: Web,
  Computer: Computer,
  Cloud: Cloud,
};

const getIcon = (iconName) => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? (
    <IconComponent color="primary" sx={{ fontSize: 60 }} />
  ) : null;
};

const CourseCard = ({ course, onClick, showEnrollButton, onEnroll }) => {
  return (
    <Card>
      <CardActionArea onClick={onClick}>
        <CardContent sx={{ textAlign: "center" }}>
          {getIcon(course.icon)}
          <Typography variant="h6" sx={{ mt: 2 }}>
            {course.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {course.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      {showEnrollButton && (
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={onEnroll}
          sx={{ mt: 1, borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
          Enroll
        </Button>
      )}
    </Card>
  );
};

export default CourseCard;
