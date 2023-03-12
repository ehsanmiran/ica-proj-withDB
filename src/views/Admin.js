import UnpprovedItem from '../components/UnapprovedItem';
import ApprovedItem from '../components/ApprovedItem';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Ansvarig = ({ applications, onEdit, onDelete }) => {
  const [alternator, setAlternator] = useState(false);
  const { authorized } = useAuthContext();


  return (
    <div>
      { !authorized && <h3><Link to="/Ansvariglogin">To access the application form, Log in please.</Link></h3> }
      { authorized &&
        <div>
          {!alternator ?
            <div>
              <div className='main-title'>
                <h1>Mottagna ansökningar</h1>
                <p onClick={()=> setAlternator(!alternator)}>Godkända ansökningar</p>
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
                    <UnpprovedItem
                      key={application.id}
                      application={application}
                      onEdit={onEdit}
                      onDelete={onDelete}
                    />
                  );
                })
              }
            </div>
          : 
            <div>
              <div className='main-title ICA-font'>
                <p onClick={()=> setAlternator(!alternator)}>Mottagna ansökningar</p>
                <h1>Godkända ansökningar</h1>
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
                    <ApprovedItem
                      key={application.id}
                      application={application}
                    />
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

export default Ansvarig