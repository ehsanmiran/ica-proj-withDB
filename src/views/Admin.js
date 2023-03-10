import ListItem from '../components/ListItem';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Admin = ({ applications, onEdit, onDelete, onApprove }) => {
  const [alternator, setAlternator] = useState(false);
  const { authorized } = useAuthContext();

  useEffect((applications) => {
    applications = applications
  })
  const renderedApplications = applications.map((application) => {
    if (!application.approved && !alternator) {
      return (
        <ListItem
          key={application.id}
          application={application}
          onEdit={onEdit}
          onDelete={onDelete}
          onApprove={onApprove}
        />
      )
    }
    if (application.approved && alternator) {
      return (
        <ListItem
          key={application.id}
          application={application}
          onEdit={onEdit}
          onDelete={onDelete}
          onApprove={onApprove}
        />
      )
    }
  });

  return (
    <div>
      { !authorized && <h3><Link to="/Adminlogin">To access the application form, Log in please.</Link></h3> }
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
              {renderedApplications}
            </div>
          : 
            <div>
              <div className='main-title'>
                <p onClick={()=> setAlternator(!alternator)}>Mottagna ansökningar</p>
                <h1>Godkända ansökningar</h1>
              </div>
              <div className='list-table'>
                <label>Beställarens Namn</label>
                <label>Gäller fr.o.m Datum</label>
              </div>
              <hr></hr>
              {renderedApplications}
            </div>
          }
          
        </div>
      }
    </div>
  )
}

export default Admin