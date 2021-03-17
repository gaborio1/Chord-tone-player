// BUILD CHORD TONES

import Chord from "../classes/Chord.js";

import {
    getName,
    getType,
    getAccidental,
    getOptSixth,
    getOptSeventh,
    getOptNinth,
    getOptEleventh,
    getOptThirteenth
} from "./getDropdownValues.js";

// const helpersTest = () => {
//     console.log("hello from helpers.js");
// }

const buildChordTones = () => {
    // MAKE NEW CHORD AND USE ITS METHODS TO RETRIEVE ITS NOTES BASED OFF OF ITS CHORD SCALE
    const chordObj = new Chord(getName(), getAccidental(), getType(), getOptSixth(), getOptSeventh(), getOptNinth(), getOptEleventh(), getOptThirteenth());
    // this.test FROM CONSTRUCTOR
    console.log(chordObj.test());
    console.log(chordObj);

    let chordTones = "";
    const type = getType();
    const sixthValue = getOptSixth();
    const seventhValue = getOptSeventh();
    const ninthValue = getOptNinth();
    const eleventhValue = getOptEleventh();
    const thirteenthValue = getOptThirteenth();

    const root = chordObj.getRoot();
    const flatSecond = chordObj.getFlatSecond();
    const third = chordObj.getThird();
    const fourth = chordObj.getFourth();
    const sharpFourth = chordObj.getSharpFourth();
    const flatFifth = chordObj.getFlatFifth();
    const fifth = chordObj.getFifth();
    const sharpFifth = chordObj.getSharpFifth();
    const sixth = chordObj.getSixth();
    const majorSixth = chordObj.getMajorSixth();
    const seventh = chordObj.getSeventh();
    const minorSeventh = chordObj.getMinorSeventh();
    const ninth = chordObj.getNinth();
    const eleventh = chordObj.getEleventh();
    const sharpEleventh = chordObj.getSharpEleventh();
    const thirteenth = chordObj.getThirteenth();
    // FORCE MAJOR THIRTEENTH IN MINOR CHORDS !!!
    const majorThirteenth = chordObj.forceMajorThirteenth();

    switch (type) {
        case "diminished" :
            // chordTones = `${chordObj.getRoot()} ${chordObj.getThird()} ${chordObj.getFlatFifth()}`;
            chordTones = `${root} ${third} ${flatFifth}`;
            break;
        case "augmented" :
            chordTones = `${root} ${third} ${sharpFifth}`;
            break;
        case "dominant" :
            chordTones = `${root} ${third} ${fifth} ${minorSeventh}`;
            break;
        case "sus2" :
            chordTones = `${root} ${second} ${fifth}`;
            break;
        case "sus4" :
            chordTones = `${root} ${fourth} ${fifth}`;
            break;
        case "phrygian" :
            chordTones = `${root} ${flatSecond} ${fifth}`;
            break;
        case "lydian" :
            chordTones = `${root} ${sharpFourth} ${fifth}`;
            break;
        // DEFAULT IS MAJOR OR MINOR
        default:
            chordTones = `${root} ${third} ${fifth}`;
    }

    // ADD OPTIONAL 6,7,9,11,13 BASED ON type => chordScale
    if (sixthValue === "6") {
        if (type === "minor") {
            // MAKE 6TH MAJOR FOR MINOR CHORDS !!!
            chordTones += " " + majorSixth;
        // SWAP 7 AND 6 IN 7/6:  C E G Bb A ==> C E G A Bb !!! 
        } else if (type === "dominant") {
            chordTones = `${root} ${third} ${fifth} ${sixth} ${minorSeventh}`;
        } else {
            chordTones += " " + sixth;
        }
    }

    if (seventhValue === "7") {
        if (type === "dominant") {
            chordTones = chordTones;
        } else if (type === "diminished") {
            chordTones += " " + majorSixth;
        } else if (type === "augmented") {
            chordTones += " " + minorSeventh;
        } else {
            chordTones += " " + seventh;
        }
    } 

    if (ninthValue === "9") {
        if (type === "dominant") {
            chordTones += " " + ninth;
        } else {
            chordTones += " " + seventh + " " + ninth;
        }
    } else if (ninthValue === "add9") {
        chordTones += " " + ninth;
    }

    // SHARP 11 WITH MAJOR !!!
    if (eleventhValue === "11" && type === "major") {
        chordTones += " " + seventh + " " + ninth + " " + sharpEleventh;
        // NATURAL 11 WITH MINOR !!!
    } else if (eleventhValue === "11" && type === "minor") {
        chordTones += " " + seventh + " " + ninth + " " + eleventh;
    } else if (eleventhValue === "add11" && type === "major") {
        chordTones += " " + sharpEleventh;
    } else if (eleventhValue === "add11" && type === "minor") {
        chordTones += " " + eleventh;
    } else if (eleventhValue === "add11" && type === "sus2") {
        chordTones += " " + eleventh;
    } else if (eleventhValue === "add11" && type === "sus2") {
        chordTones += " " + sharpEleventh;
    } else if (eleventhValue === "11" && type === "dominant") {
        chordTones +=  " " + ninth + " " + eleventh;
    } else if (eleventhValue === "add11" && type === "dominant") {
        chordTones += " " + eleventh;
    } else if (thirteenthValue === "13" && type === "major") {
        chordTones += " " + seventh + " " + ninth + " " + sharpEleventh + " " + thirteenth;
        // MAJOR 13 WITH MINOR !!!
    } else if (thirteenthValue === "13" && type === "minor") {
        chordTones += " " + seventh + " " + ninth + " " + eleventh + " " + majorThirteenth;
    } else if (thirteenthValue === "add13" && type === "major") {
        chordTones += " " +  thirteenth;
    } else if (thirteenthValue === "add13" && type === "minor") {
        chordTones += " " + majorThirteenth;
    } else if (thirteenthValue === "13" && type === "dominant") {
        chordTones +=  " " + ninth + " " + eleventh + " " + thirteenth;
    } else if (thirteenthValue === "add13" && type === "dominant") {
        chordTones += " " + thirteenth;
    }
    return chordTones;

}

export { buildChordTones };