

const ApplicShow = ({ application }) => {

  return (
    <div>
      <div className='list'><p>Gäller fr.o.m Datum:</p> { application.validDate }</div><hr></hr>
      <div className='list'><p>Beställarens Namn:</p> { application.client }</div><hr></hr>
      <div className='list'><p>Konto:</p> { application.konto }</div><hr></hr>
      <div className='list'><p>Konto-text:</p> { application.kontoTxt }</div><hr></hr>
      <div className='list'><p>Konteringsregel:</p> { application.kontsReg }</div><hr></hr>
      <div className='list'><p>Beskrivning av vad kontot ska användas till:</p> { application.anvdsTill }</div><hr></hr>
      <div className='list'><p>Bolag:</p> { application.bolag }</div><hr></hr>
      <div className='list'><p>Relation i SE150 / har Medelsaldo?:</p>{ application.medelsaldo }</div><hr></hr>
      <div className='list'><p>HFM Bankrapport / HFM Bank BA-konto:</p> { application.bankHFM }</div><hr></hr>
      <div className='list'><p>Egna BI-Rapporter:</p> { application.egnaBiRapp }</div><hr></hr>
      <div className='list'><p>Finns upplagt i SETMD?:</p> { application.iSETMD }</div><hr></hr>
      <div className='list'><p>Gemensamma BI-rapporter:</p> { application.gemnBiRapp }</div><hr></hr>
      <div className='list'><p>HFM -rapporter:</p> { application.hfmRapp }</div><hr></hr>
      <div className='list'><p>Meddelande:</p> { application.message }</div>
      <hr></hr>
      {application.approvedBy ?
      <div>
        <div className='main-title'><p>Automatiskt skapade data</p><hr className="hr-red"></hr></div>
        <div className='list'><p>Ansökan ID:</p> { application.id }</div><hr></hr>
        <div className='list'><p>Utfärdandedatum:</p> { application.issueDate }</div><hr></hr>
        <div className='list'><p>Skapad av:</p> { application.userID }</div><hr></hr>
        <div className='list'><p>Godkänd av:</p> { application.approvedBy }</div><hr></hr>
        <div className='list'><p>godkännandedatum:</p> { application.approveDate}</div><hr></hr>
      </div>
      :''}
    </div>
  )
}

export default ApplicShow