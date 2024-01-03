// import { useState, useEffect } from "react";
// import { useAuthGlobally } from "../context/userAuthContext";
// import axios from "axios";
// import { Outlet } from "react-router-dom";
// import toast from "react-hot-toast";

// export default function PrivateRoute() {
//   const [ok, setOk] = useState(false);
//   const [auth, setAuth] = useAuthGlobally();

//   useEffect(() => {
//     const authCheck = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/user-auth`);
//         if (response.data.ok) {
//           setOk(true);
//         } else {
//           setOk(false);
//           toast.error('Login first');
//         }
//       } catch (error) {
//         setOk(false);
//         toast.error('An error occurred');
//       }
//     };

//     if (auth?.token) authCheck();
//   }, [auth?.token]);

//   return ok ? <Outlet /> : 'loading'
// }








import { useState, useEffect } from "react";
import { useAuthGlobally } from "../context/userAuthContext";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuthGlobally();
  const navigate = useNavigate();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/auth/user-auth`);
        if (response.data.ok) {
          setOk(true);
        } else {
          setOk(false);
          toast.error('Login first');
          navigate('/dashboard'); // Redirect to dashboard or login page
        }
      } catch (error) {
        setOk(false);
        toast.error('An error occurred');
        navigate('/dashboard'); // Redirect to dashboard or login page
      }
    };

    if (auth?.token) {
      authCheck();
    } else {
      // If user is not authenticated, redirect to login or dashboard
      toast.error('Login first');
      navigate('/login');
    }
  }, [auth?.token, navigate]);

  return ok ? <Outlet /> : 'loading';
}



