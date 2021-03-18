import buildChordTones from "./buildChordTones.js";
import { getRegister } from "./getDropdownValues.js";
import soundNames from "./soundNames.js";

const helpersTest = () => {
    console.log("hello from helpers.js");
}


let chordNotesArr = [];

// THESE 2 ARE USED IN getChordToneSounds 

const makeChordNotesArr = () => {
    // SPLIT CHORD NOTES INTO ARRAY ["C", "E", "G", "Bb"]
    chordNotesArr = buildChordTones().split(" ");
    // !!! REPLACE ALL SPECIAL CHARS "#" WITH "s" FOR SHARP AS HOWLER WILL NOT LOAD MP3'S WITH SPEC CHARACTER IN FILENAME !!! 
    // ["C#", "E#", "G##"]  =>   ["Cs", "Es", "Gss"]
    for (let i = 0; i < chordNotesArr.length; i++) {
        let sharpRe = /#/gi;
        chordNotesArr[i] = chordNotesArr[i].replace(sharpRe , "s");
    }
    console.log(chordNotesArr);
    return chordNotesArr;
}

// THIS IS WHERE FOR LOOP SHOULD START (DEPENDING ON SELECTED REGISTER) IN getChordToneSounds()
const calcRegisterIdx = () => {
    let registerIdx;
    switch (getRegister()) {
        case "bass" :
            registerIdx = 0
            break;
        case "guitar" :
            registerIdx = 12
            break;
        case "guitarUp" :
            registerIdx = 24
            break;
    }
    return registerIdx;
}

// ASSIGN PATH/NAME/REGISTER/FILE EXTENSION TO EVERY NOTE IN chordNotesArr: [C,E,G] => [sounds/C3.mp3, sounds/E3.mp3, sounds/G3.mp3]
const getChordToneSounds = () => {

    makeChordNotesArr();
    // EMPTY ARRAY FOR SOUNDS WITH PATHS AND EXTENSION
    const soundsArr = [];
     // KEEP TRACK OF ACTUAL MINIMUM INDEX (OUTSIDE OF LOOP!!!), INITIALISE WITH A VALUE OF 0 AND ACCUMULATE IN INNER LOOP
    let minIdx = 0;
    // FIND EACH NOTE OF chordNotesArr [C,E,G] IN soundNames[] 
    chordNotesArr.forEach((chordTone) => {
        for (let i = calcRegisterIdx(); i < soundNames.length; i++) {
            let condA = chordTone.length === 1;
            let condB = soundNames[i].charAt(0) === chordTone;
            let condC = i > minIdx;
            let condD = chordTone.length === 2;
            let condE = soundNames[i].includes(chordTone);
            let condF = soundNames[i].length < 8;
            let condG = chordTone.length === 3;
            let condH = (soundNames[i].indexOf(chordTone) === 0 || soundNames[i].indexOf(chordTone) === 1 || soundNames[i].indexOf(chordTone) === 2);
            // chordTone.length = 1    (  "F" )
            if (condA && condB && condC && condH) {
                soundsArr.push("src/sounds/" + soundNames[i].concat(".mp3"));
                minIdx = i;
                // console.log(chordTone);
                break;
            // chordTone.length = 2    ( F#" )
            } else if (condC && condD && condE && condF & condH) {
                soundsArr.push("src/sounds/" + soundNames[i].concat(".mp3"));
                minIdx = i;
                // console.log(chordTone);
                break;
            // chordTone.length = 3 "   ( F##" )
            } else if (condC && condE && condG) {
                soundsArr.push("src/sounds/" + soundNames[i].concat(".mp3"));
                minIdx = i;
                // console.log(chordTone);
                break;
            }
        }
        return minIdx;
    })
    console.log("soundsArr updated octave: " + soundsArr);
    return soundsArr;

}

export default getChordToneSounds;