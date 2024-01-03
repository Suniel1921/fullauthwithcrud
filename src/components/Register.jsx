
// Register.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast'
import axios from 'axios';


const Register = () => {
  const navigate = useNavigate();

  const validationSchema = () => {
    return Yup.object({
      name: Yup.string().required("Name is required"),
      email: Yup.string().email("Invalid Email address").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const res = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/register`, values);
        if (res.status === 201) {
          toast.success(res.data.message);

          // Redirect to OTP verification page
          // navigate(`/otp-verification?email=${values.email}`);
          navigate('/OtpModal')
        }
      } catch (error) {
        if (error.response) {
          toast.error(error.response.data.message);
        } else {
          toast.error('Something went wrong');
        }
      }
    },
  });

  return (
    <div className="container">
      <div className="mainform">
        <div className="formContainer">
          <h3>Register Here</h3>
          <form onSubmit={formik.handleSubmit} className="form">
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              type="text"
              name="name"
              placeholder="Enter Your Name"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="error">{formik.errors.name}</p>
            )}
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              type="email"
              name="email"
              placeholder="Enter Your Email"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="error">{formik.errors.email}</p>
            )}
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter Your Password"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="error">{formik.errors.password}</p>
            )}
            <button className="btn" type="submit">
              Register
            </button>
            <p>
              Already Have An Account ?{' '}
              <Link to={'/login'}>Login Here</Link>{' '}
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
