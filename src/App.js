import './App.css';
import './font.css';
import Login from './views/Login';
import Admin from './views/Admin';
import Navbar from './components/Navbar';
import ApplicForm from "./components/ApplicForm";

import { Routes, Route } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import { ProtectedRoute } from './routes/ProtectedRoute';
import ApplicsContext from './contexts/ApplicsContext';


function App() {
  const { authorized } = useAuthContext();
  const { fetchApplics} = useContext(ApplicsContext);

  useEffect(() => {
    fetchApplics();
  }, []);

  return (

    <div>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='/' element={ 
            <div className="links-style">
              { !authorized && <h3><Link to="/login">This is the "login" page, which leads to Different.. To access the application form "Beställning Nytt Konto till Agresso", you need to log in.</Link></h3> }
              { authorized &&<ApplicForm />}
            </div>
          } />
          <Route path='/login' element={ <Login />} />
          <Route path='/admin' element={
            <ProtectedRoute>
              <Admin />
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
