// src/components/AdminDashboard.jsx

import React from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import {
  AdminPanelSettings,
  AddCircle,
  People,
  Edit,
  Delete,
} from "@mui/icons-material";

const AdminDashboard = ({
  courses,
  onAddCourseClick,
  onManageUsersClick,
  onEditCourseClick,
  onDeleteCourseClick,
}) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4" component="h1" gutterBottom>
        <AdminPanelSettings fontSize="large" sx={{ mr: 1 }} />
        Admin Dashboard
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Manage courses, users, and more.
      </Typography>
      <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <CardActionArea onClick={onAddCourseClick}>
            <Card>
              <CardContent>
                <AddCircle color="primary" sx={{ fontSize: 60 }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Add a New Course
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create a new course for students to enroll in.
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <CardActionArea onClick={onManageUsersClick}>
            <Card>
              <CardContent>
                <People color="primary" sx={{ fontSize: 60 }} />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Manage Users
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  View and edit student and admin accounts.
                </Typography>
              </CardContent>
            </Card>
          </CardActionArea>
        </Grid>
      </Grid>
      <Typography variant="h5" sx={{ mt: 6, mb: 2, textAlign: "left" }}>
        Existing Courses
      </Typography>
      <List sx={{ textAlign: "left" }}>
        {Array.isArray(courses) && courses.length > 0 ? (
          courses.map((course) => (
            <ListItem key={course._id} divider>
              <ListItemText
                primary={course.title}
                secondary={course.description}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => onEditCourseClick(course)}>
                  <Edit />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => onDeleteCourseClick(course._id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))
        ) : (
          <Typography variant="body1" sx={{ mt: 2, textAlign: "center" }}>
            No courses have been added yet.
          </Typography>
        )}
      </List>
    </Container>
  );
};

export default AdminDashboard;
