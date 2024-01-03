import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuthGlobally } from './context/userAuthContext';
import Cookies from 'js-cookie';

const Login = () => {
  const [auth, setAuth] = useAuthGlobally();
  const navigate = useNavigate();


  const validationSchema = () => {
    return Yup.object({
      email: Yup.string().email("Invalid Email address").required("Email is required"),
      password: Yup.string().required("Password is required"),
    });
  };

  const formik = useFormik({
  initialValues: {
    email : '',
    password : '',
  }, 
 validationSchema: validationSchema,
  onSubmit: async (values)=>{
    try {
      const res = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/login`,values);
      if(res.status === 200){
        toast.success("logged In")

         // Save the user and token in cookies
        //  Cookies.set('user', JSON.stringify(res.data.userExit), { expires: 7 }); // expires in 7 days
        //  Cookies.set('token', res.data.token, { expires: 7 });

        // save the user and token in localStorage
        localStorage.setItem('auth',JSON.stringify(res.data))

        // Update the global auth state
          setAuth({
            ...auth,
            user: res.data.userExit,
            token: res.data.token,
          });

        // formik.resetForm();
        navigate('/')        
      }
     
      
    } catch (error) {
      if(error.response){
        toast.error(error.response.data.message);
      }
      else{
        toast.error("Something went wrong")
      }
      
    }
  }

  })



  return (
    <div className='container'>
    <div className="container">
      <div className="mainform">
      <div className="formContainer"> 
      <h3>Login Here</h3>
      <form className="form" onSubmit={(e)=>{
        e.preventDefault();
        formik.handleSubmit(e);        
      }}>
        <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type="email" name="email" placeholder="Enter Your Email" />
        {formik.touched.email && formik.errors.email && <p className='error'>{formik.errors.email}</p>}
        <input onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} type="password" name="password" placeholder="Enter Your Password" />
        {formik.touched.password && formik.errors.password && <p className='error'>{formik.errors.password}</p>}
        <button className="btn" type="submit">Login</button>
        <p>Not Have An Account ? <Link to={'/register'}>Create Here</Link> </p>
      </form>
      </div>
      </div>
    </div>
</div>
  )
}

export default Login