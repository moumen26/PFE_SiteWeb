import React from 'react'

export default function ConculterButton({AddConsultation}) {
  return (
    <input type="submit" value="Conculter" className='conculter-btn' onClick={AddConsultation}/>
  )
}
