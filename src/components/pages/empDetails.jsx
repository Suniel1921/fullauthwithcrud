// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { MdDeleteForever } from "react-icons/md";
// import { MdEdit } from "react-icons/md";
// import toast from "react-hot-toast";
// import axios from "axios";
// import {Modal} from 'antd';


// const empDetails = () => {

//   const [empData, setEmpData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     role: ""
//   });

//   const [searchTerm, setSearchTerm] = useState("");


//   //getallemployee
//   const AllEmployee = async () => {
//     try {
//       const res = await axios.get(
//         `${import.meta.env.VITE_REACT_APP_URL}/api/v1/employee/getAllEmployee`,
//         {
//           params: {
//             name: searchTerm // pass the search term to the server
//           }
//         }
//       );
//     } catch (error) {
//       if (error.response) {
//         toast.error(response.data.message);
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   };

//   useEffect(() => {
//     AllEmployee();
//   }, [searchTerm]);



//   //udpate/edit employee data

//   // Handle opening the modal
//   const showModal = (employee) => {
//     setSelectedProduct(employee._id);
//     setFormData({
//       name: employee.name,
//       email: employee.email,
//       role: employee.role
//     });
//     setIsModalOpen(true);
//   };

//   // Handle closing the modal
//   const handleCancel = () => {
//     setIsModalOpen(false);
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   // Handle form submission
//   const handleFormSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.put(
//         `${import.meta.env.VITE_REACT_APP_URL}/api/v1/employee/updateEmployee/${selectedProduct}`,
//         formData
//       );
//       if (res.data.success) {
//         toast.success("Employee updated successfully");
//         setIsModalOpen(false);
//         AllEmployee(); // Refresh the employee list
//       } else {
//         toast.error(res.data.message);
//       }
//     } catch (error) {
//       if (error.response) {
//         toast.error(error.response.data.message);
//       } else {
//         toast.error("Something went wrong");
//       }
//     }
//   };



//   //delete employee
//   const deleteEmployee = async (employeeId)=>{
//     try {
//       const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/employee/deleteEmployee/${employeeId}`)
//       if (res.data.success) {
//         toast.success("Employee deleted successfully");
//         setIsModalOpen(false); // Close the modal if open
//         AllEmployee(); // Refresh the employee list
//       } else {
//         toast.error(res.data.message);
//       }
      
//     } catch (error) {
//       if(response.error){
//         toast.error(error.response.data.message)
//       }
//       else{
//         toast.error("something went wrong")
//       }
      
//     }
//   }




//   return (
//     <div className="bgBlack">
//       <div className="container">
//       <div className="employeeSection">
//           <input
//             type="text"
//             placeholder="Search by employee name"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="employeeSection">
//           <div className="empDetails">
//             <h2>Employee</h2>
//             <p>
//               This is the list of all employee. you can add new employee, edit,
//               update, or delete existing ones.
//             </p>
//           </div>
//           <div className="addempBtn">
//             <button className="btn empBtn">
             
//               <Link to="/dashboard/addEmployee" className="emplink">
//                 Add Employee
//               </Link>
//             </button>
//           </div>
//         </div>

//         <div className="tablesection">
//           <table className="table">
//             <thead className="thead">
//               <tr>
//                 <th className="table-header">Name</th> 
//                 <th className="table-header">Email</th>
//                 <th className="table-header">Role </th>
//               </tr>
//             </thead>

//             <tbody className="tbody">
//               {empData.length === 0 ? (
//                 <tr>
//                   <td colSpan="4">No employees available</td>
//                 </tr>
//               ) : (
//                 empData.map((employee) => (
//                   <tr key={employee.id}>
//                     <td>{employee.name}</td>
//                     <td>{employee.email}</td>
//                     <td>{employee.role}</td>
//                     <td>
//                       <MdDeleteForever
//                         className="icon-delete"
//                         onClick={() => deleteEmployee(employee._id)}
//                       />
//                       <MdEdit onClick={() => showModal(employee)} className="icon-edit" />
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table> 
//         </div>
//       </div>

//       <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
//         <form onSubmit={handleFormSubmit}>
//           <h4>Edit Employee</h4>
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="role"
//             value={formData.role}
//             onChange={handleInputChange}
//           />
//           <button type="submit">Update</button>
//         </form>
//       </Modal>
//     </div>
//   );
// };

// export default empDetails;







import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import { Modal } from 'antd';

const EmpDetails = () => {
  const [empData, setEmpData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: ""
  });
  const [searchTerm, setSearchTerm] = useState("");

  //get all employees based on search term
  const AllEmployee = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_REACT_APP_URL}/api/v1/employee/getAllEmployee`,
        {
          params: {
            name: searchTerm
          }
        }
      );
      if (res.data.success) {
        setEmpData(res.data.getAllEmployee);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // useEffect to trigger API call when searchTerm changes
  useEffect(() => {
    // if (searchTerm.trim() !== "") {
    //   AllEmployee();
    // }
    AllEmployee();
  }, [searchTerm]);

  //udpate/edit employee data
  // Handle opening the modal
  const showModal = (employee) => {
    setSelectedProduct(employee._id);
    setFormData({
      name: employee.name,
      email: employee.email,
      role: employee.role
    });
    setIsModalOpen(true);
  };

  // Handle closing the modal
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_REACT_APP_URL}/api/v1/employee/updateEmployee/${selectedProduct}`,
        formData
      );
      if (res.data.success) {
        toast.success("Employee updated successfully");
        setIsModalOpen(false);
        AllEmployee(); // Refresh the employee list
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  //delete employee
  const deleteEmployee = async (employeeId) => {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_URL}/api/v1/employee/deleteEmployee/${employeeId}`);
      if (res.data.success) {
        toast.success("Employee deleted successfully");
        setIsModalOpen(false);
        
        // Filter out the deleted employee from the empData state
        setEmpData(prevData => prevData.filter(employee => employee._id !== employeeId));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  

 

  return (
    <div className="bgBlack">
      <div className="container">
        <div className="employeeSection">
          <div className="empDetails">
            <h2>Employee</h2>
            <p>
              This is the list of all employee. you can add new employee, edit,
              update, or delete existing ones.
            </p>
          </div>
          <div className="addempBtn">
            <button className="btn empBtn"><Link className="emplink" to={'/dashboard/addemployee'}>Add Employee </Link></button>
          </div>
          {/* search button */}
          <div className="searchBtn"> 
          <input
            type="text"
            placeholder="Search by employee name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        </div>

        <div className="tablesection">
          <table className="table">
            <thead className="thead">
              <tr>
                <th className="table-header">Name</th>
                <th className="table-header">Email</th>
                <th className="table-header">Role</th>
                <th className="table-header">Actions</th>
              </tr>
            </thead>

            <tbody className="tbody">
              {empData.length === 0 ? (
                <tr>
                  <td colSpan="4">No employees available</td>
                </tr>
              ) : (
                empData.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.role}</td>
                    <td>
                      <MdDeleteForever
                        className="icon-delete"
                        onClick={() => deleteEmployee(employee._id)}
                      />
                      <MdEdit
                        onClick={() => showModal(employee)}
                        className="icon-edit"
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <form onSubmit={handleFormSubmit}>
          <h4>Edit Employee</h4>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
          />
          <button type="submit">Update</button>
        </form>
      </Modal>
    </div>
  );
};

export default EmpDetails;
