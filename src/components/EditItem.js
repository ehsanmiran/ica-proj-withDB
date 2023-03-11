import { useState } from 'react';

const EditItem = ({ application, onEdit, onEditBtn }) => {
// retrieve form data and set the initial state
  const [formUpdate, setFormUpdate] = useState(application);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // update the form state with the new value
    setFormUpdate({ ...formUpdate, [name]: value });
  }
  
  const handleEditSubmit = (e) => {
    e.preventDefault();
    onEdit(formUpdate);
    onEditBtn();
  }
  

  
  return (
    <div>
      <form  className='subContainer' onChange={handleInputChange}>

        <div className='flex-container fill-line'>
          <div className='input-group'>
            <label>Beställarens Namn</label>
            <input type="text" name='client' value={formUpdate.client} />
          </div>

          <div className="timestamp input-group">
              <label htmlFor="timestamp">Gäller fr.o.m Datum</label>
              <input type="date" name='validDate' value={formUpdate.validDate} />
          </div>
        </div>
        <hr></hr>

        <div className='flex-container fill-line'>
          <div className='input-group'>
            <label>Konto</label>
            <input type="text" name='konto' value={formUpdate.konto} />
          </div>
          <div className="input-group">
          <label >Konto-text</label>
            <input type="text" name='kontoTxt' value={formUpdate.kontoTxt} />
          </div>
        </div>

        <div className="input-group">
          <div>
            <label>Konteringsregel</label>
            <input type="text" name='kontsReg' value={formUpdate.kontsReg} />
          </div>
          <div>
            <label>Beskrivning av vad kontot ska användas till</label>
            <input type="text" name='anvdsTill' value={formUpdate.anvdsTill} />
          </div>
          <div>
            <label>Bolag</label>
            <input type="text" name='bolag' value={formUpdate.bolag} />
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
          <input type="radio" name='medelsaldo' value='Ja' checked={formUpdate.medelsaldo === "Ja"} />
          <label className='font-regular'>Ja</label>
        </div>  
        <div className='radio-element'>
          <input type="radio" name='medelsaldo' value='Nej' checked={formUpdate.medelsaldo === "Nej"} />
          <label className='font-regular'>Nej</label>
        </div>

        <div className="input-group">
          <label>HFM Bankrapport</label>
          <label className='font-regular'>Avser : ICA Banken</label>
        </div>
        <div className="input-group">
          <label className='font-regular'>HFM Bank BA-konto </label>
          <input type="text" name='bankHFM' value={formUpdate.bankHFM} />
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
            <input type="text" name='egnaBiRapp' value={formUpdate.egnaBiRapp} />
          </div>
        </div>
        <hr></hr>

        <div className="input-group">
          <label>Nytt Konto</label>
          <label className='font-regular'>Finns upplagt i SETMD?</label>
        </div>
        <div className="radio-group">
          <div className='radio-element'>
            <input type="radio" name='iSETMD' value="Ja" checked={formUpdate.iSETMD  === "Ja"} />
            <label className='font-regular'>Upplagt i SETMD och används av annat bolag</label>
          </div>
          <div className='radio-element'>
            <input type="radio" name='iSETMD' value="Nej" checked={formUpdate.iSETMD  === "Nej"} />
            <label className='font-regular'>EJ upplagt i SETMD</label>
          </div>
        </div>

        { formUpdate.iSETMD === 'Nej' ? 
          <div className="input-group">
            <div>
              <label>Gemensamma BI-rapporter</label>
              <label className='font-regular'>Avser : Alla bolag (Metankonto). Ange rapportrad ELLER ett jämförbart konto som styrs lika som det nya kontot</label>
              <input type="text" name='gemnBiRapp' value={formUpdate.gemnBiRapp} />
            </div>
            <div>
              <label>HFM -rapporter</label>
              <label className='font-regular'>Avser : Alla bolag. Ange HFM konto Balance/Categorical</label>
              <input type="text" name='hfmRapp' value={formUpdate.hfmRapp} />
            </div>
          </div>
        : null }
        <hr></hr>

        <div className="input-group">
          <label>Meddelande</label>
          <textarea className='txt-area' type="textarea" name='message' value={formUpdate.message} placeholder="Ett valfritt meddelande kan läggas till här..." />
        </div>
      <div className='treble-btn'>
        <button className='btn-prim' onClick={handleEditSubmit}>Spara</button>
      </div>
      </form>
    </div>
  )
}

export default EditItem