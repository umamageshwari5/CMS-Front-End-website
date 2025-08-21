// src/App.jsx

import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import StudentLoginForm from "./components/StudentLoginForm";
import AdminLoginForm from "./components/AdminLoginForm";
import RegistrationForm from "./components/RegistrationForm";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import AddCourseForm from "./components/AddCourseForm";
import ManageUsers from "./components/ManageUsers";
import CourseDetails from "./components/CourseDetails";
import EditCourseForm from "./components/EditCourseForm";
import ForgotPassword from "./components/ForgotPassword";
import ResetPasswordForm from "./components/ResetPasswordForm";
import { message } from "antd";
import { Typography, Button, Container, Grid } from "@mui/material";
import { Person, AdminPanelSettings } from "@mui/icons-material";
import "./App.css";

function App() {
  const [view, setView] = useState("welcome");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdminLoginView, setIsAdminLoginView] = useState(false);
  const [resetToken, setResetToken] = useState(null);

  // --- NEW: Local State for Users and Courses ---
  const [allUsers, setAllUsers] = useState(() => {
    const storedUsers = localStorage.getItem("allUsers");
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }
    // Default admin user for the first run
    return [
      {
        _id: "admin123",
        email: "admin@example.com",
        password: "adminpassword",
        role: "admin",
        enrolledCourses: [],
      },
    ];
  });

  const [allCourses, setAllCourses] = useState(() => {
    const storedCourses = localStorage.getItem("allCourses");
    if (storedCourses) {
      return JSON.parse(storedCourses);
    }
    // Default courses for the first run
    return [
      {
        _id: "course1",
        title: "Introduction to JavaScript",
        description:
          "Learn the fundamentals of web programming with JavaScript.",
        icon: "Code",
      },
      {
        _id: "course2",
        title: "React for Beginners",
        description: "Build dynamic user interfaces with the React library.",
        icon: "Laptop",
      },
      {
        _id: "course3",
        title: "Cloud Computing Basics",
        description:
          "An introduction to the principles and services of cloud computing.",
        icon: "Cloud",
      },
    ];
  });
  // --- END OF NEW CODE ---

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedRole = localStorage.getItem("userRole");

    const syncState = () => {
      setCourses(allCourses);
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const userWithCourses = allUsers.find((u) => u._id === user._id);
        if (userWithCourses) {
          setEnrolledCourses(
            allCourses.filter((course) =>
              userWithCourses.enrolledCourses.includes(course._id)
            )
          );
        }
      }
    };
    syncState();

    if (storedUser && storedRole) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(storedUser));
      setUserRole(storedRole);
    }
  }, [allCourses, allUsers]);

  const saveStateToLocalStorage = (user, role) => {
    if (user && role) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      localStorage.setItem("userRole", role);
      setIsAuthenticated(true);
      setCurrentUser(user);
      setUserRole(role);
    } else {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("userRole");
      setIsAuthenticated(false);
      setCurrentUser(null);
      setUserRole(null);
    }
  };

  const handleLogin = (user) => {
    message.success("Login successful!");
    saveStateToLocalStorage(user, user.role);
    if (user.role === "admin") {
      setView("admin-dashboard");
    } else {
      setView("dashboard");
    }
  };

  const handleLogout = () => {
    message.info("You have been logged out.");
    saveStateToLocalStorage(null, null);
    setView("welcome");
  };

  const handleRegister = (newUser) => {
    const newUsers = [
      ...allUsers,
      { ...newUser, _id: Date.now().toString(), enrolledCourses: [] },
    ];
    setAllUsers(newUsers);
    localStorage.setItem("allUsers", JSON.stringify(newUsers));
    message.success("Registration successful! Please log in.");
    setView("login");
  };

  const handleAddCourse = (newCourse) => {
    const courseToAdd = { ...newCourse, _id: Date.now().toString() };
    const newCourses = [...allCourses, courseToAdd];
    setAllCourses(newCourses);
    localStorage.setItem("allCourses", JSON.stringify(newCourses));
    message.success("Course added successfully!");
    setView("admin-dashboard");
  };

  const handleUpdateCourse = (courseId, updatedCourse) => {
    const newCourses = allCourses.map((course) =>
      course._id === courseId ? { ...course, ...updatedCourse } : course
    );
    setAllCourses(newCourses);
    localStorage.setItem("allCourses", JSON.stringify(newCourses));
    message.success("Course updated successfully!");
    setView("admin-dashboard");
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const newCourses = allCourses.filter((course) => course._id !== courseId);
      setAllCourses(newCourses);
      localStorage.setItem("allCourses", JSON.stringify(newCourses));
      message.success("Course deleted successfully!");
    }
  };

  const handleEnroll = (courseId) => {
    const updatedUser = {
      ...currentUser,
      enrolledCourses: [...currentUser.enrolledCourses, courseId],
    };
    // Update the user in the main allUsers array
    const newAllUsers = allUsers.map((user) =>
      user._id === currentUser._id ? updatedUser : user
    );
    setAllUsers(newAllUsers);
    localStorage.setItem("allUsers", JSON.stringify(newAllUsers));

    // Update current user in session
    saveStateToLocalStorage(updatedUser, currentUser.role);

    message.success("Enrolled successfully!");
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const newUsers = allUsers.filter((user) => user._id !== userId);
      setAllUsers(newUsers);
      localStorage.setItem("allUsers", JSON.stringify(newUsers));
      message.success("User deleted successfully!");
    }
  };

  const handleForgotPassword = (email) => {
    const user = allUsers.find((u) => u.email === email);
    if (user) {
      setResetToken("fake-token-123");
      message.success("A password reset link has been sent to your email.");
      setView("reset-password");
    } else {
      message.error("Email not found.");
    }
  };

  const handleResetPassword = (email, newPassword) => {
    const newUsers = allUsers.map((user) =>
      user.email === email ? { ...user, password: newPassword } : user
    );
    setAllUsers(newUsers);
    localStorage.setItem("allUsers", JSON.stringify(newUsers));
    setResetToken(null);
    message.success(
      "Password has been reset successfully! Please log in with your new password."
    );
    setView("login");
  };

  const renderContent = () => {
    switch (view) {
      case "welcome":
        return (
          <Container
            maxWidth="sm"
            sx={{
              mt: 8,
              textAlign: "center",
              p: 4,
            }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to the Course Management System!
            </Typography>
            <Typography variant="h5" color="text.secondary" paragraph>
              Please log in or register to get started.
            </Typography>
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 4 }}>
              <Grid item>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => {
                    setIsAdminLoginView(false);
                    setView("login");
                  }}
                  startIcon={<Person />}>
                  Student Login
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => {
                    setIsAdminLoginView(true);
                    setView("login");
                  }}
                  startIcon={<AdminPanelSettings />}>
                  Admin Login
                </Button>
              </Grid>
            </Grid>
          </Container>
        );
      case "login":
        return isAdminLoginView ? (
          <AdminLoginForm
            onLogin={handleLogin}
            allUsers={allUsers}
            onBackClick={() => setView("welcome")}
          />
        ) : (
          <StudentLoginForm
            onLogin={handleLogin}
            onRegister={() => setView("register")}
            onForgotPassword={() => setView("forgot-password")}
            allUsers={allUsers}
          />
        );
      case "register":
        return (
          <RegistrationForm
            onSuccessfulRegistration={handleRegister}
            allUsers={allUsers}
          />
        );
      case "forgot-password":
        return (
          <ForgotPassword
            onBackClick={() => setView("login")}
            onForgotPassword={handleForgotPassword}
          />
        );
      case "reset-password":
        return (
          <ResetPasswordForm
            token={resetToken}
            onSuccessfulReset={handleResetPassword}
            allUsers={allUsers}
          />
        );
      case "dashboard":
        return (
          <Dashboard
            enrolledCourses={enrolledCourses}
            availableCourses={courses.filter(
              (course) =>
                !enrolledCourses.some((enrolled) => enrolled._id === course._id)
            )}
            onCourseClick={setSelectedCourse}
            onEnroll={handleEnroll}
          />
        );
      case "admin-dashboard":
        return (
          <AdminDashboard
            courses={allCourses}
            onAddCourseClick={() => setView("add-course")}
            onManageUsersClick={() => setView("manage-users")}
            onEditCourseClick={(course) => {
              setSelectedCourse(course);
              setView("edit-course");
            }}
            onDeleteCourseClick={handleDeleteCourse}
          />
        );
      case "add-course":
        return (
          <AddCourseForm
            onAddCourse={handleAddCourse}
            onBackClick={() => setView("admin-dashboard")}
          />
        );
      case "edit-course":
        return (
          <EditCourseForm
            course={selectedCourse}
            onUpdateCourse={handleUpdateCourse}
            onBackClick={() => setView("admin-dashboard")}
          />
        );
      case "manage-users":
        return (
          <ManageUsers
            users={allUsers}
            onDeleteUser={handleDeleteUser}
            onBackClick={() => setView("admin-dashboard")}
          />
        );
      case "course-details":
        return (
          <CourseDetails
            course={selectedCourse}
            onBackClick={() => setView("dashboard")}
          />
        );
      default:
        return (
          <Dashboard
            enrolledCourses={enrolledCourses}
            availableCourses={courses.filter(
              (course) =>
                !enrolledCourses.some((enrolled) => enrolled._id === course._id)
            )}
            onCourseClick={setSelectedCourse}
            onEnroll={handleEnroll}
          />
        );
    }
  };

  return (
    <>
      <Header
        onLoginClick={() => {
          setIsAdminLoginView(false);
          setView("login");
        }}
        onRegisterClick={() => setView("register")}
        onAdminLoginClick={() => {
          setIsAdminLoginView(true);
          setView("login");
        }}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        isWelcome={view === "welcome"}
      />
      <div className="main-content">{renderContent()}</div>
    </>
  );
}

export default App;
