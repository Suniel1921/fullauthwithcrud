import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthGlobally } from '../context/userAuthContext'
import toast from 'react-hot-toast';

const Navbar = () => {
  const [auth, setAuth] = useAuthGlobally();

  const handleLogout = ()=>{
    setAuth({...auth,
       user: null,
       token : '',
      })
      localStorage.removeItem('auth')
      toast.success("Logged Out")
  }


  return (
    <>
        <nav className='navbar'>
            <h3>logo</h3>
            <ul className='navlinks'>
                <NavLink to={'/'}>Home</NavLink>
                {/* <NavLink to={'dashboard/protectedPage'}>protected Page</NavLink> */}
                <NavLink to={'dashboard/employee'}>Add Employee</NavLink>

                {!auth.user ? (<>
                <NavLink to={'/login'}>Login</NavLink>
                <NavLink to={'/register'}>Register</NavLink>
                </>) : (<>
                  <NavLink onClick={handleLogout} to={'/login'}>Logout</NavLink>
                </>)

                }
               
                
            </ul>
        </nav>
    </>
  )
}

export default Navbar