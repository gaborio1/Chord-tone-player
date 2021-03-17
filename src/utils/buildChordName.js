import { getName, getType, getAccidental, getOptSixth, getOptSeventh, getOptNinth, getOptEleventh, getOptThirteenth } from "../script.js";

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

// OPTIONALLY ADD EXTENSIONS TO BASE SYMBOL ( C => Cadd9 ) FOR displayFullChordName()
let fullSymbol;

const addExtensionToBaseChordSymbol = () => {

    const type = getType();
    const sixthValue = getOptSixth();
    const seventhValue = getOptSeventh();
    const ninthValue = getOptNinth();
    const eleventhValue = getOptEleventh();
    const thirteenthValue = getOptThirteenth();

    fullSymbol = buildBaseTypeSymbol();

    // ADD OPTIONAL 6,7,9,11,13 TO SYMBOL
    if (sixthValue && !seventhValue) {
        if (type === "major") {
            fullSymbol += "6";
        } else if (type === "minor") {
            fullSymbol += "6";
        } else if (type === "dominant") {
            fullSymbol += "/6";
        }
    }

    if (seventhValue && !sixthValue) {
        if (type === "major") {
            fullSymbol += "M7";
        } else if (type === "minor") {
            fullSymbol += "7";
        } else {
            console.log("another type you have to fix");
        }
    }

    // 6/7
    if (sixthValue && seventhValue) {
        if (type === "minor") {
            fullSymbol += "7/6";
        } else if (type === "major") {
            fullSymbol += "M7/6"
        } else {
            console.log("another type you have to fix")
        }
    }

    if (ninthValue === "9") {
        if (type === "major") {
            if (sixthValue) {
                fullSymbol = "M9/6"
            } else {
                fullSymbol = "M9";
            }
        } else if (type === "minor") {
            if (sixthValue) {
                fullSymbol = "m9/6"
            } else {
                fullSymbol += "9";
            }
            
        } else if (type === "dominant") {
            fullSymbol += "";
        } else {
            console.log("another type you have to fix");
        }
    } 
    
    else if (ninthValue === "add9") {
        if (type === "dominant") {
            if (sixthValue) {
                console.log("dom9 = dom add9 !!!");
            } else {
                fullSymbol = "9";
            }
        } else {
            fullSymbol += " add9";
        }
    }

    if (eleventhValue === "11") {
        if (type === "major") {
            fullSymbol += "M11";
        } else if (type === "minor") {
            fullSymbol += "11";
        } else if (type === "dominant") {
            fullSymbol += "";
        } else {
            console.log("another type you have to fix");
        }

    } else if (eleventhValue === "add11") {
        if (type === "dominant") {
            fullSymbol = "11";
        } else {
            fullSymbol += " add11";
        }
    }

    if (thirteenthValue === "13") {
        if (type === "major") {
            fullSymbol += "M13";
        } else if (type === "minor") {
            fullSymbol += "13";
        } else if (type === "dominant") {
            fullSymbol += "";
        } else {
            console.log("another type you have to fix");
        }

    } else if (thirteenthValue === "add13") {
        if (type === "dominant") {
            fullSymbol = "13";
        } else {
            fullSymbol += " add13";
        }
    }
    return fullSymbol;

}// CAPITALISE LETTER NAME, ADD ACCIDENTAL AND TYPE SYMBOL ( c => C + # + m9 ==> Cm9 ) FOR DISPLAYFULLCHORDNAME()
const buildFullChordName = () => {
    fullSymbol = addExtensionToBaseChordSymbol();
    let fullChordName;
    fullChordName = `${getName().toUpperCase()}${getAccidental()}${fullSymbol}`;
    return fullChordName;
}

export  { helpersTest, buildBaseTypeSymbol, addExtensionToBaseChordSymbol, buildFullChordName };
