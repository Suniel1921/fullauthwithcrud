// OTPModal.jsx

import React, { useState } from 'react';
// import Modal from 'react-modal';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const OTPModal = () => {
  const [otp, setOTP] = useState('');
  const navigate = useNavigate();

  const handleVerify = async () => {
    if (otp.trim() === '') {
      toast.error('Please enter the OTP');
    } else {
      try {
        const response = await axios.post(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/verifyOTP+9+`, {otp});
        // const response = await axios.post('http://localhost:3000/api/v1/auth/verifyOTP', {otp});

        if (response.data.success) {
          toast.success('OTP verification successful');
          navigate('/')
          
        } else {
          toast.error(`OTP verification failed: ${response.data.message}`);
        }
      } catch (error) {
        // console.error('Error during OTP verification:', error.message);        
        if(error.response){
         toast.error(error.response.data.message);
        }
        else{
            toast.error('Failed to verify OTP');
        }
      }
    }
  };

  return (
    <>
      <div className='mainform'>
      <div className='formContainer'>
      <div className='form'>
      <h2>Enter OTP</h2>
      <input type="number" value={otp} onChange={(e) => setOTP(e.target.value)} placeholder='Enter Your OTP' />
      <button className='btn' onClick={handleVerify}>Verify OTP</button>
      </div>
      </div>
      </div>
    </>
  );
};

export default OTPModal;

