import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Navbar from "./components/Navbar/Navbar";
import ProtectedPage from "./components/pages/ProtectedPage";
import Register from "./components/Register";
import Login from "./components/Login";
import { Toaster } from "react-hot-toast";
import Dashboard from "./components/user/Dashboard";
import OTPModal from "./components/pages/OTPModal";
import PrivateRoute from "./components/user/Private";
import EmpDetails from "./components/pages/empDetails";
import AddEmployee from "./components/pages/AddEmployee";


const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/*" element={<PrivateRoute />}>
          <Route path="protectedPage" element={<ProtectedPage />} />
          <Route path="employee" element={<EmpDetails/>} />
          <Route path="addEmployee" element={<AddEmployee/>}/>
          </Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/otpModal" element={<OTPModal />} />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
};

export default App;
