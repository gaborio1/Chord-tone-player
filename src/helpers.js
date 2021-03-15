import { getType, getOptNinth, getOptEleventh, getOptThirteenth } from "./script.js";



const helpersTest = () => {
    console.log("hello from helpers.js");
}


const buildBaseTypeSymbol = () => {

    let baseTypeSymbol;
    let type = getType();
    switch (type) {
        case "major" :
            baseTypeSymbol = "";
            break;
        case "minor" :
            baseTypeSymbol = "m";
            break;
        case "dominant" :
            if (getOptNinth() === "9" || getOptNinth() === "add9") {
                baseTypeSymbol = "9";
                break;
            } else if (getOptEleventh() === "11") {
                baseTypeSymbol = "11";
                break;
            } else if (getOptThirteenth() === "13") {
                baseTypeSymbol = "13"
            }
            else {
                baseTypeSymbol = "7";
            }
            break;
        case "augmented" :
            if (getOptSeventh()) {
                baseTypeSymbol = "+7 (7#5)";
                break;
            } else {
                baseTypeSymbol = "+";
            }
            break;
        case "diminished" :
            if (getOptSeventh()) {
                baseTypeSymbol = "07";
                break;
            } else {
                baseTypeSymbol = "0";
            }
            break;
        case "sus2" :
            baseTypeSymbol = "sus2"
            break;
        case "sus4" :
            baseTypeSymbol = "sus4"
            break;
        case "phrygian" :
            baseTypeSymbol = " sus(b)2"
            break;
        case "lydian" :
            baseTypeSymbol = " sus(#)4"
            break;
        default:
            baseTypeSymbol = "invalid type"
        }
    return baseTypeSymbol;

}

export  { helpersTest, buildBaseTypeSymbol };
