import ApplicShow from './ApplicShow';
import EditItem from './EditItem';
import { useState } from 'react';

const ListItem = ({ application, /* onEdit, */ onDelete, onApprove }) => {
  const [showDetails, setShowDetails] = useState(false);
/*   const [showEdit, setShowEdit] = useState(false); */
  const [approvedApplic, setApprovedApplic] = useState({approved: false});

   // checkbox handling
  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    setApprovedApplic({ ...application, approved: e.target.checked })
    setChecked(e.target.checked);
  };
  console.log(approvedApplic.approved)
/*   const handleEditBtn = () => {
    setShowEdit(!showEdit);
  }; */
  
  const handleApprove = () => {
    onApprove(approvedApplic);
  }
  
  
  return (
    <div>
      {!showDetails ?
        <div className='list-item'>
          <button className='btn-prim small' onClick={ ()=> setShowDetails(!showDetails) }>Visa</button>
          <div className='list'>
            <p>{application.client}</p>
            <p>{application.validDate}</p>
          </div>
        </div>
      :
        <div>
          {/* {!showEdit ? */}
            <div>
              <button className='btn-prim small' onClick={ ()=> setShowDetails(!showDetails) }>stäng</button>
              <div name='ApplicationShow' className='app-show'>
                <ApplicShow application={application} />
                <div className='subContainer chk-box'>
                  <label className="checkbox-label">
                    <input className="checkbox-input" type="checkbox" checked={checked}  onChange={handleCheckboxChange} />
                    <label>Godkänna ärendet.</label>
                  </label>
                  <div className='treble-btn'>
                    <button className='btn btn-prim' onClick={handleApprove}>Godkänn</button>
                    {/* <button className='btn-prim btn-edit' onClick={handleEditBtn}>Redigera</button> */}
                    <button className='btn-prim btn-delete' onClick={ ()=> onDelete(application.id) }>Ta bort</button>
                  </div>
                </div>
              </div>
            </div>
          {/* :
            <EditItem
              application={application}
              onEdit={onEdit}
              handleEditBtn={handleEditBtn}
            />
          } */}
        </div>
        
          
      }


      <hr></hr>
    </div>
  )
}

export default ListItem