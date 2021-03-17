// import Chord from "./classes/Chord.js";

import { 
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
} from "./utils/getDropdownValues.js";

import  { 
    // helpersTest,
    buildBaseTypeSymbol,
    addExtensionToBaseChordSymbol,
    buildFullChordName 
} from "./utils/buildChordName.js";

import  { 
    // helpersTest,
    buildChordTones
} from "./utils/buildChordTones.js";

import circleOfFifths from "./utils/circleOfFifths.js";
import soundNames from "./utils/soundNames.js";
// import buildBaseTypeSymbol from "./helpers.js";

// ********** GET OPTIONS FROM DROPDOWN: getDropdownValues.js - getName(), getType(), etc... **********

// SEQUENCE OF BUILDING AND DISPLAYING FULL CHORD NAME:
// buildBaseTypeSymbol() => addExtensionToBaseChordSymbol() => buildFullChordName() => displayFullChordName()

// ********** BUILS BASE CHORD SYBOL: FOR displayFullChordName(): builChordName.js - buildBaseTypeSymbol() ***********
// ********** OPTIONALLY ADD EXTENSIONS TO BASE SYMBOL ( C => Cadd9 ) FOR displayFullChordName(): builChordName.js - addExtensionToBaseChordSymbol ***********
// ********** CAPITALISE LETTER NAME, ADD ACCIDENTAL AND TYPE SYMBOL ( c => C + # + m9 ==> Cm9 ) FOR DISPLAYFULLCHORDNAME(): builChordName.js - buildFullChordName ***********


// ********** DISPLAY CHORD  NAME BUILT IN builChordName.js **********
const displayFullChordName = () => {
    const fullChordNameSpan = document.getElementById("full-chord-name");
    fullChordNameSpan.innerText = buildFullChordName();
}

// ********** BUILD CHORD TONES: buildChordName.js **********

// ********** DISPLAY CHORD TONES BUILT IN buildChordName.js **********
const displayChordTones = () => {
    let chordTones;
    const chordTonesSpan = document.getElementById("chord-tones");
    chordTones = buildChordTones();
    chordTonesSpan.innerText = buildChordTones();
}

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

 // INVALID CHORD MESSAGE WITH HIDDEN CLASS
 const invalidKeyMessage = document.getElementById("invalid-key-message");

// MAKE NATURAL SCALE DIATONIC BY ADDING APPROPRIATE NUMBER/TYPE OF ACCIDENTALS FOR getDiatonicScale()
const addSharpsToNaturalScale = (naturalScale,accidentals,diatonicScale) => {
    for (const el of naturalScale) {
        if (accidentals.indexOf(el) > -1) {
            diatonicScale.push(el.concat("#"));
        } else diatonicScale.push(el);
        hideInvalidKeyMessage();
    }
}

const addFlatsToNaturalScale = (naturalScale,accidentals,diatonicScale) => {
    for (const el of naturalScale) {
        if (accidentals.indexOf(el) > -1) {
            diatonicScale.push(el.concat("b"));
        } else {
            diatonicScale.push(el);
            hideInvalidKeyMessage();
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
            hideInvalidKeyMessage();
        } 
        // HANDLE THEORETICAL KEY SIGNATURES 
        else {
            showInvalidKeyMessage();
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
            hideInvalidKeyMessage();
        } else {
            showInvalidKeyMessage();
        }
    } 
    // UPPERCASE NOTE LETTER NAMES BUT NOT THE ACCIDENTAL
    const result = diatonicScale.map(note => note.charAt(0).toUpperCase() + note.slice(1));

    return result;
}

// GET AND DISPLAY DIATONIC SCALE 
const displayChordScale = () => {
    const chordScaleSpan = document.getElementById("chord-scale");
    const scale = getDiatonicScale(getName(), getAccidental(), getType());
    console.log(scale.join(" "));
    const scaleArr = scale.join(" ");
    console.log(scaleArr);
    chordScaleSpan.innerText = scale.join("  ");
}

// WON'T WORK WITH let !!!
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

// PLAY CHORD NOTES TOGETHER ( PLAY CHORD BUTTON )
const playChord = (arr) => {
    // const soundFiles = getChordToneSounds();
    const soundFiles = arr;
    console.log("soundFiles: " + soundFiles);
    setTimeout(() => {
        for (const soundFile of soundFiles) {
            const sound = new Howl({
                src: [soundFile],
                volume: 0.4
            });
            sound.play();
        }
    }, 500)
}

// PLAY CHORD NOTES IN SEQUENCE ( ARPEGGIO BUTTON ) WITH AN INITIAL DELAY OF 500 INCREMENTED BY 200 FOR EACH CHORDTONE
const arpeggiateChord = (arr) => {
    const soundFiles = arr;
    let delay = 500;
    for (let i = 0; i < soundFiles.length; i++) {
        setTimeout(() => {
            const sound = new Howl({
                src: [soundFiles[i]],
                volume: 0.3
            });
            sound.play();
        }, delay)
        delay+=200;
    }
}

// CREATE A RESPONSIVE DIV FOR EACH CHORD DEGREE ( NOTES BUTTON )
const makeSoundDivs = () => {

    const soundFiles = getChordToneSounds();
    // NEED ACTUAL NOTE NAMES WITHOUT PATH AND EXTENSION
    const chordTones = buildChordTones().split(" ");
    const audioContainer = document.getElementById("audio-container");
    // REMOVE EXISTING DIVS IF ANY TO CLEAR CONTENT IN AUDIOCONTAINER
    while (audioContainer.firstChild) {
        audioContainer.removeChild(audioContainer.firstChild);
    }
    soundFiles.forEach((soundFile, i) => {
        soundFiles[i] = new Howl({
            src: [soundFile],
            volume: 0.6
        })
        let elem = document.createElement("div");
        // ??? THIS IS NOT WORKING !!!
        // elem.class = "btn";
        // INSTEAD:
        elem.classList.add("sound-div");
        elem.id = `sound-div${i}`;
        elem.addEventListener('mouseover', () => soundFiles[i].play());
        // elem.innerText = `Deg.${i + 1}: ${chordTones[i]}`    
        elem.innerText = chordTones[i];    
        audioContainer.appendChild(elem);
        // document.body.append(elem);
    })

}

// REFRESH PAGE FOR NEW CHORD ( NEW CHORD BUTTON )
const refreshPage = () => {
    location.reload();
    // THIS ALSO WORKS
    // location.reload(true);
}
const toggleBackgroundColour = () => {
    const main = document.querySelector(".main");
    main.classList.toggle("grey-background");
} 

const toggleButtonStyle = () => {
    newChordButton.classList.toggle("grey-theme-btn");
    playButton.classList.toggle("grey-theme-btn");
    arpeggiateButton.classList.toggle("grey-theme-btn");
    playIndividualButton.classList.toggle("grey-theme-btn");
    colourThemeButton.classList.toggle("grey-theme-btn");
    showChordTonesButton.classList.toggle("grey-theme-btn");
}
// EVENT HANDLERS ON BUTTONS
const handleShowChordTones = () => {
    displayFullChordName();
    displayChordTones();
    displayChordScale();
    enableRegister();
    enableAllSoundAndNewButtons();
    hideExtensionInstruction();
    // ENABLE OTHER FOUR BUTTONS
    addListenerPlayButton();
    addListenerArpeggiateButton();
    addListenerPlayIndividualButton();
    addListenerNewChordButton();
    // addListenerColourButton();
}

const handlePlayChord = () => {
    playChord(getChordToneSounds());
}

const handleArpeggiate = () => {
    arpeggiateChord(getChordToneSounds());
}

const handlePlayIndividual = () => {
    makeSoundDivs();
}

const handleNewChord = () => {
    refreshPage();
}

const handleColourTheme = () => {
    toggleBackgroundColour();

    toggleButtonStyle();

}

// EVENT LISTENERS ON BUTTONS
const showChordTonesButton = document.getElementById("chord-tones-btn");
const playButton = document.getElementById("play-chord-btn");
const arpeggiateButton = document.getElementById("arpeggiate-chord-btn");
const playIndividualButton = document.getElementById("play-individual-btn");
const newChordButton = document.getElementById("new-chord-btn");
const colourThemeButton = document.getElementById("colour-theme-btn");

// WHEN CHORD TYPE SELECTION IS MADE ( IN getTypeChange() )
const addListenerShowChordButton = () => {
    showChordTonesButton.addEventListener("click", function(evt) {
        evt.preventDefault();
        handleShowChordTones();
    })
}

// WHEN SHOW CHORD IS CLICKED ( IN handleShowChordTones() )
const addListenerPlayButton = () => {
    playButton.addEventListener("click", function(evt) {
        evt.preventDefault();
        handlePlayChord();
    })
}

const addListenerArpeggiateButton = () => {
    arpeggiateButton.addEventListener("click", function(evt) {
        evt.preventDefault();
        handleArpeggiate();
    })
}

const addListenerPlayIndividualButton = () => {
    playIndividualButton.addEventListener("click", function(evt) {
        evt.preventDefault();
        handlePlayIndividual();
    })
}

const addListenerNewChordButton = () => {
    newChordButton.addEventListener("click", function(evt) {
        handleNewChord();
    })
}

const addListenerColourButton = () => {
    colourThemeButton.addEventListener("click", function(evt) {
        handleColourTheme();
    })
}

// WHEN PAGE LOADS, ONLY NAME SELECTION IS ENABLED. ENABLE DROPDOWNS IN SEQUENCE: ONCE ONE IS SELECTED, ENABLE NEXT THEN ATER TYPE IS SELECTED, ENABLE EXTENSIONS 6, 7, 9, 11, 13

// SELECT PARAGRAPHS TO SHOW / HIDE INSTRUCTIONS
const nameInstruction = document.getElementById("name-instruction");
const accidentalInstruction = document.getElementById("accidental-instruction");
const typeInstruction = document.getElementById("type-instruction");
const extensionInstruction = document.getElementById("extension-instruction");

// NOT USED
// let isAccidentalSelected = false;
// NOT USED
// let isTypeSelected = false;



// EVENT LISTENERS ON NAME/ACCIDENTAL/TYPE DROPDOWN OPTIONS:

// GET SELECTED NAME, ENABLE ACCIDENTAL OPTIONS, SHOW INSTR ONCE NAME IS SELECTED: getDropdownValues.js - getNameChange();
// GET SELECTED ACCIDENTAL, ENABLE TYPE OPTIONS, SHOW INSTR ONCE ACCIDENTAL IS SELECTED: getDropdownValues.js - getAccidentalChange()
// GET SELECTED TYPE, ENABLE EXTENSIONS 6, 7, 9, 11, 13 , SHOW INSTR: getDropdownValues.js - getTypeChange()



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

// DISABLE / ENABLE OPTIONS
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

const enableAllSoundAndNewButtons = () => {
    // NOT IN USE
    // playButton.disabled = false;
    // playIndividualButton.disabled = false;
    // newChordButton.disabled = false;
    // arpeggiateButton.disabled = false;
    
    // MAKE BUTTONS HOVER-ABLE
    // newChordButton.classList.add("hover");
    // playButton.classList.add("hover");
    // arpeggiateButton.classList.add("hover");
    // playIndividualButton.classList.add("hover");

    //  ENABLE ANIMATED BUTTONS
    newChordButton.classList.add("animated-btn");
    playButton.classList.add("animated-btn");
    arpeggiateButton.classList.add("animated-btn");
    playIndividualButton.classList.add("animated-btn");
    // colourThemeButton.classList.add("animated-btn");
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // THESE 2 WORK FINE:
    // newChordButton.classList.remove("pre-animation-btn");
    // playButton.classList.remove("pre-animation-btn");

    // // ??????   THESE 2 DON'T WORK ???????

    // arpeggiateButton.classlist.remove("pre-animation-btn");
    // playIndividualButton.classlist.remove("pre-animation-btn");
   
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // !!!!!    classlist.remove WORKS WITH A LOOP WTF???   !!!!!
    const elements = document.querySelectorAll(".enabled-with-show-btn");
      // remove class from all chosen elements
    for (let i=0; i<elements.length; i++) {
      elements[i].classList.remove("pre-animation-btn");
    }
}

const enableRegister = () => {
    // guitarOpt IS NOT DISABLED BY DEFAULT
    // guitarOpt.disabled = false;
    bassOpt.disabled = false;
    guitarUpOpt.disabled = false;
}

const enableShowChordButton = () => {
    // NOT IN USE
    // showChordTonesButton.disabled = false;
    // NOT IN USE
    // MAKE BUTTON HOVER-ABLE
    // showChordTonesButton.classList.add("hover");
    showChordTonesButton.classList.add("animated-btn");
    showChordTonesButton.classList.remove("pre-animation-btn");
}
// DISABLE ALL
const disableSelectOptions = () => {
    accidentalDisable();
    typeDisable();
    sixthDisable();
    seventhDisable();
    ninthDisable();
    eleventhDisable();
    thirteenthDisable();
}

// ENABLE 6, 7, 9, 11, 13 OPTIONS BASED ON TYPE SELECTED
const enableExtensionOptions = (str) => {

    const typeChangeVal = str;
    if (typeChangeVal === "dominant") {
        sixthEnable();
        ninthEnable(typeChangeVal);
        eleventhEnable(typeChangeVal);
        thirteenthEnable(typeChangeVal);
    } else if (typeChangeVal === "phrygian") {
        sixthEnable();
        seventhEnable();
        ninthEnable(typeChangeVal);
        eleventhEnable(typeChangeVal);
    } else if (typeChangeVal === "sus2") {
        sixthEnable();
        seventhEnable();
        eleventhEnable(typeChangeVal);
        thirteenthEnable(typeChangeVal);
    } else if (typeChangeVal === "sus4" || typeChangeVal === "lydian") {
        sixthEnable();
        seventhEnable();
        ninthEnable(typeChangeVal);
        thirteenthEnable(typeChangeVal);
    // MAJOR, MINOR, AUGMENTED OR DIMINISHED 
    } else {
        sixthEnable();
        seventhEnable();
        ninthEnable(typeChangeVal);
        eleventhEnable(typeChangeVal);
        thirteenthEnable(typeChangeVal);
    }

}

// PLAY INTRO WHEN PAGE LOADS
const playIntro = () => {
    setTimeout(() => {
        const sound = new Howl({
            src: ['src/sounds/intro2.mp3']
          });
          sound.play();      
    }, 600)
}

window.addEventListener("load", function() {
    console.log("page is loaded");
    // helpersTest()
    playIntro();
    disableSelectOptions();
    setTimeout(() => {
        showNameInstruction();
        addListenerColourButton();
        colourThemeButton.classList.add("animated-btn");
    }, 2000)
});

let resizeTimer;
window.addEventListener("resize", () => {
    const animatedElements = document.querySelectorAll(".animation-enabled");
    for (let el of animatedElements) {
        el.classList.remove("animation-enabled");
        el.classList.add("animation-disabled");
        // console.log("removed class");
    }
    // document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // document.body.classList.remove("resize-animation-stopper");
        const animationDisabledElements = document.querySelectorAll(".animation-disabled");
        for (let el of animationDisabledElements) {
            el.classList.add("animation-enabled");
            el.classList.remove("animation-disabled");
            // console.log("added class");
        }
    }, 500);
});

export { 
    getName,
    getType,
    getOptNinth,
    getOptEleventh,
    getOptThirteenth,
    getAccidental,
    getOptSixth,
    getOptSeventh,
    getDiatonicScale,
    accidentalEnable,
    hideNameInstruction,
    showAccidentalInstruction,
    typeEnable,
    accidentalOptions,
    hideAccidentalInstruction,
    showTypeInstruction,
    enableExtensionOptions,
    hideTypeInstruction,
    showExtensionInstruction,
    enableShowChordButton,
    addListenerShowChordButton,
    showChordTonesButton 
};