import './App.css';
import Login from './views/Login';
import Admin from './views/Admin';
import Navbar from './components/Navbar';
import ApplicForm from "./components/ApplicForm";

import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { useAuthContext } from './hooks/useAuthContext';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'


function App() {
  const { authorized } = useAuthContext();
  const [applications, setApplications] = useState([]);

  const fetchApplications = async () => {
    const response = await axios.get('http://localhost:3001/applications');
    setApplications(response.data);
  };

  useEffect(()=>{
    fetchApplications();
  }, [])


  const createApplication = async (formData) => {
    const response = await axios.post('http://localhost:3001/applications', { ...formData });
    const applicsArray = [ ...applications, response.data ]
    setApplications(applicsArray);
  };


  const editApplicById = async (formUpdate) => {
    const response = await axios.put(`http://localhost:3001/applications/${formUpdate.id}`, formUpdate)
 
    const editedApplication = applications.map((application) => {
      if (application.id === formUpdate.id) {
        return { ...application, ...response };
      }
      return application;
    });
    setApplications(editedApplication);
  };
  

  const approveById = async (approvedApplic) => {
    const response = await axios.put(`http://localhost:3001/applications/${approvedApplic.id}`, approvedApplic)
    const approvedApplication = applications.map((application) => {
      if (application.id === approvedApplic.id) {
        return { ...application, ...response };
      }
      return application;
    });
    setApplications(approvedApplication);
  };
  

  const deleteApplicById = (id) => {
    const updatedApplication = applications.filter(application => {
      return application.id !== id;
    });
    setApplications(updatedApplication);
  };

  return (

    <div>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={ 
          <div className="links-style">
          { !authorized && <h3><Link to="/login">To access the application form, you need to log in.</Link></h3> }
          { authorized &&<ApplicForm onCreate={createApplication} />}
        </div>
          } />
          <Route path='/login' element={ <Login />} />
          <Route path='/admin' element={
            <ProtectedRoute>
              <Admin
                applications={applications}
                onEdit={editApplicById}
                onDelete={deleteApplicById}
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
