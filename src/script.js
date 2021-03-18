// MODULE IMPORTS

import { 
    getName,
    getType,
    getAccidental,
    // getOptSixth,
    // getOptSeventh,
    // getOptNinth,
    // getOptEleventh,
    // getOptThirteenth,
    getRegister,
    getNameChange,
    getAccidentalChange,
    // getTypeChange
} from "./utils/getDropdownValues.js";

import getDiatonicScale from "../src/utils/buildScale.js";

import  { 
    // helpersTest,
    buildBaseTypeSymbol,
    addExtensionToBaseChordSymbol,
    buildFullChordName 
} from "./utils/buildChordName.js";

import buildChordTones from "./utils/buildChordTones.js";

import circleOfFifths from "./utils/circleOfFifths.js";

import soundNames from "./utils/soundNames.js";

import getChordToneSounds from "./utils/buildAudioFilenames.js";
// NOT IN USE !!!
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

 // INVALID CHORD MESSAGE WITH HIDDEN CLASS
 const invalidKeyMessage = document.getElementById("invalid-key-message");

// ********** BUILD DIATONIC SCALE: buildScale.js - getNaturalScale(), addSharpsToNaturalScale(), addFlatsToNaturalScale() **********

// ********** DISPLAY DIATONIC SCALE BUILT IN buildScale.js **********
const displayChordScale = () => {
    const chordScaleSpan = document.getElementById("chord-scale");
    const scale = getDiatonicScale(getName(), getAccidental(), getType());
    console.log(scale.join(" "));
    const scaleArr = scale.join(" ");
    console.log(scaleArr);
    chordScaleSpan.innerText = scale.join("  ");
}

// ********** BUILD AUDIO FILENAMES ( "src/sounds/EbF4.mp3" ) FOR HOWLER JS: buildAudioFilenames.js - makeChordNotesArr(),calcRegisterIdx(), getChordToneSounds() **********

// ********** PLAY CHORD NOTES TOGETHER ( PLAY CHORD BUTTON ) **********
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

// ********** PLAY CHORD NOTES IN SEQUENCE ( ARPEGGIO BUTTON ) WITH AN INITIAL DELAY OF 500 INCREMENTED BY 200 FOR EACH CHORDTONE **********
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

// ********** CREATE A RESPONSIVE DIV FOR EACH CHORD DEGREE ( NOTES BUTTON ) **********

const audioContainer = document.getElementById("audio-container");

// REMOVE EXISTING DIVS IF ANY TO CLEAR CONTENT IN AUDIOCONTAINER
const removeChildElements = (el) => {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

// CREATE ELEMENTS WITH EVENT LISTENER FOR EACH EL IN ARRAY
const makeNewElements = (arr) => {
    // NEED ACTUAL NOTE NAMES WITHOUT PATH AND EXTENSION
    const chordTones = buildChordTones().split(" ");
    arr.forEach((soundFile, i) => {
        
        let elem = document.createElement("div");
        // ??? THIS IS NOT WORKING !!!
        // elem.class = "btn";
        // INSTEAD:
        elem.classList.add("sound-div");
        elem.id = `sound-div${i}`;
        // elem.innerText = `Deg.${i + 1}: ${chordTones[i]}`    
        elem.innerText = chordTones[i];    
        audioContainer.appendChild(elem);
        // document.body.append(elem);

        soundFile = new Howl({
            src: [soundFile],
            volume: 0.6
        })
        elem.addEventListener('mouseover', () => soundFile.play());

    })
}

const makeSoundDivs = () => {
    const soundFiles = getChordToneSounds();
    removeChildElements(audioContainer);
    makeNewElements(soundFiles);
}

// ********** REFRESH PAGE FOR NEW CHORD ( NEW CHORD BUTTON ) **********
const refreshPage = () => {
    location.reload();
    // THIS ALSO WORKS
    // location.reload(true);
}

// ********** TOGGLE COLOUR THEMES ( THEME BUTTON ) **********
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

// EVENT HANDLERS ON BUTTONS:

// SHOW CHORD BUTTON
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

// CHORD PLAY BUTTON
const handlePlayChord = () => {
    playChord(getChordToneSounds());
}

// ARPEGGIO BUTTON
const handleArpeggiate = () => {
    arpeggiateChord(getChordToneSounds());
}

// NOTES BUTTON
const handlePlayIndividual = () => {
    makeSoundDivs();
}

// NEW CHORD BUTTON
const handleNewChord = () => {
    refreshPage();
}

// THEME BUTTON
const handleColourTheme = () => {
    toggleBackgroundColour();

    toggleButtonStyle();

}

// EVENT LISTENERS ON BUTTONS:
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
    // playIntro();
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
    // getName,
    // getType,
    // getAccidental,
    // getOptSixth,
    // getOptSeventh,
    // getOptNinth,
    // getOptEleventh,
    // getOptThirteenth,
    // getDiatonicScale,
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