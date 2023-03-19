import ApplicShow from './ApplicShow';
import { useState } from 'react';


const ApprovedItem = ({ application }) => {

    const [showDetails, setShowDetails] = useState(false);
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
                <button className='btn-prim small' onClick={ ()=> setShowDetails(!showDetails) }>stäng</button>
                <div name='ApplicationShow' className='app-show'>
                    <ApplicShow />
                </div>
            </div>   
        }


        <hr></hr>
    </div>
    )
}

export default ApprovedItem