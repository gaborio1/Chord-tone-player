import {
    accidentalEnable,
    typeEnable,
    hideNameInstruction,
    showAccidentalInstruction,
    accidentalOptions,
    hideAccidentalInstruction,
    showTypeInstruction,
    enableExtensionOptions,
    hideTypeInstruction,
    showExtensionInstruction,
    enableShowChordButton,
    addListenerShowChordButton,
    showChordTonesButton
} from "../script.js";

// GET OPTIONS FROM DROPDOWN

const getName = () => {
    const nameSelect = document.getElementById("name");
    let chordName = nameSelect.options[nameSelect.selectedIndex].value;
    return chordName;
}

const getType = () => {
    const typeSelect = document.getElementById("type");
    let chordType = typeSelect.options[typeSelect.selectedIndex].value;
    return chordType;
}

const getAccidental = () => {
    const accidentalSelect = document.getElementById("accidental");
    let chordAccidental = accidentalSelect.options[accidentalSelect.selectedIndex].value;
    return chordAccidental;
}

const getOptSixth = () => {
    const sixthSelect = document.getElementById("sixth");
    let chordSixth = sixthSelect.options[sixthSelect.selectedIndex].value;
    return chordSixth;
}

const getOptSeventh = () => {
    const seventhSelect = document.getElementById("seventh");
    let chordSeventh = seventhSelect.options[seventhSelect.selectedIndex].value;
    return chordSeventh;
}

const getOptNinth = () => {
    const ninthSelect = document.getElementById("ninth");
    let chordNinth = ninthSelect.options[ninthSelect.selectedIndex].value;
    return chordNinth;
}

const getOptEleventh = () => {
    const eleventhSelect = document.getElementById("eleventh");
    let chordEleventh = eleventhSelect.options[eleventhSelect.selectedIndex].value;
    return chordEleventh;
}

const getOptThirteenth = () => {
    const thirteenthSelect = document.getElementById("thirteenth");
    let chordThirteenth = thirteenthSelect.options[thirteenthSelect.selectedIndex].value;
    return chordThirteenth;
}

const getRegister = () => {
    const registerSelect = document.getElementById("register");
    let register = registerSelect.options[registerSelect.selectedIndex].value;
    return register;
}


// WHEN PAGE LOADS, ONLY NAME SELECTION IS ENABLED. ENABLE DROPDOWNS IN SEQUENCE: ONCE ONE IS SELECTED, ENABLE NEXT THEN ATER TYPE IS SELECTED, ENABLE EXTENSIONS 6, 7, 9, 11, 13

// EVENT LISTENERS ON NAME/ACCIDENTAL/TYPE DROPDOWN OPTIONS:

// INITIALISE VARS TO TRACK WHAT'S SELECTED AS NAME AND ACCIDENTAL
let nameChangeVal;
let accidentalChangeVal;
// BOOLEANS
let isNameSelected = false;
let isImpossibleKey = false;

// GET SELECTED NAME, ENABLE ACCIDENTAL OPTIONS, SHOW INSTR ONCE NAME IS SELECTED
const getNameChange = () => {
    const nameDropdown = document.getElementById("name");
    nameDropdown.addEventListener('change', function () {
        nameChangeVal = this.value;
        if (!isNameSelected) {
            isNameSelected = true;
            accidentalEnable();
            hideNameInstruction();
            showAccidentalInstruction();
        } else if (isNameSelected && !accidentalInstruction.classList.contains("hidden")) {
            showAccidentalInstruction();
        } else {
            hideAccidentalInstruction();
        }
        //   WHAT IS FALSE ???
    }, false);
    return nameChangeVal;
}
getNameChange();

// GET SELECTED ACCIDENTAL, ENABLE TYPE OPTIONS, SHOW INSTR ONCE ACCIDENTAL IS SELECTED
const accidentalInstruction = document.getElementById("accidental-instruction");

const getAccidentalChange = () => {
    const accidentalDropdown = document.getElementById("accidental");
    accidentalDropdown.addEventListener('change', function () {

        accidentalChangeVal = this.value;
        isImpossibleKey = ((getNameChange() === "b" && accidentalChangeVal === "#") ||
            (getNameChange() === "e" && accidentalChangeVal === "#") ||
            (getNameChange() === "f" && accidentalChangeVal === "b"));
        // console.log(isImpossibleKey);
        typeEnable();
        if (!accidentalInstruction.classList.contains("hidden") && accidentalOptions.selectedIndex > 0) {
            hideAccidentalInstruction();
        }
        hideAccidentalInstruction();
        // showTypeInstruction();
        if (isImpossibleKey) {
            showAccidentalInstruction();
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            hideTypeInstruction();
        }
        showTypeInstruction();
    }, false);
    return accidentalChangeVal;
}
getAccidentalChange();

// GET SELECTED TYPE, ENABLE EXTENSIONS 6, 7, 9, 11, 13 , SHOW INSTR
let typeChangeVal = "";
const getTypeChange = () => {
    const typeDropdown = document.getElementById("type");
    typeDropdown.addEventListener('change', function () {
        typeChangeVal = this.value;
        enableExtensionOptions(typeChangeVal);
        hideTypeInstruction();
        showExtensionInstruction();
        enableShowChordButton();
        // ENABLE SHOW CHORD BUTTON 
        showChordTonesButton.classList.add("animated-btn");
        addListenerShowChordButton()
    }, false);
    return typeChangeVal;
}
getTypeChange();

export {
    getName,
    getType,
    getAccidental,
    getOptSixth,
    getOptSeventh,
    getOptNinth,
    getOptEleventh,
    getOptThirteenth,
    getRegister,
    getNameChange,
    getAccidentalChange,
    getTypeChange
};