console.log('connected');

class Chord {
    constructor(name, accidental, type, optSixth = "", optSeventh = "", optNinth = "", optEleventh = "") {
        this.name = name;
        this.accidental = accidental;
        this.type = type;
        this.optSixth = optSixth;
        this.optSeventh = optSeventh;
        this.optNinth = optNinth;
        this.optEleventh = optEleventh;
        // this.root = getRoot();
        // this.sixthSeventh = this.sixthSeventh;
        this.test = function() {
            const {name, type, getRoot, getThird, getFifth, getMinorSeventh, optSeventh} = this;
            // console.log(`Hello from: ${name}${accidental} ${type}, my notes: ${getRoot()}, ${getThird()}, ${getFifth()}`);
            return `Hello from: ${name}${accidental} ${type} ${optSeventh}, my notes: ${getRoot()}, ${getThird()}, ${getFifth()}, ${this.getSeventh()}`;
        }
    }
    // FIND AND RETURN APPROPRIATE SCALE DEGREE FROM DIATONIC SCALE
    getRoot = () => getDiatonicScale(this.name, this.accidental, this.type)[0];
    getThird = () => getDiatonicScale(this.name, this.accidental, this.type)[2];
    // FLATTEN FIFTH 
    getFlatFifth = () => {
        const {getFifth} = this;
        // IF fifth HAS A SECOND CHAR "#", ONLY RETURN THE FIRST CHAR (LETTER NAME)
        let secondChar = getFifth().charAt(1);
        switch (secondChar) {
            case "#":
                return getFifth().charAt(0);
                break;
            default:
                return getFifth().concat("b");
        }
    }
    getFifth = () => getDiatonicScale(this.name, this.accidental, this.type)[4];
    // SHARPEN FIFTH
    getSharpFifth = () => {
        const {getFifth} = this;
        // IF fifth HAS A SECOND CHAR "b", ONLY RETURN THE FIRST CHAR (LETTER NAME)
        let secondChar = getFifth().charAt(1);
        switch (secondChar) {
            case "b":
                return getFifth().charAt(0);
                break;
            default:
                return getFifth().concat("#");
        }
    }
    getSixth = () => getDiatonicScale(this.name, this.accidental, this.type)[5];
    getMinorSeventh = () => {
        const {getSeventh} = this;
        // IF sixth HAS A SECOND CHAR "#", ONLY RETURN THE FIRST CHAR (LETTER NAME)
        let secondChar = getSeventh().charAt(1);
        switch (secondChar) {
            case "#":
                return getSeventh().charAt(0);
                break;
            default:
                return getSeventh().concat("b");
        }
    }
    getSeventh = () => getDiatonicScale(this.name, this.accidental, this.type)[6];
    getNinth = () => getDiatonicScale(this.name, this.accidental, this.type)[1];
    getEleventh = () => getDiatonicScale(this.name, this.accidental, this.type)[3];
    getSharpEleventh = () => {
        const {getEleventh} = this;
        // IF eleventh HAS A SECOND CHAR "b", ONLY RETURN THE FIRST CHAR (LETTER NAME)
        let secondChar = getEleventh().charAt(1);
        switch (secondChar) {
            case "b":
                return getEleventh().charAt(0);
                break;
            default:
                return getEleventh().concat("#");
        }
    }

}

// GET NAME FROM DROPDOWN
function getName() {
    const nameSelect = document.getElementById("name");
    let chordName = nameSelect.options[nameSelect.selectedIndex].value;
    return chordName;
}
// GET TYPE FROM DROPDOWN
function getType() {
    const typeSelect = document.getElementById("type");
    let chordType = typeSelect.options[typeSelect.selectedIndex].value;
    return chordType;
}
// GET ACCIDENTALS FROM DROPDOWN
function getAccidental() {
    const accidentalSelect = document.getElementById("accidental");
    let chordAccidental = accidentalSelect.options[accidentalSelect.selectedIndex].value;
    return chordAccidental;
}
// GET OPTIONAL SIXTH
function getOptSixth() {
    const sixthSelect = document.getElementById("sixth");
    let chordSixth = sixthSelect.options[sixthSelect.selectedIndex].value;
    return chordSixth;
}
// GET OPTIONAL SEVENTH
//  The value property of an HTML option element can only be a string !!!
function getOptSeventh() {
    const seventhSelect = document.getElementById("seventh");
    let chordSeventh = seventhSelect.options[seventhSelect.selectedIndex].value;
    return chordSeventh;
}
// GET OPTIONAL NINTH
function getOptNinth() {
    const ninthSelect = document.getElementById("ninth");
    let chordNinth = ninthSelect.options[ninthSelect.selectedIndex].value;
    return chordNinth;
}
function getOptEleventh() {
    const EleventhSelect = document.getElementById("eleventh");
    let chordEleventh = EleventhSelect.options[EleventhSelect.selectedIndex].value;
    return chordEleventh;
}
// DISP CHORD NAME BASED OFF OF name, accidental AND type
// CHANGE type VALUE TO SYMBOLS
function displayChordName() {
    let chordNameType;
    let typeSymbol;
    switch (getType()) {
        case "major" :
            typeSymbol = "";
            break;
        case "minor" :
            typeSymbol = "m";
            break;
        case "dominant" :
            if (getOptNinth() === "9" || getOptNinth() === "add9") {
                typeSymbol = "9";
            } else {
                typeSymbol = "7";
            }
            break;
        case "augmented" :
            typeSymbol = "+";
            break;
        case "diminished" :
            typeSymbol = "0";
            break;
        default:
            typeSymbol = "invalid type"
        }

    let type = getType();
    // ADD OPTIONAL SIXTH TO SYMBOL
    let sixthValue = getOptSixth();
    if (sixthValue === "6") {
        if (type === "major") {
            typeSymbol += "6";
        } else if (type === "minor") {
            typeSymbol += "6";
        } else {
            console.log("not major or minor, FIX THIS!");
        }
    }
    // ADD OPTIONAL 7th TO SYMBOL
    let seventhValue = getOptSeventh();
    if (seventhValue === "7") {
        if (type === "major") {
            typeSymbol += "M7";
        } else if (type === "minor") {
            typeSymbol += "7";
        } else {
            console.log("not major or minor, FIX THIS!");
        }
    }
    // ADD OPTIONAL 9th TO SYMBOL
    let ninthValue = getOptNinth();
    if (ninthValue === "9") {
        if (type === "major") {
            typeSymbol += "M9";
        } else if (type === "minor") {
            typeSymbol += "9";
        } else if (type === "dominant") {
            typeSymbol += "";
        } else {
            console.log("not major or minor, FIX THIS!");
        }
    } else if (ninthValue === "add9") {
        if (type === "dominant") {
            typeSymbol = "9";
        } else {
            typeSymbol += " add9";
        }
    }
    // ADD OPTIONAL 11th TO SYMBOL
    let eleventhValue = getOptEleventh();
    if (eleventhValue === "11") {
        if (type === "major") {
            typeSymbol += "M11";
        } else if (type === "minor") {
            typeSymbol += "11";
        } else if (type === "dominant") {
            typeSymbol += "";
        } else {
            console.log("not major or minor, FIX THIS!");
        }
    } else if (eleventhValue === "add11") {
        if (type === "dominant") {
            typeSymbol = "11";
        } else {
            typeSymbol += " add11";
        }
    }
    chordNameType = `${getName().toUpperCase()}${getAccidental()}${typeSymbol}`;
    document.getElementById("chordNameType").innerText = chordNameType;
    return chordNameType;
}

// DISP CHORD TONES BASED ON DIATONIC SCALE
function displayChordTones() {
    const chordObj = new Chord(getName(), getAccidental(), getType(), getOptSeventh());
    // this.test FROM CONSTRUCTOR
    console.log(chordObj.test());
    const chordTonesDisplay = document.getElementById("chordTones");
    let chordTones = "";
    switch (getType()) {
        case "diminished" :
            chordTones = `${chordObj.getRoot()} ${chordObj.getThird()} ${chordObj.getFlatFifth()}`;
            break;
        case "augmented" :
            chordTones = `${chordObj.getRoot()} ${chordObj.getThird()} ${chordObj.getSharpFifth()}`;
            break;
        case "dominant" :
            chordTones = `${chordObj.getRoot()} ${chordObj.getThird()} ${chordObj.getFifth()} ${chordObj.getMinorSeventh()}`;
            break;
        default:
            chordTones = `${chordObj.getRoot()} ${chordObj.getThird()} ${chordObj.getFifth()}`;
    }
    // ADD SIXTH BASED ON type => chordScale
    let sixthValue = getOptSixth();
    if (sixthValue === "6") {
        chordTones += " " + chordObj.getSixth();
    }
    chordTonesDisplay.innerText = chordTones;
    // ADD SEVENTH BASED ON type => chordScale
    let seventhValue = getOptSeventh();
    if (seventhValue === "7") {
        chordTones += " " + chordObj.getSeventh();
    }
    chordTonesDisplay.innerText = chordTones;
    // ADD NINTH BASED ON type => chordScale
    let ninthValue = getOptNinth();
    if (ninthValue === "9") {
        if (getType() === "dominant") {
            chordTones += " " + chordObj.getNinth();
        } else {
            chordTones += " " + chordObj.getSeventh() + " " + chordObj.getNinth();
        }
    } else if (ninthValue === "add9") {
        chordTones += " " + chordObj.getNinth();
    }
    // ADD ELEVENTH BASED ON type => chordScale
    let eleventhValue = getOptEleventh();
    // SHARP 11 WITH MAJOR !!!
    if (eleventhValue === "11" && getType() === "major") {
        chordTones += " " + chordObj.getSeventh() + " " + chordObj.getNinth() + " " + chordObj.getSharpEleventh();
        // NATURAL 11 WITH MINOR !!!
    } else if (eleventhValue === "11" && getType() === "minor") {
        chordTones += " " + chordObj.getSeventh() + " " + chordObj.getNinth() + " " + chordObj.getEleventh();
    } else if (eleventhValue === "add11" && getType() === "major") {
        chordTones += " " + chordObj.getSharpEleventh();
    } else if (eleventhValue === "add11" && getType() === "minor") {
        chordTones += " " + chordObj.getEleventh();
    }
    chordTonesDisplay.innerText = chordTones;
    return chordTones;
}

// EVT HANDLER
function handleClick() {
    displayChordName();
    displayChordTones();
    displayChordScale();
}

// LISTEN FOR CLICK
const buttonTest = document.getElementById("buttonEvtList");
buttonTest.addEventListener("click", function(evt) {
    evt.preventDefault();
    handleClick();
})

// CHORD OBJECT TEST
// const c1 = new Chord("c", "", "major");
// const c2 = new Chord("a#", "major");

// MODELLING SCALES

const circleOfFifths = {
    // NATURAL NOTES
    degrees : ["c", "d", "e", "f", "g", "a", "b"],
    // degrees : ["C", "D", "E", "F", "G", "A", "B"],
    // FIND TONIC  AND ITS INDEX WILL CORRESPOND TO ITS LAST ACCIDENTAL NOTE'S IDX IN sharps/flats
    majorSharpKeys : ["g", "d", "a", "e", "b", "f#", "c#"],
    majorFlatKeys : ["f", "bb", "eb", "ab", "db", "gb", "cb"],
    
    minorSharpKeys : ["e", "b", "f#", "c#", "g#", "d#", "a#"],
    minorFlatKeys : ["d", "g", "c","f", "bb", "eb", "ab" ],
    // FOR EXAMPLE: E MAJOR IS AT IDX 3, WILL GIVE F,C,G,D AS D IS AT IDX 3 IN sharps
    // THEN ADD SHARPS TO THOSE NOTES IN THE NATURAL SCALE
    sharps : ["f", "c", "g", "d", "a", "e", "b"],
    flats : ["b", "e", "a", "d", "g", "c", "f"]
}

// BUILD NATURAL SCALE STARTING WITH TONIC 
function getNaturalScale(ton) {
    let tonic = ton;
    // GET TONIC IDX
    let tonicIdx = circleOfFifths["degrees"].indexOf(tonic);
    // GET 2 SUBSCALES 
    let subScale1 = circleOfFifths["degrees"].slice(tonicIdx);
    let subScale2 = circleOfFifths["degrees"].slice(0, tonicIdx);
    // MERGE SUBSCALES
    // !!! IF I UPPERCASE HERE, ACCIDENTALS WILL NOT BE ADDED !!!
    let naturalScale = subScale1.concat(subScale2)
    // .map(note => note.toUpperCase())
    ;
    return naturalScale;
}

// BUILD DIATONIC SCALE (MAJOR OR MINOR)
function getDiatonicScale(name, accidental, type) {  
    let naturalScale = getNaturalScale(name);
    // GET FIRST NOTE OF SCALE
    let firstDegree = naturalScale[0];
    // CONCAT OPTIONAL ACCIDENTAL SO FULL NAME CAN BE USED IN SEARCH
    firstDegree += accidental;
    // EMPTY ARRAY FOR RESULT
    let diatonicScale = [];
    // INVALID CHORD MESSAGE WITH HIDDEN CLASS
    const message = document.getElementById("message");

    // !!! THESE WORK WITHOUT INITIALISING ???

    // let foundMajorKeys; NOW foundKeyCenters !!!
    // let foundMinorKeys; NOW foundKeyCenters !!!
    // let accidentalNotes = [];
    // let idx;

    // BASED ON type, FIND THAT NOTE IN EITHER majorSharpKeys OR majorFlatKeys
    // IF MAJOR
    if (type === "major" || type === "augmented" || type === "dominant") {
       
        // IF MAJOR SHARP
        if (circleOfFifths["majorSharpKeys"].indexOf(firstDegree) > -1) {
            // ASSIGN APPROPRIATE ARRAY TO VARIABLE
            foundKeyCenters = circleOfFifths["majorSharpKeys"];
            // GET INDEX OF TONIC (LETTER NAME OF SCALE) FROM KEY SIGNATURES
            idx = foundKeyCenters.indexOf(firstDegree) + 1;
            // GET FIRST n NOTES THAT NEED ACCIDENTALS (FROM sharps)
            accidentalNotes = circleOfFifths["sharps"].slice(0, idx);
            // ITERATE OVER scale AND IF ELEMENT IS CONTAINED IN accidentalNotes, ADD "#" TO IT
            // const diatonicScale = [];
            for (const el of naturalScale) {
                if (accidentalNotes.indexOf(el) > -1) {
                    diatonicScale.push(el.concat("#"));
                } else diatonicScale.push(el);
                message.classList.add("hidden");
            }

        //  IF MAJOR FLAT
        } else if (circleOfFifths["majorFlatKeys"].indexOf(firstDegree) > -1) {
            foundKeyCenters = circleOfFifths["majorFlatKeys"];
            idx = foundKeyCenters.indexOf(firstDegree) + 1;
            accidentalNotes = circleOfFifths["flats"].slice(0, idx);
            // ITERATE OVER scale AND IF ELEMENT IS CONTAINED IN accidentalNotes, ADD "b" TO IT
            for (const el of naturalScale) {
                if (accidentalNotes.indexOf(el) > -1) {
                    diatonicScale.push(el.concat("b"));
                } else {
                    diatonicScale.push(el);
                    message.classList.add("hidden");
                }
            }
        // IF C NATURAL MAJOR OR AUGMENTED
        } else if (name === "c" && accidental === "" && (type === "major" || type === "augmented" || type === "dominant")) {
            diatonicScale = naturalScale.slice();
            message.classList.add("hidden");
        } 
        // HANDLE THEORETICAL KEY SIGNATURES 
        else {
            // DISPLAY MESSAGE
            message.classList.remove("hidden");
        }

    // IF MINOR
    } else if (type === "minor" || type === "diminished") {

        //  IF MINOR SHARP
        if (circleOfFifths["minorSharpKeys"].indexOf(firstDegree) > -1) {
            foundKeyCenters = circleOfFifths["minorSharpKeys"];
             idx = foundKeyCenters.indexOf(firstDegree) + 1;
             accidentalNotes = circleOfFifths["sharps"].slice(0, idx);
             for (const el of naturalScale) {
                 if (accidentalNotes.indexOf(el) > -1) {
                     diatonicScale.push(el.concat("#"));
                 } else {
                    diatonicScale.push(el);
                    message.classList.add("hidden");
                 }
             }
        // IF MINOR FLAT
        } else if (circleOfFifths["minorFlatKeys"].indexOf(firstDegree) > -1) {
            foundKeyCenters = circleOfFifths["minorFlatKeys"];        
            idx = foundKeyCenters.indexOf(firstDegree) + 1;
            accidentalNotes = circleOfFifths["flats"].slice(0, idx);
            for (const el of naturalScale) {
                if (accidentalNotes.indexOf(el) > -1) {
                    diatonicScale.push(el.concat("b"));
                } else {
                    diatonicScale.push(el);
                    message.classList.add("hidden");
                }
            }
        // IF A NATURAL MINOR
        } else if (name === "a" && accidental === "" && (type === "minor" || type === "diminished")) {
            console.log("c major");
            diatonicScale = naturalScale.slice();
            message.classList.add("hidden");
        } else {
            message.classList.remove("hidden");
        }
    } 
    // IF DOMINANT
    // else {
    //     diatonicScale = naturalScale;
    // }
    // UPPERCASE NOTE LETTER NAMES BUT NOT THE ACCIDENTAL
    const result = diatonicScale.map(note => note.charAt(0).toUpperCase() + note.slice(1));
    return result;
}
// TESTS FOR LINE 244 CONSOLE LOG
// getDiatonicScale("e","", "major");
// getDiatonicScale("e","b", "major");
// getDiatonicScale("e","", "minor");
// getDiatonicScale("g","", "minor");

function displayChordScale() {
    let scale = getDiatonicScale(getName(), getAccidental(), getType());
    // console.log(getName(), getAccidental(), getType())
    // console.log(scale);
    document.getElementById("chordScale").innerText = scale;
}

// PLAY CHORD 

// SHARP-FLAT COMBINED CHROMATIC SCALE E2-B4 
// "s"="sharp" AND "b"="flat"
const chromaticScale = [
    "E2", "FEs2", "FsGb2", "G2", "GsAb2", "A2", "AsBb2", "BCb2", "C3", "CsDb3", "D3", "DsEb3", "E3", "FEs3", "FsGb3", "G3", "GsAb3", "A3", "AsBb3", "BCb3", "C4", "CsDb4", "D4", "DsEb4", "E4", "FEs4", "FsGb4", "G4", "GsAb4", "A4", "AsBb4", "B4"];

function getChordToneSounds() {
    // SPLIT CHORD NOTES INTO ARRAY ["C", "E", "G", "Bb"]
    const chordNotesArr = displayChordTones().split(" ");
    // !!! REPLACE SPECIAL CHAR "#" WITH "s" FOR SHARP AS HOWLER WILL NOT LOAD MP3'S WITH SPEC CHARACTER IN FILENAME !!! 
    // ["Cs", "Es", "Gs"]
    for (let i = 0; i < chordNotesArr.length; i++) {
            chordNotesArr[i] = chordNotesArr[i].replace("#", "s");
           }
        // EMPTY ARRAY FOR SOUNDS WITH PATHS AND EXTENSION
    const soundsArr = [];
     // KEEP TRACK OF ACTUAL MINIMUM INDEX (OUTSIDE OF LOOP!!!), INITIALISE WITH A VALUE OF 0 AND ACCUMULATE IN INNER LOOP
    let minIdx = 0;
    // FIND EACH NOTE OF chordNotesArr [C,E,G] IN chromaticScale 
    chordNotesArr.forEach((chordTone) => {
       
        for (let i = 0; i < chromaticScale.length; i++) {
            if (chordTone.length === 1 && chromaticScale[i].charAt(0) === chordTone && i >= minIdx) {
                soundsArr.push("sounds/" + chromaticScale[i].concat(".mp3"));
                minIdx = i;
                break;
            } else if (chordTone.length > 1 && chromaticScale[i].includes(chordTone ) && i >= minIdx) {
                soundsArr.push("sounds/" + chromaticScale[i].concat(".mp3"));
                minIdx = i;
                break;
            }
        }
        return minIdx;
    })

    // FIND OCTAVEDIGIT AND CHANGE IF NECESSARY WITH REGEX
    // const octaveDigit = /(\d)(?=\.)/;
    // for (let i = 1; i < soundsArr.length; i++) {
    //     console.log(soundsArr[i]);
    //     soundsArr[i] = soundsArr[i].replace(octaveDigit, "hello")
    //     console.log(soundsArr[i].replace(octaveDigit, "hello"));
    //     // if (octaveDigit IS LESS THAN PREVIOUS ELEMENT'S ) {
    //         // ADD 1 TO IT  
    //         // console.log("wrong octave");
    //     // }
    // }
    // console.log(soundsArr);

    // FIND OCTAVEDIGIT AND TRANSPOSE INDIVIDUAL NOTES IF NECESSARY (THIS IS EASIER THAN USING REGEX)
    // for (let i = 1; i < soundsArr.length; i++) {
    //     const octaveDigit = soundsArr[i].charAt(soundsArr[i].length - 5);
    //     // console.log(typeof(octaveDigit));
    //     console.log(soundsArr[i] + ", octave: " + octaveDigit);
    //     // IF CURRENT OCTAVE IS SMALLER THAN PREVIOUS, TRANSPOSE IT UP BY 1
    //     if (soundsArr[i].charAt(soundsArr[i].length - 5) < soundsArr[i - 1].charAt(soundsArr[i - 1].length - 5)) {
    //         console.log("wrong octave");
    //         console.log("current octave: " + soundsArr[i].charAt(soundsArr[i].length - 5));
    //         console.log("previous octave: " + soundsArr[i - 1].charAt(soundsArr[i - 1].length - 5));
    //         // INCREMENT OCTAVEDIGIT BY 1
    //         let octaveDigitNum = parseInt(octaveDigit, 10);
    //         octaveDigitNum += 1;
    //         soundsArr[i] = soundsArr[i].replace(soundsArr[i].charAt(soundsArr[i].length - 5), octaveDigitNum.toString());
    //     }
    // }
    // // ALSO, TRANSPOSE NOTES THAT ARE BEYOND THE OCTAVE (9,11,13)
    // if (soundsArr.length > 3  && (displayChordName().indexOf("9") !== -1 || displayChordName().indexOf("11")!== -1)) {
    //     console.log("9 or 11 !!!");
    //     for (let i = 3; i < soundsArr.length; i++) {
    //         const octaveDigit = soundsArr[i].charAt(soundsArr[i].length - 5);
    //         let octaveDigitNum = parseInt(octaveDigit, 10);
    //         octaveDigitNum += 1;
    //         soundsArr[i] = soundsArr[i].replace(soundsArr[i].charAt(soundsArr[i].length - 5), octaveDigitNum.toString());
    //     }
    // }
    console.log("soundsArr updated octave: " + soundsArr);
    return soundsArr;
}

// THIS IS GOING TO PLAY ACTUAL SOUND FILES
function playChordTones() {
    const soundFiles = getChordToneSounds();
    console.log("soundFiles: " + soundFiles);
    for (const soundFile of soundFiles) {
        // console.log(soundFile);
        const sound = new Howl({
            src: [soundFile]
        });
        sound.play();
    }

    // var sound = new Howl({
    //     src: ["sounds/C4.mp3", "sounds/E3.mp3", "sounds/G3.mp3"],
    //     autoplay: true,
    //     loop: false,
    //     volume: 0.5,
    //     onend: function() {
    //       console.log('Finished!');
    //     }
    //   });

    // var sound1 = new Howl({
    //     src: [soundFiles[0]],
    //     preload: true
    //   });
    // var sound2 = new Howl({
    //     src: [soundFiles[1]],
    //     preload: true
    //   });
    // var sound3 = new Howl({
    //     src: [soundFiles[2]],
    //     preload: true
    //   });

    //   var sound4 = new Howl({
    //     src: ['sounds/FsGb2.mp3'],
    //     preload: true
    //   });
    //   sound1.play()
    //   sound2.play()
    //   sound3.play()
    // sound4.play()
}

function handlePlay() {
    playChordTones();
}

// LISTEN FOR CLICK ON PLAY
const playButton = document.getElementById("play");
playButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    handlePlay();
})

// HOWLER JS AUDIO TEST PLAYS WAV FILE
// const sound = new Howl({
//     src: ['sounds/soundTest.wav']
//   });

// function soundTest() {
//     console.log("sound!");
//     console.log(sound);
//     // _src: "sounds/soundTest.wav"
//     sound.play();
// }

