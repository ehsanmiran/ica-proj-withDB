import { useState } from 'react';

const ApplicForm = ({ onCreate }) => {
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


  const [formData, setFormData] = useState({});

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
        onCreate(formData);
        setSuccessSend(true);
    }
    setFormData({})
  }

  return (
    <div>
      {!successSend ?
        <div>
          <div className='main-title'>
            <h2>Beställning Nytt Konto till Agresso</h2>
          </div>
          <form className='subContainer' onSubmit={handleSubmit} onChange={handleChange} >

            <div className='flex-container fill-line'>
              <div className='input-group'>
                <label>Beställarens Namn</label>
                <input type="text" name='client' value={formData.client} />
              </div>

              <div className="timestamp input-group">
                  <label htmlFor="timestamp">Gäller fr.o.m Datum</label>
                  <input type="date" name='validDate' value={formData.validDate} />
              </div>
            </div>
            <hr></hr>

            <div className='flex-container fill-line'>
              <div className='input-group'>
                <label>Konto</label>
                <input type="text" name='konto' value={formData.konto} />
              </div>
              <div className="input-group">
              <label >Konto-text</label>
                <input type="text" name='kontoTxt' value={formData.kontoTxt} />
              </div>
            </div>

            <div className="input-group">
              <div>
                <label>Konteringsregel</label>
                <input type="text" name='kontsReg' value={formData.kontsReg} />
              </div>
              <div>
                <label>Beskrivning av vad kontot ska användas till</label>
                <input type="text" name='anvdsTill' value={formData.anvdsTill} />
              </div>
              <div>
                <label>Bolag</label>
                <input type="text" name='bolag' value={formData.bolag} />
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
              <input type="radio" name='medelsaldo' value="Ja" />
              <label className='font-regular'>Ja</label>
            </div>  
            <div className='radio-element'>
              <input type="radio" name='medelsaldo' value="Nej" />
              <label className='font-regular'>Nej</label>
            </div>

            <div className="input-group">
              <label>HFM Bankrapport</label>
              <label className='font-regular'>Avser : ICA Banken</label>
            </div>
            <div className="input-group">
              <label className='font-regular'>HFM Bank BA-konto </label>
              <input type="text" name='bankHFM' value={formData.bankHFM} />
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
                <input type="text" name='egnaBiRapp' value={formData.egnaBiRapp} />
              </div>
            </div>
            <hr></hr>

            <div className="input-group">
              <label>Nytt Konto</label>
              <label className='font-regular'>Finns upplagt i SETMD?</label>
            </div>
            <div className="radio-group">
              <div className='radio-element'>
                <input type="radio" value="Ja" name='iSETMD' />
                <label className='font-regular'>Upplagt i SETMD och används av annat bolag</label>
              </div>
              <div className='radio-element'>
                <input type="radio" value="Nej" name='iSETMD' />
                <label className='font-regular'>EJ upplagt i SETMD</label>
              </div>
            </div>

            { formData.iSETMD === 'Nej' ? 
              <div className="input-group">
                <div>
                  <label>Gemensamma BI-rapporter</label>
                  <label className='font-regular'>Avser : Alla bolag (Metankonto). Ange rapportrad ELLER ett jämförbart konto som styrs lika som det nya kontot</label>
                  <input type="text" name='gemnBiRapp' value={formData.gemnBiRapp} />
                </div>
                <div>
                  <label>HFM -rapporter</label>
                  <label className='font-regular'>Avser : Alla bolag. Ange HFM konto Balance/Categorical</label>
                  <input type="text" name='hfmRapp' value={formData.hfmRapp} />
                </div>
              </div>
            :null 
            }
            <hr></hr>

            <div className="input-group">
              <label>Meddelande</label>
              <textarea className='txt-area' type="textarea" name='message' value={formData.message} placeholder="Ett valfritt meddelande kan läggas till här..." />
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