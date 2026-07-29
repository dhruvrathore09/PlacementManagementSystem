import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Dashboard from "./pages/student/Dashboard";
import Profile from "./pages/student/Profile";
import Companies from "./pages/student/Companies";
import CompanyDetails from "./pages/student/CompanyDetails";
import Applications from "./pages/student/Applications";

import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";

import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCompanies from "./pages/admin/Companies";
import AddCompany from "./pages/admin/AddCompany";
import EditCompany from "./pages/admin/EditCompany";
import AdminStudents from "./pages/admin/Students";
import AdminApplications from "./pages/admin/Applications";

function App() {
  const location = useLocation();

  const hideNavbar =
    location.pathname.startsWith("/student") ||
    location.pathname.startsWith("/admin");

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/student/dashboard" element={<Dashboard />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/student/companies" element={<Companies />} />
        <Route
          path="/student/company-details"
          element={<CompanyDetails />}
        />
        <Route
          path="/student/applications"
          element={<Applications />}
        />

        {/* Admin routes — nested inside AdminLayout for sidebar */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="companies" element={<AdminCompanies />} />
          <Route path="add-company" element={<AddCompany />} />
          <Route path="edit-company/:id" element={<EditCompany />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="applications" element={<AdminApplications />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;