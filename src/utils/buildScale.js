// BUILD DIATONIC SCALE BASED ON LETTER NAME, ACCIDENTAL AND TYPE ( C SHARP MINOR, B FLAT MAJOR ETC... )

import circleOfFifths from "./circleOfFifths.js";

// BUILD NATURAL SCALE STARTING WITH TONIC 
const getNaturalScale = (letterName) => {
    const tonic = letterName;
    // GET TONIC IDX
    const tonicIdx = circleOfFifths["degrees"].indexOf(tonic);
    // GET 2 SUBSCALES 
    const subScale1 = circleOfFifths["degrees"].slice(tonicIdx);
    const subScale2 = circleOfFifths["degrees"].slice(0, tonicIdx);
    // MERGE SUBSCALES
    const naturalScale = subScale1.concat(subScale2);
    return naturalScale;
}

// MAKE NATURAL SCALE DIATONIC BY ADDING APPROPRIATE NUMBER/TYPE OF ACCIDENTALS FOR getDiatonicScale()
const addSharpsToNaturalScale = (naturalScale,accidentals,diatonicScale) => {
    for (const el of naturalScale) {
        if (accidentals.indexOf(el) > -1) {
            diatonicScale.push(el.concat("#"));
        } else diatonicScale.push(el);
        // hideInvalidKeyMessage();
    }
}

const addFlatsToNaturalScale = (naturalScale,accidentals,diatonicScale) => {
    for (const el of naturalScale) {
        if (accidentals.indexOf(el) > -1) {
            diatonicScale.push(el.concat("b"));
        } else {
            diatonicScale.push(el);
            // hideInvalidKeyMessage();
        }
    }
}

// BUILD DIATONIC SCALE (MAJOR OR MINOR)
const getDiatonicScale = (name, accidental, type) => {  
    let naturalScale = getNaturalScale(name);
    // GET FIRST NOTE OF SCALE
    let firstDegree = naturalScale[0];
    // CONCAT OPTIONAL ACCIDENTAL SO FULL NAME CAN BE USED IN SEARCH
    firstDegree += accidental;
    // EMPTY ARRAY FOR RESULT
    let diatonicScale = [];
    // MAJOR FLAT, MAJOR SHARP, MINOR FLAT OR MINOR SHARP
    let foundKeyCenters = [];
    // SUB-ARRAY OR ENTIRE ARRAY OF sharps OR flats
    let accidentalNotes = [];
    // POSITION AT WHICH FIRST DEGREE IS FOUND. THIS DETERMINES NUMBER OF ACCIDENTALS
    let idx;

    // BASED ON type, FIND THAT NOTE IN EITHER majorSharpKeys OR majorFlatKeys
    // IF MAJOR
    if (type === "major" || 
        type === "augmented" || 
        type === "dominant" || 
        type === "sus2" || 
        type === "sus4" || 
        type === "phrygian" || 
        type === "lydian") {
       
        // IF MAJOR SHARP
        if (circleOfFifths["majorSharpKeys"].indexOf(firstDegree) > -1) {
            // ASSIGN APPROPRIATE ARRAY TO VARIABLE
            foundKeyCenters = [...circleOfFifths["majorSharpKeys"]];
            // GET INDEX OF TONIC (LETTER NAME OF SCALE) FROM KEY SIGNATURES
            idx = foundKeyCenters.indexOf(firstDegree) + 1;
            // GET FIRST n NOTES THAT NEED ACCIDENTALS (FROM sharps)
            accidentalNotes = [...circleOfFifths["sharps"].slice(0, idx)];
            // ITERATE OVER scale AND IF ELEMENT IS CONTAINED IN accidentalNotes, ADD "#" TO IT
            addSharpsToNaturalScale(naturalScale, accidentalNotes, diatonicScale);
        //  IF MAJOR FLAT
        } else if (circleOfFifths["majorFlatKeys"].indexOf(firstDegree) > -1) {
            foundKeyCenters = [...circleOfFifths["majorFlatKeys"]];
            idx = foundKeyCenters.indexOf(firstDegree) + 1;
            accidentalNotes = [...circleOfFifths["flats"].slice(0, idx)];
            // ITERATE OVER scale AND IF ELEMENT IS CONTAINED IN accidentalNotes, ADD "b" TO IT
            addFlatsToNaturalScale(naturalScale, accidentalNotes, diatonicScale);
        // IF C NATURAL MAJOR OR AUGMENTED
        } else if (name === "c" && accidental === "" && 
                (type === "major" || 
                type === "augmented" || 
                type === "dominant" || 
                type === "sus2" || 
                type === "sus4" || 
                type === "phrygian" || 
                type === "lydian")) {
            diatonicScale = naturalScale.slice();
            // hideInvalidKeyMessage();
        } 
        // HANDLE THEORETICAL KEY SIGNATURES 
        else {
            // showInvalidKeyMessage();
        }

    // IF MINOR
    } else if (type === "minor" || type === "diminished") {

        //  IF MINOR SHARP
        if (circleOfFifths["minorSharpKeys"].indexOf(firstDegree) > -1) {
            foundKeyCenters = [...circleOfFifths["minorSharpKeys"]];
             idx = foundKeyCenters.indexOf(firstDegree) + 1;
             accidentalNotes = [...circleOfFifths["sharps"].slice(0, idx)];
            addSharpsToNaturalScale(naturalScale, accidentalNotes, diatonicScale);
        // IF MINOR FLAT
        } else if (circleOfFifths["minorFlatKeys"].indexOf(firstDegree) > -1) {
            foundKeyCenters = [...circleOfFifths["minorFlatKeys"]];        
            idx = foundKeyCenters.indexOf(firstDegree) + 1;
            accidentalNotes = [...circleOfFifths["flats"].slice(0, idx)];
            addFlatsToNaturalScale(naturalScale, accidentalNotes, diatonicScale);
        // IF A NATURAL MINOR
        } else if (name === "a" && accidental === "" && (type === "minor" || type === "diminished")) {
            diatonicScale = naturalScale.slice();
            // hideInvalidKeyMessage();
        } else {
            // showInvalidKeyMessage();
        }
    } 
    // UPPERCASE NOTE LETTER NAMES BUT NOT THE ACCIDENTAL
    const result = diatonicScale.map(note => note.charAt(0).toUpperCase() + note.slice(1));
    return result;

}

export default getDiatonicScale;