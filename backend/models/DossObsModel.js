const mongoose = require('mongoose');
const validator = require('validator');

const DossierObstetriqueSchema = new mongoose.Schema({
    patientID: {
        type: mongoose.Schema.Types.ObjectId, ref: "patients"
    },
    idNouveauNe: {
        type: mongoose.Schema.Types.ObjectId, ref: "patients",
        required: false,
    },
    AccoucheurID:{
        type: mongoose.Schema.Types.ObjectId, ref: "users"
    },
    Date_daccouchement:{
        type: String,
        required: false,
    },
    Heure_daccouchement:{
        type: String,
        required: false,
    },
    //Nouveau-ne
    Poids: {
        type: String,
        required: false, 
    },
    Aspect: {
        type: String,
        required: false,
    },
    Anomalies: {
        type: String,
        required: false,
    },
    Placenta: {
        type: String,
        required: false,
    },
    Membranes: {
        type: String,
        required: false,
    },
    Cordon: {
        type: String,
        required: false,
    },
    Sexe : {
        type: String,
        required: false,
    },
    Taille: {
        type: String,
        required: false,
    },
    Pc: {
        type: String,
        required: false,
    },
    une_min: {
        type: Boolean,
        required: false,
    },
    cinq_min: {
        type: Boolean,
        required: false,
    },
    Malformation: {
        type: String,
        required: false,
    },
    Remarque : {
        type: String,
        required: false,
    },
    //Maman
    MamanNom: {
        type: String,
        required: false,
    },
    MamanEpouse: {
        type: String,
        required: false,
    },
    MamanDateNaissance: {
        type: String,
        required: false,
    },
    AdresseActuelle: {
        type: String,
        required: false,
    },
    MamanProfession: {
        type: String,
        required: false,
    },
    Salle: {
        type: String,
        required: false,
    },
    NumLit: {
        type: String,
        required: false,
    },
    DateEntrer: {
        type: String,
        required: false,
    },
    DateSortie: {
        type: String,
        required: false,
    },
    MamanAdmise: {
        type: String,
        required: false,
    },
    DiagnosticSortie: {
        type: String,
        required: false,
    },
    ResumerObservation: {
        type: String,
        required: false,
    },
    MotifHospitalisation: {
        type: String,
        required: false,
    },
    DRR: {
        type: String,
        required: false,
    },
    TermeCalc: {
        type: String,
        required: false,
    },
    Menarchie: {
        type: String,
        required: false,
    },
    CarcterCycle: {
        type: String,
        required: false,
    },
    AgeMariage: {
        type: String,
        required: false,
    },
    Contraception: {
        type: String,
        required: false,
    },
    GroupSanguin: {
        type: String,
        required: false,
    },
    FNS: {
        type: String,
        required: false,
    },
    Glycemle: {
        type: String,
        required: false,
    },
    UreeSanguine: {
        type: String,
        required: false,
    },
    Albuminurie: {
        type: String,
        required: false,
    },
    BW: {
        type: String,
        required: false,
    },
    Serodiagnostic: {
        type: String,
        required: false,
    },
    Toxoplasmose: {
        type: String,
        required: false,
    },
    Rubeole: {
        type: String,
        required: false,
    },
    MamanPoids: {
        type: String,
        required: false,
    },
    MamanTaille: {
        type: String,
        required: false,
    },
    MamanPoule: {
        type: String,
        required: false,
    },
    TA: {
        type: String,
        required: false,
    },
    HU: {
        type: String,
        required: false,
    },
    ConstractionUterines: {
        type: String,
        required: false,
    },
    Presentation: {
        type: String,
        required: false,
    },
    BCF: {
        type: String,
        required: false,
    },
    Uterus: {
        type: String,
        required: false,
    },
    Speculum: {
        type: String,
        required: false,
    },
    ToucherVaginal: {
        type: String,
        required: false,
    },
});

const accouchement = mongoose.model('accouchement', DossierObstetriqueSchema);

module.exports = accouchement;