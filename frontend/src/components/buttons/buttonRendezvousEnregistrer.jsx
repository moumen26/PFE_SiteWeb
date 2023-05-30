export default function RendezvousProfileEnregistrerButton({handlePatient}) {
  return (
    <input type="submit" value="Enregistrer" className='rendezvous-enregistrer-button' onClick={handlePatient}/>
  );
}
