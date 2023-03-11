import './App.css';
import Login from './views/Login';
import Admin from './views/Admin';
import Navbar from './components/Navbar';
import ApplicForm from "./components/ApplicForm";

import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useAuthContext } from './hooks/useAuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';


function App() {
  const { authorized } = useAuthContext();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:3001/applications');
      setApplications(response.data);
    }
    fetchData();
  }, []);



  async function handleAddItem(formData) {
    try {
      const response = await axios.post(`http://localhost:3001/applications`, formData);
      const updatedApplications = [...applications, response.data];
      setApplications(updatedApplications);
    } catch (error) {
      console.error(error);
    }
  }

  
  const editApplicById = (formUpdate) => {
    const editedApplication = applications.map((application) => {
      if (application.id === formUpdate.id) {
        return { ...application, ...formUpdate };
      }
      return application;
    });
    setApplications(editedApplication);
  };
  
  const approveById = (approvedApplic) => {
    const editedApplication = applications.map((application) => {
      if (application.id === approvedApplic.id) {
        return { ...application, ...approvedApplic };
      }
      return application;
    });
    setApplications(editedApplication);
  };
  

  async function handleDeleteItem(id) {
    try {
      await axios.delete(`http://localhost:3001/applications/${id}`);
      const updatedApplications = applications.filter((item) => item.id !== id);
      setApplications(updatedApplications);
    } catch (error) {
      console.error(error);
    }
  }

  return (

    <div>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={ 
          <div className="links-style">
          { !authorized && <h3><Link to="/login">To access the application form, you need to log in.</Link></h3> }
          { authorized &&<ApplicForm onCreate={handleAddItem} />}
        </div>
          } />
          <Route path='/login' element={ <Login />} />
          <Route path='/admin' element={
            <ProtectedRoute>
              <Admin
                applications={applications}
                onEdit={editApplicById}
                onDelete={handleDeleteItem}
                onApprove={approveById}
              />
            </ProtectedRoute>
          } />
          <Route path='*' element={ 
            <div>
              <h2>404, path is not found...</h2>
            </div>
          } /> 
        </Routes>
      </div>
    </div>

  );
}

export default App;
