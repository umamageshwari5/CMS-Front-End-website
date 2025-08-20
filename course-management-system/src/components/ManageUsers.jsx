import React from "react";
import {
  Typography,
  Container,
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
import { ArrowBack, Edit, Delete } from "@mui/icons-material";

const ManageUsers = ({ users, onBackClick }) => {
  const handleEdit = (user) => {
    alert(`Editing user: ${user.email}`);
  };

  const handleDelete = (user) => {
    alert(`Deleting user: ${user.email}`);
  };

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
            {users.map((user) => (
              <ListItem key={user.id} divider>
                <ListItemText
                  primary={user.email}
                  secondary={`Role: ${user.role}`}
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="edit"
                    onClick={() => handleEdit(user)}>
                    <Edit />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(user)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ManageUsers;
