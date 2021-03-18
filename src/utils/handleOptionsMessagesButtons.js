import {
    // accidentalOptions,
    // naturalOpt,
    // sharpOpt,
    // flatOpt,
    // typeOptions,
    // majorOpt,
    // minorOpt,
    // dominantOpt,
    // augmentedOpt,
    // diminishedOpt,
    // susTwoOpt,
    // susFourOpt,
    // phrygianOpt,
    // lydianOpt,
    nameInstruction,
    accidentalInstruction,
    typeInstruction,
    extensionInstruction,
    // sixthOptions,
    // seventhOptions,
    // ninthOptions,
    // eleventhOptions,
    // thirteenthOptions
} from "../script.js";

import { getNameChange, getAccidentalChange } from "./getDropdownValues.js"

// GRAB ALL DROPDOWNS AND THEIR OPTIONS

// CURRENTLY NOT IN USE:
// const nameOptions = document.getElementById("name");
// const cOpt = nameOptions.options[1]; 
// const dOpt = nameOptions.options[2]; 
// const eOpt = nameOptions.options[3]; 
// const fOpt = nameOptions.options[4]; 
// const gOpt = nameOptions.options[5]; 
// const aOpt = nameOptions.options[6]; 
// const bOpt = nameOptions.options[7]; 

const accidentalOptions = document.getElementById("accidental");
const naturalOpt = accidentalOptions.options[1];
const sharpOpt = accidentalOptions.options[2];
const flatOpt = accidentalOptions.options[3];

const typeOptions = document.getElementById("type");
const majorOpt = typeOptions.options[1];
const minorOpt = typeOptions.options[2];
const dominantOpt = typeOptions.options[3];
const augmentedOpt = typeOptions.options[4];
const diminishedOpt = typeOptions.options[5];
const susTwoOpt = typeOptions.options[6];
const susFourOpt = typeOptions.options[7];
const phrygianOpt = typeOptions.options[8];
const lydianOpt = typeOptions.options[9];

const sixthOptions = document.getElementById("sixth");
const sixthOpt = sixthOptions[1];

const seventhOptions = document.getElementById("seventh");
const seventhOpt = seventhOptions.options[1];

const ninthOptions = document.getElementById("ninth");
const ninthOpt = ninthOptions.options[1];
const addNinthOpt = ninthOptions.options[2];

const eleventhOptions = document.getElementById("eleventh");
const eleventhOpt = eleventhOptions.options[1];
const addEleventhOpt = eleventhOptions.options[2];

const thirteenthOptions = document.getElementById("thirteenth");
const thirteenthOpt = thirteenthOptions.options[1];
const addThirteenthOpt = thirteenthOptions.options[2];

const registerOptions = document.getElementById("register");
// guitarOpt IS NOT DISABLED BY DEFAULT
const guitarOpt = registerOptions.options[0];
const bassOpt = registerOptions.options[1];
const guitarUpOpt = registerOptions.options[2];



const accidentalDisable = () => {
    accidentalOptions.options[0].disabled = true;
    naturalOpt.disabled = true;
    sharpOpt.disabled = true;
    flatOpt.disabled = true;
}

// ONLY ENABLE POSSIBLE ACCIDENTALS
const accidentalEnable = () => {
    switch (getNameChange()) {
        case "c" :
        case "d" :
        case "g" :
        case "a" :    
            naturalOpt.disabled = false;
            sharpOpt.disabled = false;
            flatOpt.disabled = false;
            break;
        case "e" :
        case "b" :    
            naturalOpt.disabled = false;
            // sharpOpt.disabled = false;
            flatOpt.disabled = false;
            break;
        case "f" :
            naturalOpt.disabled = false;
            sharpOpt.disabled = false;
            // flatOpt.disabled = false;
            break;
    }
}

const typeDisable = () => {
    typeOptions.options[0].disabled = true;
    majorOpt.disabled = true;
    minorOpt.disabled = true;
    dominantOpt.disabled = true;
    augmentedOpt.disabled = true;
    diminishedOpt.disabled = true;
    susTwoOpt.disabled = true;
    susFourOpt.disabled = true;
    phrygianOpt.disabled = true;
    lydianOpt.disabled = true;
}
// FUMCTIONS FOR typeEnable()

// NO KEY IN B#
const disableBSharpTypes = () => {
    showInvalidKeyMessage();
}


// NO MINOR IN Db
const enableDFlatTypes = () => {
    majorOpt.disabled = false;
    dominantOpt.disabled = false;
    augmentedOpt.disabled = false;
    // diminishedOpt.disabled = false;
    susTwoOpt.disabled = false;
    susFourOpt.disabled = false;
    phrygianOpt.disabled = false;
    lydianOpt.disabled = false;
}

// NO MAJOR IN D#
const enableDSharpTypes = () => {
    minorOpt.disabled = false;
    // augmentedOpt.disabled = false;
    diminishedOpt.disabled = false;
    susTwoOpt.disabled = false;
    susFourOpt.disabled = false;
    phrygianOpt.disabled = false;
    lydianOpt.disabled = false;
}

// NO KEY IN E#
const disableESharpTypes = () => {
    showInvalidKeyMessage();
}

// NO KEY IN Fb
const disableFFlatTypes = () => {
    showInvalidKeyMessage();
}

// NO MINOR IN Gb
const enableGFlatTypes = () => {
    majorOpt.disabled = false;
    dominantOpt.disabled = false;
    augmentedOpt.disabled = false;
    // diminishedOpt.disabled = false;
    susTwoOpt.disabled = false;
    susFourOpt.disabled = false;
    phrygianOpt.disabled = false;
    lydianOpt.disabled = false;
}

// NO MAJOR IN G#
const enableGSharpTypes = () => {
    minorOpt.disabled = false;
    // augmentedOpt.disabled = false;
    diminishedOpt.disabled = false;
    susTwoOpt.disabled = false;
    susFourOpt.disabled = false;
    phrygianOpt.disabled = false;
    lydianOpt.disabled = false;
}

// NO MAJOR IN A#
const enableASharpTypes = () => {
    minorOpt.disabled = false;
    // augmentedOpt.disabled = false;
    diminishedOpt.disabled = false;
    susTwoOpt.disabled = false;
    susFourOpt.disabled = false;
    phrygianOpt.disabled = false;
    lydianOpt.disabled = false;    
}

// NO MINOR IN Cb
const enableCFlatTypes = () => {
    majorOpt.disabled = false;
    dominantOpt.disabled = false;
    augmentedOpt.disabled = false;
    // diminishedOpt.disabled = false;
    susTwoOpt.disabled = false;
    susFourOpt.disabled = false;
    phrygianOpt.disabled = false;
    lydianOpt.disabled = false;   
}

// BOTH MAJOR AND MINOR (FOR EXAMPLE F#, D ETC...)
const enableAllTypes = () => {
    // typeOptions.options[0].disabled = false;
    majorOpt.disabled = false;
    minorOpt.disabled = false;
    dominantOpt.disabled = false;
    augmentedOpt.disabled = false;
    diminishedOpt.disabled = false;
    susTwoOpt.disabled = false;
    susFourOpt.disabled = false;
    phrygianOpt.disabled = false;
    lydianOpt.disabled = false;
}

// ONLY ENABLE CHORD TYPES FOR VALID KEY SIGNATURES !!!
// THIS DOES NOT HANDLE INSTRUCTIONS, ONLY THE TYPE SELECTION !!!
const typeEnable = () => {
    if (getNameChange()=== "b" && getAccidentalChange() === "#") {
        disableBSharpTypes();
    }
     else if (getNameChange()=== "d" && getAccidentalChange() === "b") {
        enableDFlatTypes();
    }
     else if (getNameChange()=== "d" && getAccidentalChange() === "#") {
        enableDSharpTypes()
    }
     else if (getNameChange()=== "e" && getAccidentalChange() === "#") {
        disableESharpTypes();
    }
     else if (getNameChange()=== "f" && getAccidentalChange() === "b") {
        disableFFlatTypes();
    }
     else if (getNameChange()=== "g" && getAccidentalChange() === "b") {
        enableGFlatTypes();
    }
     else if (getNameChange()=== "g" && getAccidentalChange() === "#") {
        enableGSharpTypes();
    }
     else if (getNameChange()=== "a" && getAccidentalChange() === "#") {
        enableASharpTypes();
    } 
    else if (getNameChange()=== "c" && getAccidentalChange() === "b") {
        enableCFlatTypes();
    // ENABLE ALL TYPES
    }
     else {
        enableAllTypes();
    }
}

const showInvalidKeyMessage = () => {
    invalidKeyMessage.classList.remove("hidden");
}

const hideInvalidKeyMessage = () => {
    invalidKeyMessage.classList.add("hidden");
}

const showNameInstruction = () => {
    nameInstruction.classList.remove("hidden");
}

const hideNameInstruction = () => {
    nameInstruction.classList.add("hidden");
}

const showAccidentalInstruction = () => {
    accidentalInstruction.classList.remove("hidden");
}

const hideAccidentalInstruction = () => {
    accidentalInstruction.classList.add("hidden");
}

const showTypeInstruction = () => {
    typeInstruction.classList.remove("hidden");
}

const hideTypeInstruction = () => {
    typeInstruction.classList.add("hidden");
}

const showExtensionInstruction = () => {
    extensionInstruction.classList.remove("hidden");
}

const hideExtensionInstruction = () => {
    extensionInstruction.classList.add("hidden");
}








const sixthDisable = () => {
    sixthOptions.options[0].disabled = true;
    sixthOpt.disabled = true;
}

const sixthEnable = () => {
    sixthOptions.options[0].disabled = false;
    sixthOpt.disabled = false;
}
const seventhDisable = () => {
    seventhOptions.options[0].disabled = true;
    seventhOpt.disabled = true;
}

const seventhEnable = () => {
    seventhOptions.options[0].disabled = false;
    seventhOpt.disabled =false;
}

const ninthDisable = () => {
    ninthOptions.options[0].disabled = true;
    ninthOpt.disabled = true;
    addNinthOpt.disabled = true;
}

const ninthEnable = (typeChangeVal) => {
    switch (typeChangeVal) {
        case "major" :
        case "minor" :
        case "augmented" :
        case "diminished" :
        case "sus4" :
        case "phrygian" :
        case "lydian" :
            ninthOptions.options[0].disabled = false;
            ninthOpt.disabled = false;
            addNinthOpt.disabled = false;
            break;
        case "dominant" :
            ninthOptions.options[0].disabled = false;
            ninthOpt.disabled = false;
            break;
        // sus2
        default:
            console.log("FROM typeChangeVal: sus2");
    }
}

const eleventhDisable = () => {
    eleventhOptions.options[0].disabled = true;
    eleventhOpt.disabled = true;
    addEleventhOpt.disabled = true;
}

const eleventhEnable = (typeChangeVal) => {
    switch (typeChangeVal) {
        case "major" :
        case "minor" :
        case "dominant" :
        case "augmented" :
        case "diminished" :
        case "phrygian" :
            eleventhOptions.options[0].disabled = false;
            eleventhOpt.disabled = false;
            addEleventhOpt.disabled = false;
            break;
        case "sus2" :
            eleventhOptions.options[0].disabled = false;
            addEleventhOpt.disabled = false;
            break;
        // sus4, lydian
        default:
            console.log("FROM typeChangeVal: sus4 / lydian");
    }
}

const thirteenthDisable = () => {
    thirteenthOptions.options[0].disabled = true;
    thirteenthOpt.disabled = true;
    addThirteenthOpt.disabled = true;
}

const thirteenthEnable = (str) => {
    const typeChangeVal = str;
    switch (typeChangeVal) {
        case "major" :
        case "minor" :
        case "dominant" :
        case "augmented" :
        case "diminished" :
        case "phrygian" :
            thirteenthOptions.options[0].disabled = false;
            thirteenthOpt.disabled = false;
            addThirteenthOpt.disabled = false;
            break;
        case "sus2" :
        case "sus4" :
        case "lydian" :
            thirteenthOptions.options[0].disabled = false;
            addThirteenthOpt.disabled = false;
            break;
    }
}




export {
    accidentalDisable,
    accidentalEnable,
    typeDisable,
    disableBSharpTypes,
    enableDFlatTypes,
    enableDSharpTypes,
    disableESharpTypes,
    disableFFlatTypes,
    enableGFlatTypes,
    enableGSharpTypes,
    enableASharpTypes,
    enableCFlatTypes,
    enableAllTypes,
    typeEnable,
    showInvalidKeyMessage,
    hideInvalidKeyMessage,
    showNameInstruction,
    hideNameInstruction,
    showAccidentalInstruction,
    hideAccidentalInstruction,
    showTypeInstruction,
    hideTypeInstruction,
    showExtensionInstruction,
    hideExtensionInstruction,
    sixthDisable,
    sixthEnable,
    seventhDisable,
    seventhEnable,
    ninthDisable,
    ninthEnable,
    eleventhDisable,
    eleventhEnable,
    thirteenthDisable,
    thirteenthEnable
};