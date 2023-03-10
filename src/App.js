import './App.css';
import Login from './views/Login';
import Ansvarig from './views/Ansvarig';
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



  const editApplicById = async (newApplication, index) => {
    const response = await axios.put(`http://localhost:3001/applications/${newApplication.id}`, newApplication)
    const editedApplication = applications.map((application) => {
      if (application.id === newApplication.id) {
        const newApplications = [...applications];
        newApplications[index] = response;
      }
      return application;
    });
    setApplications(editedApplication);
  };

/* clean version before connecting to db.json
  const editApplicById = (formUpdate) => {
    const editedApplication = applications.map((application) => {
      if (application.id === formUpdate.id) {
        return { ...application, ...formUpdate };
      }
      return application;
    });
    setApplications(editedApplication);
  }; */
  


  const approveById = (approvedApplic) => {
    const editedApplication = applications.map((application) => {
      if (application.id === approvedApplic.id) {
        return { ...application, ...approvedApplic };
      }
      return application;
    });
    setApplications(editedApplication);
  };
  

  const deleteApplicById = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3001/applications/${id}`)
      const updatedApplication = applications.filter(application => {
        return application.id !== id;
      });
      setApplications(updatedApplication);
    } catch (error) {
      console.log(error);
      // handle error here, e.g. show an error message to the user
    }
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
          <Route path='/Ansvarig' element={
            <ProtectedRoute>
              <Ansvarig
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
