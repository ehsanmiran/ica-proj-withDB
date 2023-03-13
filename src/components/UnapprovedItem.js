import ApplicShow from './ApplicShow';
import EditItem from './EditItem';
import { useState } from 'react';

const UnapprovedItem = ({ application, onEdit, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [approvedItem, setApprovedItem] = useState({});


  const currentDate = new Date(Date.now())
  .toLocaleString('sv-SE', {
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });

   //------------ checkbox handling --------------
  const [checked, setChecked] = useState(false);
  const handleCheckboxChange = (e) => {
    setApprovedItem({ ...application, approved: 'Godkänd', approveDate: currentDate})
    setChecked(e.target.checked);
  };
  //------ when checkbox checked: get the "GodkännaresID" from inlogging data
  //------ and add it to the object as a "application.approvedBy". This will be
  //------ shown only on the "applicShow" of "Godkända ansökningar" list.


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