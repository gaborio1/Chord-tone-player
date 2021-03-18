// MODULE IMPORTS

import { 
    getName,
    getType,
    getAccidental
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

import {
    accidentalEnable,
    accidentalDisable,
    typeDisable,
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
} from "./utils/handleOptionsMessagesButtons.js";
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

// ********** SHOW CHORD BUTTON **********
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

// ********** CHORD PLAY BUTTON **********
const handlePlayChord = () => {
    playChord(getChordToneSounds());
}

// ********** ARPEGGIO BUTTON **********
const handleArpeggiate = () => {
    arpeggiateChord(getChordToneSounds());
}

// ********** NOTES BUTTON **********
const handlePlayIndividual = () => {
    makeSoundDivs();
}

// ********** NEW CHORD BUTTON **********
const handleNewChord = () => {
    refreshPage();
}

// ********** THEME BUTTON **********
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

// ********** WHEN CHORD TYPE SELECTION IS MADE ( IN getTypeChange() ) **********
const addListenerShowChordButton = () => {
    showChordTonesButton.addEventListener("click", function(evt) {
        evt.preventDefault();
        handleShowChordTones();
    })
}

// ********** WHEN SHOW CHORD IS CLICKED ( IN handleShowChordTones() ) **********
const addListenerPlayButton = () => {
    playButton.addEventListener("click", function(evt) {
        evt.preventDefault();
        handlePlayChord();
    })
}
// ********** WHEN ARPEGGIO IS CLICKED ( IN handleShowChordTones() ) **********
const addListenerArpeggiateButton = () => {
    arpeggiateButton.addEventListener("click", function(evt) {
        evt.preventDefault();
        handleArpeggiate();
    })
}
// ********** WHEN NOTES IS CLICKED ( IN handleShowChordTones() ) **********
const addListenerPlayIndividualButton = () => {
    playIndividualButton.addEventListener("click", function(evt) {
        evt.preventDefault();
        handlePlayIndividual();
    })
}
// ********** WHEN NEW CHORD IS CLICKED ( IN handleShowChordTones() ) **********
const addListenerNewChordButton = () => {
    newChordButton.addEventListener("click", function(evt) {
        handleNewChord();
    })
}
// ********** WHEN THEME IS CLICKED ( IN handleShowChordTones() ) **********
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

// ********** EVENT LISTENERS ON NAME/ACCIDENTAL/TYPE DROPDOWN OPTIONS: **********

// GET SELECTED NAME, ENABLE ACCIDENTAL OPTIONS, SHOW INSTR ONCE NAME IS SELECTED: getDropdownValues.js - getNameChange();
// GET SELECTED ACCIDENTAL, ENABLE TYPE OPTIONS, SHOW INSTR ONCE ACCIDENTAL IS SELECTED: getDropdownValues.js - getAccidentalChange()
// GET SELECTED TYPE, ENABLE EXTENSIONS 6, 7, 9, 11, 13 , SHOW INSTR: getDropdownValues.js - getTypeChange()


//  USED IN getDropdownValues.js
const accidentalOptions = document.getElementById("accidental");

const registerOptions = document.getElementById("register");
// // guitarOpt IS NOT DISABLED BY DEFAULT
const guitarOpt = registerOptions.options[0];
const bassOpt = registerOptions.options[1];
const guitarUpOpt = registerOptions.options[2];

// ********** DISABLE / ENABLE OPTIONS: enableDisableOptionsAndButtons.js **********
// FUMCTIONS FOR typeEnable()


const enableAllSoundAndNewButtons = () => {
    // NOT IN USE
    // playButton.disabled = false;
    // playIndividualButton.disabled = false;
    // newChordButton.disabled = false;
    // arpeggiateButton.disabled = false;

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
    showChordTonesButton,
    nameInstruction,
    accidentalInstruction,
    typeInstruction,
    extensionInstruction,
};