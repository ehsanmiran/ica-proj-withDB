import ApplicShow from './ApplicShow';
import EditItem from './EditItem';
import { useState } from 'react';

const UnapprovedItem = ({ application, onEdit, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [approvedItem, setApprovedItem] = useState({});

   //------------ checkbox handling --------------
  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    setApprovedItem({ ...application, approved: 'Godkänd' })
    setChecked(e.target.checked);
  };
  
  const handleEditBtn = () => { 
    setShowEdit(!showEdit);
  };
  
  const approveClicked = (e) => {
    if (checked) {
      onEdit(approvedItem)
    }
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
          {!showEdit ?
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
                    <button className='btn btn-prim' onClick={approveClicked}>Godkänn</button>
                    <button className='btn-prim btn-edit' onClick={handleEditBtn}>Redigera</button>
                    <button className='btn-prim btn-delete' onClick={ ()=> onDelete(application.id) }>Ta bort</button>
                  </div>
                </div>
              </div>
            </div>
          :
            <EditItem
              application={application}
              onEdit={onEdit}
              onEditBtn={handleEditBtn}
            />
          }
        </div>
      }
      <hr></hr>
    </div>
  )
}

export default UnapprovedItem