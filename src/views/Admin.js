import UnpprovedItem from '../components/UnapprovedItem';
import ApprovedItem from '../components/ApprovedItem';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { useState, useContext } from 'react';
import ApplicsContext from '../contexts/ApplicsContext';


const Admin = () => {
  const [alternator, setAlternator] = useState(false);
  const { authorized } = useAuthContext();

  const { applications } = useContext(ApplicsContext);


  return (
    <div>
      { !authorized && <h3><Link to="/Adminlogin">To access the application form, Log in please.</Link></h3> }
      { authorized &&
        <div>
          {!alternator ?
            <div>
              <div className='main-title'>
                <h1>Mottagna ansökningar</h1>
                <p onClick={()=> setAlternator(!alternator)}>Godkända ansökningar / Arkiverad</p>
              </div>
              <div className='list-table'>
                <label>Beställarens Namn</label>
                <label>Gäller fr.o.m Datum</label>
              </div>
              <hr></hr>
              {
                applications.filter((application) => !application.approved)
                .map((application) => {
                  return (
                    <UnpprovedItem key={application.id} application={application} />
                  );
                })
              }
            </div>
          : 
            <div>
              <div className='main-title ICA-font'>
                <p onClick={()=> setAlternator(!alternator)}>Mottagna ansökningar</p>
                <h1>Godkända ansökningar / Arkiverad</h1>
              </div>
              <div className='list-table'>
                <label>Beställarens Namn</label>
                <label>Gäller fr.o.m Datum</label>
              </div>
              <hr></hr>
              {
                applications
                .filter((application) => application.approved)
                .map((application) => {
                  return (
                    <ApprovedItem key={application.id} application={application} />
                  )
                })
              }
            </div>
          }
          
        </div>
      }
    </div>
  )
}

export default Admin