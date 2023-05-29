import React from 'react'

export default function VoirButton({VoirPatient}) {
  
  return <input type="submit" value="Voir" className='voir-btn' onClick={VoirPatient}/>
}
