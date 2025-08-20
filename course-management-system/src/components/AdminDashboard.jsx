import React from "react";
import {
  Typography,
  Container,
  Card,
  CardContent,
  CardActionArea,
} from "@mui/material";
import { AdminPanelSettings, AddCircle, People } from "@mui/icons-material";
import { Grid } from "@mui/material";

const AdminDashboard = ({ onAddCourseClick, onManageUsersClick }) => {
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
                  Add New Course
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Create new courses for students to enroll in.
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
    </Container>
  );
};

export default AdminDashboard;
