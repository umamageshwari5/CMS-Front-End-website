import React, { useState } from "react";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import AddCourseForm from "./components/AddCourseForm";
import ManageUsers from "./components/ManageUsers";
import CourseDetails from "./components/CourseDetails";
import {
  Box,
  Typography,
  Button,
  Container,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { Person, AdminPanelSettings } from "@mui/icons-material";
import "./App.css";

function App() {
  const [view, setView] = useState("welcome");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [registeredUser, setRegisteredUser] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "React JS Fundamentals",
      description: "Learn the basics of React for web development.",
    },
    {
      id: 2,
      title: "Node.js and Express",
      description: "Build server-side applications with Node.js.",
    },
    {
      id: 3,
      title: "MongoDB for MERN Stack",
      description: "Master database management with MongoDB.",
    },
  ]);
  const [users, setUsers] = useState([
    { id: 1, email: "admin@example.com", role: "admin" },
    { id: 2, email: "student@example.com", role: "student" },
  ]);

  const handleSuccessfulRegistration = (userData) => {
    const newUser = { id: users.length + 1, ...userData, role: "student" };
    setUsers([...users, newUser]);
    setRegisteredUser(newUser);
    setView("login");
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    setUserRole("student");
    setView("dashboard");
  };

  const handleAdminLogin = () => {
    setIsAuthenticated(true);
    setUserRole("admin");
    setView("admin-dashboard");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setView("welcome");
  };

  const handleAddCourse = (courseData) => {
    const newCourse = { id: courses.length + 1, ...courseData };
    setCourses([...courses, newCourse]);
    setView("admin-dashboard");
  };

  const handleCourseClick = (course) => {
    setSelectedCourse(course);
    setView("course-details");
  };

  const handleBackToDashboard = () => {
    setSelectedCourse(null);
    if (userRole === "admin") {
      setView("admin-dashboard");
    } else {
      setView("dashboard");
    }
  };

  const renderContent = () => {
    if (isAuthenticated) {
      if (userRole === "admin") {
        if (view === "add-course") {
          return (
            <AddCourseForm
              onAddCourse={handleAddCourse}
              onBackClick={handleBackToDashboard}
            />
          );
        }
        if (view === "manage-users") {
          return (
            <ManageUsers users={users} onBackClick={handleBackToDashboard} />
          );
        }
        return (
          <AdminDashboard
            onAddCourseClick={() => setView("add-course")}
            onManageUsersClick={() => setView("manage-users")}
          />
        );
      }
      if (view === "course-details" && selectedCourse) {
        return (
          <CourseDetails
            course={selectedCourse}
            onBackClick={handleBackToDashboard}
          />
        );
      }
      return <Dashboard courses={courses} onCourseClick={handleCourseClick} />;
    } else if (view === "login") {
      return (
        <LoginForm
          onLogin={handleLogin}
          onAdminLogin={handleAdminLogin}
          registeredUser={registeredUser}
          isAdminLogin={false}
        />
      );
    } else if (view === "admin-login") {
      // New condition added here
      return (
        <LoginForm
          onLogin={handleLogin}
          onAdminLogin={handleAdminLogin}
          registeredUser={registeredUser}
          isAdminLogin={true}
        />
      );
    } else if (view === "register") {
      return (
        <RegistrationForm
          onSuccessfulRegistration={handleSuccessfulRegistration}
        />
      );
    } else {
      // This is the updated welcome screen
      return (
        <Container maxWidth="sm" sx={{ mt: 8, textAlign: "center" }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Welcome to the Course Management System!
          </Typography>
          <Typography variant="h6" color="text.secondary" paragraph>
            Sign in to access your student dashboard or manage courses as an
            administrator.
          </Typography>
          <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                onClick={() => setView("login")}
                startIcon={<Person />}>
                Student Login
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="outlined"
                size="large"
                onClick={() => setView("admin-login")}
                startIcon={<AdminPanelSettings />}>
                Admin Login
              </Button>
            </Grid>
          </Grid>
        </Container>
      );
    }
  };

  return (
    <>
      <Header
        onLoginClick={() => setView("login")}
        onRegisterClick={() => setView("register")}
        onAdminLoginClick={() => setView("admin-login")}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        isWelcome={view === "welcome"}
      />
      <div className="main-content">{renderContent()}</div>
    </>
  );
}

export default App;
