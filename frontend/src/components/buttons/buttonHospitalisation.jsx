import React from 'react'

export default function HospitalisationButton({Hospitalisation}) {
  
  return <input type="submit" value="Hospitaliser" className='conculter-btn' onClick={Hospitalisation}/>
}
