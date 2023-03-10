import './App.css';
import Login from './views/Login';
import Admin from './views/Admin';
import Navbar from './components/Navbar';
import ApplicForm from "./components/ApplicForm";

import { Routes, Route } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { useAuthContext } from './hooks/useAuthContext';
import { useState } from 'react';
import { Link } from 'react-router-dom'


function App() {
  const { authorized } = useAuthContext();
  const [applications, setApplications] = useState([]);

  const createApplication = (formData) => {
    const applicsArray = [
      {
        id: Date.now().toString(),
        ...formData
      },
      ...applications
    ]
    setApplications(applicsArray);
  };

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
