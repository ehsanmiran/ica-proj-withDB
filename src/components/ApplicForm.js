import { useState } from 'react';

const ApplicForm = ({ onAddItem }) => {
  const [verification, setVerification] = useState(true)
  const [successSend, setSuccessSend] = useState(false)

  const currentDate = new Date(Date.now())
    .toLocaleString('sv-SE', {
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });


  const [formData, setFormData] = useState({
    approved: '',
    client: '',
    validDate: '',
    konto: '',
    kontoTxt: '',
    kontsReg: '',
    anvdsTill: '',
    bolag: '',
    medelsaldo: '',
    bankHFM:  '',
    egnaBiRapp:  '',
    iSETMD:  '',
    gemnBiRapp:  '',
    hfmRapp:  '',
    message:  '',
    issueDate:  '',
    userID: '',
    approvedBy: '',
    approveDate: ''
  });
  //---- "userID" & "approvedBy" will be automatically added to the "object" above,  taking 
  //---- their values from the user inlogging data to identify who's added this application.

// ------------- radio inputs -----------------
  const [option1, setOption1] = useState('Nej');
  const [option2, setOption2] = useState('Nej');

  const handleOption1Change = (event) => {
    setOption1(event.target.value);
  };

  const handleOption2Change = (event) => {
    setOption2(event.target.value);
  };



  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
      issueDate: currentDate
    }));

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.client.length === 0 
      || formData.validDate.length === 0  
      || formData.iSETMD.length === 0 
      || formData.medelsaldo.length === 0)
    {
      setVerification(false);
      return
    }else{
        setVerification(true)
        onAddItem(formData);
        setSuccessSend(true);
    }
    setFormData({})
  }



  return (
    <div>
      {!successSend ?
        <div>
          <div className='main-title ICA-font'>
            <h1>Beställning Nytt Konto till Agresso</h1>
          </div>
          <form className='subContainer' onSubmit={handleSubmit} onChange={handleChange} >

            <div className='flex-container fill-line'>
              <div className='input-group'>
                <label>Beställarens Namn</label>
                <input type="text" name='client' value={formData.client} onChange={handleChange} />
              </div>

              <div className="timestamp input-group">
                  <label htmlFor="timestamp">Gäller fr.o.m Datum</label>
                  <input type="date" name='validDate' value={formData.validDate} onChange={handleChange} />
              </div>
            </div>
            <hr></hr>

            <div className='flex-container fill-line'>
              <div className='input-group'>
                <label>Konto</label>
                <input type="text" name='konto' value={formData.konto} onChange={handleChange} />
              </div>
              <div className="input-group">
              <label >Konto-text</label>
                <input type="text" name='kontoTxt' value={formData.kontoTxt} onChange={handleChange} />
              </div>
            </div>

            <div className="input-group">
              <div>
                <label>Konteringsregel</label>
                <input type="text" name='kontsReg' value={formData.kontsReg} onChange={handleChange} />
              </div>
              <div>
                <label>Beskrivning av vad kontot ska användas till</label>
                <input type="text" name='anvdsTill' value={formData.anvdsTill} onChange={handleChange} />
              </div>
              <div>
                <label>Bolag</label>
                <input type="text" name='bolag' value={formData.bolag} onChange={handleChange} />
              </div>
            </div>
            <hr></hr>
              
            <div className="input-group">
              <label>Relation i SE150</label>
              <label className='font-regular'>Avser : ICA Banken</label>
            </div>
            <div className='radio-element'>
              <label className='font-regular'>Ange Medelsaldo</label>
            </div>  
            <div className='radio-element'>
              <input type="radio" name='medelsaldo' 
                 value='Ja'
                 onChange={handleOption1Change}
              />
              <label className='font-regular'>Ja</label>
            </div>  
            <div className='radio-element'>
              <input type="radio" name='medelsaldo' 
                value='Nej'
                onChange={handleOption1Change}
              />
              <label className='font-regular'>Nej</label>
            </div>

            <div className="input-group">
              <label>HFM Bankrapport</label>
              <label className='font-regular'>Avser : ICA Banken</label>
            </div>
            <div className="input-group">
              <label className='font-regular'>HFM Bank BA-konto </label>
              <input type="text" name='bankHFM' value={formData.bankHFM} onChange={handleChange} />
            </div>
            <hr></hr>

            <div className="input-group">
              <div>
                <label>Egna BI-Rapporter</label>
                <label className='font-regular'>Avser :</label>
                <ul>
                  <li className='font-regular'>ICA Gruppen IT (ITSETICA-Rapport)</li>
                  <li className='font-regular'>ICA Banken (Banktree-rapport)</li>
                  <li className='font-regular'>ICA Sverige (Omkostnads-rapport och VUIT-rapport)</li>
                </ul>
                <input type="text" name='egnaBiRapp' value={formData.egnaBiRapp} onChange={handleChange} />
              </div>
            </div>
            <hr></hr>

            <div className="input-group">
              <label>Nytt Konto</label>
              <label className='font-regular'>Finns upplagt i SETMD?</label>
            </div>
            <div className="radio-group">
              <div className='radio-element'>
                <input type="radio" name='iSETMD'
                  value='Ja'
                  onChange={handleOption2Change}
                />
                <label className='font-regular'>Upplagt i SETMD och används av annat bolag</label>
              </div>
              <div className='radio-element'>
                <input type="radio" name='iSETMD'
                  value='Nej'
                  onChange={handleOption2Change}
                />
                <label className='font-regular'>EJ upplagt i SETMD</label>
              </div>
            </div>

            { formData.iSETMD === 'Nej' ? 
              <div className="input-group">
                <div>
                  <label>Gemensamma BI-rapporter</label>
                  <label className='font-regular'>Avser : Alla bolag (Metankonto). Ange rapportrad ELLER ett jämförbart konto som styrs lika som det nya kontot</label>
                  <input type="text" name='gemnBiRapp' value={formData.gemnBiRapp} onChange={handleChange} />
                </div>
                <div>
                  <label>HFM -rapporter</label>
                  <label className='font-regular'>Avser : Alla bolag. Ange HFM konto Balance/Categorical</label>
                  <input type="text" name='hfmRapp' value={formData.hfmRapp} onChange={handleChange} />
                </div>
              </div>
            :null 
            }
            <hr></hr>

            <div className="input-group">
              <label>Meddelande</label>
              <textarea className='txt-area' type="textarea" name='message' value={formData.message} placeholder="Ett valfritt meddelande kan läggas till här..." onChange={handleChange}  />
            </div>

            <button className="btn btn-prim">Skicka</button>
            {!verification && <p className='question'>* "Beställarens namn", "datum", "iSETMD" och "Medelsaldo" får inte vara tomma.</p>}

          </form>
        </div>
        :
        <div>
          <p>Tack</p>
          <button onClick={ () => setSuccessSend(!successSend) } className="btn btn-prim">Ny Ansökan?</button>
        </div>
      }  
    </div>
  )
}

export default ApplicForm