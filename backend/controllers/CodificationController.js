// Fonction pour convertir un nombre décimal en binaire
function decimalToBinary(decimal) {
    return (decimal >>> 0).toString(2);
  }
  
// Fonction pour convertir un nombre binaire en décimal
function binaryToDecimal(binary) {
return parseInt(binary, 2);
}

// Fonction pour convertir un nombre décimal en code de Gray
function decimalToGray(decimal) {
return decimal ^ (decimal >>> 1);
}

// Fonction pour convertir un code de Gray en nombre décimal
function grayToDecimal(gray) {
let mask;
for (mask = gray >>> 1; mask !== 0; mask = mask >>> 1) {
    gray = gray ^ mask;
}
return gray;
}
//cleanedTime 
function cleanedTime(timeString){
    const convertedString = timeString.replace(/:/g, '');;
    return convertedString;
}
// separate date
function separateDate(dateString){
    const dateArray = dateString.split('-');
    const birthYear = parseInt(dateArray[0]);
    const birthMonth = parseInt(dateArray[1]);
    const birthDay = parseInt(dateArray[2]);
    return [birthYear, birthMonth, birthDay];
}
// Fonction pour générer le numéro d'identification codifié
function generateEncodedID(year, Lieu, sexe, hour) {
    // convert date
    const birthYear = separateDate(year).birthYear;
    const birthMonth = separateDate(year).birthMonth;
    const birthDay = separateDate(year).birthDay;
    // convert time
    const hourcoverted = cleanedTime(hour);
    // convert to binary
    const yearBinary = decimalToBinary(birthYear);
    const monthBinary = decimalToBinary(birthMonth);
    const dayBinary = decimalToBinary(birthDay);
    const LieuBinary = decimalToBinary(Lieu);
    const sexeBinary = decimalToBinary(sexe);
    const hourBinary = decimalToBinary(hourcoverted);
    // convert to gray and concatenate
    const encodedID =
        decimalToGray(yearBinary) +
        decimalToGray(monthBinary) +
        decimalToGray(dayBinary) +
        decimalToGray(LieuBinary) +
        decimalToGray(sexeBinary) +
        decimalToGray(hourBinary) +
        Math.floor(Math.random() * 100); // Génération aléatoire des 3 derniers chiffres
    // return result
    if (encodedID > 0) {
        return encodedID;
    } else {
        return encodedID*(-1);
    }
}
// Fonction pour générer le numéro d'identification codifié
function generateEncodedIDAdult(year, Lieu, sexe) {
    // convert date
    const birthYear = separateDate(year).birthYear;
    const birthMonth = separateDate(year).birthMonth;
    const birthDay = separateDate(year).birthDay;
    // convert to binary
    const yearBinary = decimalToBinary(birthYear);
    const monthBinary = decimalToBinary(birthMonth);
    const dayBinary = decimalToBinary(birthDay);
    const LieuBinary = decimalToBinary(Lieu);
    const sexeBinary = decimalToBinary(sexe);
    // convert to gray and concatenate
    const encodedID =
        decimalToGray(yearBinary) +
        decimalToGray(monthBinary) +
        decimalToGray(dayBinary) +
        decimalToGray(LieuBinary) +
        decimalToGray(sexeBinary) +
        Math.floor(Math.random() * 100); // Génération aléatoire des 3 derniers chiffres
    // return result
    return encodedID;
}

module.exports = {
    generateEncodedID,
    generateEncodedIDAdult
}