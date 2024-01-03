import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddEmployee = () => {

    const validationSchema = ()=>{
        return Yup.object({
            name : Yup.string().required("Name is required"),
            email: Yup.string().email("Invalid Email").required("Email is required"),
            role : Yup.string().required("Role is required"),
        })
    }

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            role : '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values)=>{
            try {
                const res = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/employee/createEmployee`,values)
                if(res.data.success){
                    toast.success(res.data.message);
                    formik.resetForm();
                }
                
            } catch (error) {
                if(error.response){
                    toast.error(error.response.data.message);
                  }
                else{
                    toast.error('something went wrong')

                }
            }

        }
    })

  return (
   <div className="container">
    <div className='empContainer'>
    <div className="leftSec">
        <img src="https://images.pexels.com/photos/927022/pexels-photo-927022.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
    </div>
    <div className="rightSec">
    <form className="form" onSubmit={(e)=>{
        e.preventDefault();
        formik.handleSubmit(e);        
      }}>
            <label>Employee Name</label>
            <input onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} type="text" name="name" placeholder='Emplyee Name'/>
            {formik.touched.name && formik.errors.name && <p className='error'>{formik.errors.name}</p>}
            <label>Emaployee Email Id</label>
            <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type="email" name="email" placeholder='Employee Email Id'/>
            {formik.touched.email && formik.errors.email && <p className='error'>{formik.errors.email}</p>}
            <label> Employee Role</label>
            <input onChange={formik.handleChange} value={formik.values.role} onBlur={formik.handleBlur} type="text" name="role" placeholder='Employee Role' />
            {formik.touched.role && formik.errors.role && <p className='error'>{formik.errors.role}</p>}
            <button className='btn empBtn' type="submit">Create Employee</button>
            <p>see employee List <Link to={'/dashboard/employee'}>Click Here</Link> </p>
        </form>
    </div>
    </div>
   </div>
  )
}

export default AddEmployee