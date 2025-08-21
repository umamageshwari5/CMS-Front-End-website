// src/components/ManageUsers.jsx

import React from "react";
import {
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Box,
} from "@mui/material";
import { ArrowBack, Delete } from "@mui/icons-material";
import { message } from "antd";

const ManageUsers = ({ onBackClick, users, onDeleteUser }) => {
  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      // The deletion is now handled by the parent component (App.jsx)
      onDeleteUser(userId);
    }
  };

  const nonAdminUsers = users.filter((user) => user.role !== "admin");

  return (
    <Box sx={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <Button onClick={onBackClick} startIcon={<ArrowBack />} sx={{ mb: 2 }}>
        Back to Dashboard
      </Button>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Manage Users
          </Typography>
          <List>
            {nonAdminUsers.length > 0 ? (
              nonAdminUsers.map((user) => (
                <ListItem key={user._id} divider>
                  <ListItemText
                    primary={user.email}
                    secondary={`Role: ${user.role}`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDelete(user._id)}>
                      <Delete />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))
            ) : (
              <Typography variant="body1" sx={{ textAlign: "center", my: 2 }}>
                No student users found.
              </Typography>
            )}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ManageUsers;
