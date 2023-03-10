import ListItem from '../components/ListItem';
import ApprovedItemsList from '../components/ApprovedItemsList';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Admin = ({ applications, onEdit, onDelete, onApprove }) => {
  const [alternator, setAlternator] = useState(false);
  const { authorized } = useAuthContext();



  const render1 = applications
  .filter((application) => !application.approved)
  .map((application, index) => {
    return (
      <ListItem
        key={application.id}
        application={application}
        index={index}
        onEdit={onEdit}
        onDelete={onDelete}
        onApprove={onApprove}
      />
    );
  });
  
  const render2 = applications
  .filter((application) => application.approved)
  .map((application, index) => {
    return (
      <ApprovedItemsList
        key={application.id}
        application={application}
        index={index}
      />
    )
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
              {render1}
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
              {render2}
            </div>
          }
          
        </div>
      }
    </div>
  )
}

export default Admin