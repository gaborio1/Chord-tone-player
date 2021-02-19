console.log('connected');

class Chord {
    constructor(name, accidental, type, optSixth = "", optSeventh = "", optNinth = "", optEleventh = "", optThirteenth = "") {
        this.name = name;
        this.accidental = accidental;
        this.type = type;
        this.optSixth = optSixth;
        this.optSeventh = optSeventh;
        this.optNinth = optNinth;
        this.optEleventh = optEleventh;
        this.optThirteenth = optThirteenth;
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
    getFlatSecond = () => {
        const {getSecond} = this;
        // IF second HAS A SECOND CHAR "#", ONLY RETURN THE FIRST CHAR (LETTER NAME)
        let secondChar = getSecond().charAt(1);
        switch (secondChar) {
            case "#":
                return getSecond().charAt(0);
            default:
                return getSecond().concat("b");
        }
    }

    getSecond = () => getDiatonicScale(this.name, this.accidental, this.type)[1];
    getThird = () => getDiatonicScale(this.name, this.accidental, this.type)[2];
    getFourth = () => getDiatonicScale(this.name, this.accidental, this.type)[3];

    getSharpFourth = () => {
        const {getFourth} = this;
        let secondChar = getFourth().charAt(1);
        switch (secondChar) {
            case "b":
                return getFourth().charAt(0);
            default:
                return getFourth().concat("#");
        }
    }

    getFlatFifth = () => {
        const {getFifth} = this;
        let secondChar = getFifth().charAt(1);
        switch (secondChar) {
            case "#":
                return getFifth().charAt(0);
            default:
                return getFifth().concat("b");
        }
    }

    getFifth = () => getDiatonicScale(this.name, this.accidental, this.type)[4];

    getSharpFifth = () => {
        const {getFifth} = this;
        let secondChar = getFifth().charAt(1);
        switch (secondChar) {
            case "b":
                return getFifth().charAt(0);
            default:
                return getFifth().concat("#");
        }
    }

    // MINOR6 IN MINOR AND MAJOR6 IN MAJOR !!!
    getSixth = () => getDiatonicScale(this.name, this.accidental, this.type)[5];

    // MAKE MINOR SIXTH MAJOR IN MINOR CHORDS:  C E G Ab  => C E G A
    getMajorSixth = () => {
        const {getSixth} = this;
        let secondChar = getSixth().charAt(1);
        switch (secondChar) {
            case "b":
                return getSixth().charAt(0);
            default:
                return getSixth().concat("#");
        }
    }

    getMinorSeventh = () => {
        const {getSeventh} = this;
        let secondChar = getSeventh().charAt(1);
        switch (secondChar) {
            case "#":
                return getSeventh().charAt(0);
            default:
                return getSeventh().concat("b");
        }
    }

    getSeventh = () => getDiatonicScale(this.name, this.accidental, this.type)[6];
    getNinth = () => this.getSecond();
    getEleventh = () => this.getFourth();
    getSharpEleventh = () => {
        const {getEleventh} = this;
        let secondChar = getEleventh().charAt(1);
        switch (secondChar) {
            case "b":
                return getEleventh().charAt(0);
            default:
                return getEleventh().concat("#");
        }
    }

    getThirteenth = () => this.getSixth();
    // MAKE MINOR THIRTEENTH MAJOR IN MINOR CHORDS:  C E G Ab  => C E G A
    getMajorThirteenth = () => this.getMajorSixth();
}

// GET OPTIONS FROM DROPDOWN

function getName() {
    const nameSelect = document.getElementById("name");
    let chordName = nameSelect.options[nameSelect.selectedIndex].value;
    return chordName;
}

function getType() {
    const typeSelect = document.getElementById("type");
    let chordType = typeSelect.options[typeSelect.selectedIndex].value;
    return chordType;
}

function getAccidental() {
    const accidentalSelect = document.getElementById("accidental");
    let chordAccidental = accidentalSelect.options[accidentalSelect.selectedIndex].value;
    return chordAccidental;
}

function getOptSixth() {
    const sixthSelect = document.getElementById("sixth");
    let chordSixth = sixthSelect.options[sixthSelect.selectedIndex].value;
    return chordSixth;
}

function getOptSeventh() {
    const seventhSelect = document.getElementById("seventh");
    let chordSeventh = seventhSelect.options[seventhSelect.selectedIndex].value;
    return chordSeventh;
}

function getOptNinth() {
    const ninthSelect = document.getElementById("ninth");
    let chordNinth = ninthSelect.options[ninthSelect.selectedIndex].value;
    return chordNinth;
}

function getOptEleventh() {
    const eleventhSelect = document.getElementById("eleventh");
    let chordEleventh = eleventhSelect.options[eleventhSelect.selectedIndex].value;
    return chordEleventh;
}

function getOptThirteenth() {
    const thirteenthSelect = document.getElementById("thirteenth");
    let chordThirteenth = thirteenthSelect.options[thirteenthSelect.selectedIndex].value;
    return chordThirteenth;
}

function getRegister() {
    const registerSelect = document.getElementById("register");
    let register = registerSelect.options[registerSelect.selectedIndex].value;
    return register;
}

// DISP CHORD NAME BASED OFF OF name, accidental AND type
// CHANGE type VALUE TO SYMBOLS
function displayChordName() {
    const chordNameTypeSpan = document.getElementById("chordNameType");
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
            } else if (getOptEleventh() === "11") {
                typeSymbol = "11";
            } else if (getOptThirteenth() === "13") {
                typeSymbol = "13"
            }
            else {
                typeSymbol = "7";
            }
            break;
        case "augmented" :
            if (getOptSeventh()) {
                typeSymbol = "+7 (7#5)";
            } else {
                typeSymbol = "+";
            }
            break;
        case "diminished" :
            if (getOptSeventh()) {
                typeSymbol = "07";
            } else {
                typeSymbol = "0";
            }
            break;
        case "sus2" :
            typeSymbol = "sus2"
            break;
        case "sus4" :
            typeSymbol = "sus4"
            break;
        case "phrygian" :
            typeSymbol = " sus(b)2"
            break;
        case "lydian" :
            typeSymbol = " sus(#)4"
            break;
        default:
            typeSymbol = "invalid type"
        }

    let type = getType();
    // ADD OPTIONAL 6,7,9,11,13 TO SYMBOL
    let sixthValue = getOptSixth();
    if (sixthValue === "6" && !getOptSeventh()) {
        if (type === "major") {
            typeSymbol += "6";
        } else if (type === "minor") {
            typeSymbol += "6";
        } else {
            console.log("not major or minor, FIX THIS!");
        }
    }

    let seventhValue = getOptSeventh();
    if (seventhValue === "7" && !getOptSixth()) {
        if (type === "major") {
            typeSymbol += "M7";
        } else if (type === "minor") {
            typeSymbol += "7";
        } else {
            console.log("not major or minor, FIX THIS!");
        }
    }
    // 6/7
    if (getOptSixth() && getOptSeventh()) {
        typeSymbol += " 6/7";
    }

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

    let thirteenthValue = getOptThirteenth();
    if (thirteenthValue === "13") {
        if (type === "major") {
            typeSymbol += "M13";
        } else if (type === "minor") {
            typeSymbol += "13";
        } else if (type === "dominant") {
            typeSymbol += "";
        } else {
            console.log("not major or minor, FIX THIS!");
        }
    } else if (thirteenthValue === "add13") {
        if (type === "dominant") {
            typeSymbol = "13";
        } else {
            typeSymbol += " add13";
        }
    }

    chordNameType = `${getName().toUpperCase()}${getAccidental()}${typeSymbol}`;
    chordNameTypeSpan.innerText = chordNameType;
    return chordNameType;
}

// DISP CHORD TONES BASED ON DIATONIC SCALE
function displayChordTones() {
    const chordObj = new Chord(getName(), getAccidental(), getType(), getOptSeventh());
    // this.test FROM CONSTRUCTOR
    console.log(chordObj.test());
    // const c1 = new Chord(getName(), getAccidental(), getType(), getOptSeventh());
    // console.dir(" c1 chordObj: " + c1);

    const chordTonesSpan = document.getElementById("chordTones");
    let chordTones = "";
    let sixthValue = getOptSixth();
    let seventhValue = getOptSeventh();
    let ninthValue = getOptNinth();
    let eleventhValue = getOptEleventh();
    let thirteenthValue = getOptThirteenth();

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
        case "sus2" :
            chordTones = `${chordObj.getRoot()} ${chordObj.getSecond()} ${chordObj.getFifth()}`;
            break;
        case "sus4" :
            chordTones = `${chordObj.getRoot()} ${chordObj.getFourth()} ${chordObj.getFifth()}`;
            break;
        case "phrygian" :
            chordTones = `${chordObj.getRoot()} ${chordObj.getFlatSecond()} ${chordObj.getFifth()}`;
            break;
        case "lydian" :
            chordTones = `${chordObj.getRoot()} ${chordObj.getSharpFourth()} ${chordObj.getFifth()}`;
            break;
        // DEFAULT IS MAJOR OR MINOR
        default:
            chordTones = `${chordObj.getRoot()} ${chordObj.getThird()} ${chordObj.getFifth()}`;
    }
    // DUPICATED CODE let sixthValue = getOptSixth(); DISPLAYCHORDNAME() ALSO USES SAME VARIABLES !!!
    // ADD OPTIONAL 6,7,9,11,13 BASED ON type => chordScale
    
    if (sixthValue === "6") {
        if (getType() === "minor") {
            // MAKE 6TH MAJOR FOR MINOR CHORDS !!!
            chordTones += " " + chordObj.getMajorSixth();
        } else {
            chordTones += " " + chordObj.getSixth();
        }
    }

    if (seventhValue === "7") {
        if (getType() === "dominant") {
            chordTones = chordTones;
        } else if (getType() === "diminished") {
            chordTones += " " + chordObj.getMajorSixth();
        } else if (getType() === "augmented") {
            chordTones += " " + chordObj.getMinorSeventh();
        } else {
            chordTones += " " + chordObj.getSeventh();
        }
    } 

    if (ninthValue === "9") {
        if (getType() === "dominant") {
            chordTones += " " + chordObj.getNinth();
        } else {
            chordTones += " " + chordObj.getSeventh() + " " + chordObj.getNinth();
        }
    } else if (ninthValue === "add9") {
        chordTones += " " + chordObj.getNinth();
    }

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
    } else if (eleventhValue === "11" && getType() === "dominant") {
        chordTones +=  " " + chordObj.getNinth() + " " + chordObj.getEleventh();
    } else if (eleventhValue === "add11" && getType() === "dominant") {
        chordTones += " " + chordObj.getEleventh();
    } 

    if (thirteenthValue === "13" && getType() === "major") {
        chordTones += " " + chordObj.getSeventh() + " " + chordObj.getNinth() + " " + chordObj.getSharpEleventh() + " " + chordObj.getThirteenth();
        // MAJOR 13 WITH MINOR !!!
    } else if (thirteenthValue === "13" && getType() === "minor") {
        chordTones += " " + chordObj.getSeventh() + " " + chordObj.getNinth() + " " + chordObj.getEleventh() + " " + chordObj.getMajorThirteenth();
    } else if (thirteenthValue === "add13" && getType() === "major") {
        chordTones += " " +  chordObj.getThirteenth();
    } else if (thirteenthValue === "add13" && getType() === "minor") {
        chordTones += " " + chordObj.getMajorThirteenth();
    } else if (thirteenthValue === "13" && getType() === "dominant") {
        chordTones +=  " " + chordObj.getNinth() + " " + chordObj.getEleventh() + " " + chordObj.getThirteenth();
    } else if (thirteenthValue === "add13" && getType() === "dominant") {
        chordTones += " " + chordObj.getThirteenth();
    }
    chordTonesSpan.innerText = chordTones;
    return chordTones;
}

// CHORD OBJECT TEST
// const c1 = new Chord("c", "", "major");
// const c2 = new Chord("a#", "major");

// MODELLING SCALES

const circleOfFifths = {
    // NATURAL NOTES
    degrees : ["c", "d", "e", "f", "g", "a", "b"],
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
    let naturalScale = subScale1.concat(subScale2);
    return naturalScale;
}

 // INVALID CHORD MESSAGE WITH HIDDEN CLASS
 const invalidKeyMessage = document.getElementById("invalid-key-message");

// BUILD DIATONIC SCALE (MAJOR OR MINOR)
function getDiatonicScale(name, accidental, type) {  
    let naturalScale = getNaturalScale(name);
    // GET FIRST NOTE OF SCALE
    let firstDegree = naturalScale[0];
    // CONCAT OPTIONAL ACCIDENTAL SO FULL NAME CAN BE USED IN SEARCH
    firstDegree += accidental;
    // EMPTY ARRAY FOR RESULT
    let diatonicScale = [];
    // !!! THESE WORK WITHOUT INITIALISING ???
    // let foundMajorKeys; NOW foundKeyCenters !!!
    // let foundMinorKeys; NOW foundKeyCenters !!!
    // let accidentalNotes = [];
    // let idx;

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
                hideInvalidKeyMessage();
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
                    hideInvalidKeyMessage();
                }
            }

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
            foundKeyCenters = circleOfFifths["minorSharpKeys"];
             idx = foundKeyCenters.indexOf(firstDegree) + 1;
             accidentalNotes = circleOfFifths["sharps"].slice(0, idx);
             for (const el of naturalScale) {
                 if (accidentalNotes.indexOf(el) > -1) {
                     diatonicScale.push(el.concat("#"));
                 } else {
                    diatonicScale.push(el);
                    hideInvalidKeyMessage();
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
                    hideInvalidKeyMessage();
                }
            }
        // IF A NATURAL MINOR
        } else if (name === "a" && accidental === "" && (type === "minor" || type === "diminished")) {
            diatonicScale = naturalScale.slice();
            hideInvalidKeyMessage();
        } else {
            showInvalidKeyMessage();
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

const chordScaleSpan = document.getElementById("chordScale");

function displayChordScale() {
    let scale = getDiatonicScale(getName(), getAccidental(), getType());
    chordScaleSpan.innerText = scale;
}

// PLAY CHORD 

// SHARP-FLAT COMBINED CHROMATIC SCALE E2-B4 
// "s"="sharp" AND "b"="flat"
const chromaticScale = [
    "E1", "FEs1", "FsGb1", "G1", "GsAb1", "A1", "AsBb1", "BCb1", "C2", "CsDb2", "D2", "DsEb2",
    "E2", "FEs2", "FsGb2", "G2", "GsAb2", "A2", "AsBb2", "BCb2", "C3", "CsDb3", "D3", "DsEb3", 
    "E3", "FEs3", "FsGb3", "G3", "GsAb3", "A3", "AsBb3", "BCb3", "C4", "CsDb4", "D4", "DsEb4", 
    "E4", "FEs4", "FsGb4", "G4", "GsAb4", "A4", "AsBb4", "BCb4", "C5", "CsDb5", "D5", "DsEb5", 
    "E5", "FEs5", "FsGb5", "G5", "GsAb5", "A5", "AsBb5", "BCb5", "C6", "CsDb6", "D6"
];

function getChordToneSounds() {
    // SPLIT CHORD NOTES INTO ARRAY ["C", "E", "G", "Bb"]
    const chordNotesArr = displayChordTones().split(" ");
    // !!! REPLACE ALL SPECIAL CHARS "#" WITH "s" FOR SHARP AS HOWLER WILL NOT LOAD MP3'S WITH SPEC CHARACTER IN FILENAME !!! 
    // ["C#", "E#", "G##"]  =>   ["Cs", "Es", "Gss"]
    for (let i = 0; i < chordNotesArr.length; i++) {
        let sharpRe = /#/gi;
        chordNotesArr[i] = chordNotesArr[i].replace(sharpRe , "s");
    }
    console.log(chordNotesArr);
    // EMPTY ARRAY FOR SOUNDS WITH PATHS AND EXTENSION
    const soundsArr = [];
     // KEEP TRACK OF ACTUAL MINIMUM INDEX (OUTSIDE OF LOOP!!!), INITIALISE WITH A VALUE OF 0 AND ACCUMULATE IN INNER LOOP
    let minIdx = 0;
    // THIS IS WHERE LOOP SHOULD START DEPENDING ON SELECTED REGISTER
    let registerIdx = 0;
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
    // console.log(registerIdx);
    // FIND EACH NOTE OF chordNotesArr [C,E,G] IN chromaticScale 
    chordNotesArr.forEach((chordTone) => {
       for (let i = registerIdx; i < chromaticScale.length; i++) {
            if (chordTone.length === 1 && chromaticScale[i].charAt(0) === chordTone && i >= minIdx) {
                soundsArr.push("sounds/" + chromaticScale[i].concat(".mp3"));
                minIdx = i;
                break;
            } else if (chordTone.length === 2 && chromaticScale[i].includes(chordTone ) && i >= minIdx) {
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



// PLAY ACTUAL SOUND FILES AT ONCE
function playChordTones() {
    const soundFiles = getChordToneSounds();
    console.log("soundFiles: " + soundFiles);
    // PLAY ALL NOTES AT ONCE
    for (const soundFile of soundFiles) {
        const sound = new Howl({
            src: [soundFile],
            volume: 0.4
        });
        sound.play();
    }
}

// CREATE A RESPONSIVE DIV FOR EACH CHORD DEGREE 
function displayAndPlay() {
    const soundFiles = getChordToneSounds();
    // NEED ACTUAL NOTE NAMES WITHOUT PATH AND EXTENSION
    const chordTones = displayChordTones().split(" ");
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
        let elem = document.createElement("button");
        // ??? THIS IS NOT WORKING !!!
        // elem.class = "btn";
        // INSTEAD:
        elem.classList.add("btn");
        elem.id = `play-btn${i}`;
        elem.addEventListener('mouseover', () => soundFiles[i].play());
        elem.innerText = `Degree ${i + 1}: ${chordTones[i]}`    
        audioContainer.appendChild(elem);
        // document.body.append(elem);
    })
}

// REFRESH PAGE FOR NEW CHORD
function refreshPage() {
    location.reload();
    // THIS ALSO WORKS
    // location.reload(true);
}
// EVENT HANDLERS ON BUTTONS
function handleShowChordTones() {
    displayChordName();
    displayChordTones();
    displayChordScale();
    enableRegister();
    enablePlayArpNewButtons();
    hideExtensionInstruction();
}
function handlePlayChord() {
    playChordTones();
}
function handlePlayIndividual() {
    displayAndPlay();
}
function handleNewChord() {
    refreshPage();
}

// EVENT LISTENERS ON BUTTONS
const showChordTonesBtn = document.getElementById("chord-tones-btn");
const playButton = document.getElementById("play-chord-btn");
const playIndividualButton = document.getElementById("play-individual-btn");
const newChordButton = document.getElementById("new-chord-btn");

showChordTonesBtn.addEventListener("click", function(evt) {
    evt.preventDefault();
    handleShowChordTones();
})

playButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    handlePlayChord();
})

playIndividualButton.addEventListener("click", function(evt) {
    evt.preventDefault();
    handlePlayIndividual();
})

newChordButton.addEventListener("click", function(evt) {
    handleNewChord();
})

// WHEN PAGE LOADS, ONLY NAME SELECTION IS ENABLED. ENABLE DROPDOWNS IN SEQUENCE: ONCE ONE IS SELECTED, ENABLE NEXT THEN ATER TYPE IS SELECTED, ENABLE ALL EXTENSIONS 6, 7, 9, 11, 13

// INITIALISE VARS TO TRACK WHAT'S SELECTED AS NAME AND ACCIDENTAL
let nameChangeVal;
let accidentalChangeVal;

// SELECT PARAGRAPHS TO SHOW / HIDE INSTRUCTIONS
const nameInstruction = document.getElementById("name-instruction");
const accidentalInstruction = document.getElementById("accidental-instruction");
const typeInstruction = document.getElementById("type-instruction");
const extensionInstruction = document.getElementById("extension-instruction");

// BOOLEANS
let isNameSelected = false;
// NOT USED
// let isAccidentalSelected = false;
// NOT USED
// let isTypeSelected = false;

// EVENT LISTENERS ON NAME/ACCIDENTAL/TYPE DROPDOWN OPTIONS:

// GET SELECTED NAME, ENABLE ACCIDENTAL OPTIONS, SHOW INSTR ONCE NAME IS SELECTED
function getNameChange() {
    const nameDropdown = document.getElementById("name");
    nameDropdown.addEventListener('change', function() {
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
}
getNameChange();

let isImpossibleKey = false;

// GET SELECTED ACCIDENTAL, ENABLE TYPE OPTIONS, SHOW INSTR ONCE ACCIDENTAL IS SELECTED
function getAccidentalChange() {
    const accidentalDropdown = document.getElementById("accidental");
    accidentalDropdown.addEventListener('change', function() {
    accidentalChangeVal = this.value;

    isImpossibleKey = ((nameChangeVal === "b" && accidentalChangeVal ===  "#") ||
    (nameChangeVal === "e" && accidentalChangeVal ===  "#") ||
    (nameChangeVal === "f" && accidentalChangeVal ===  "b"));
    console.log(isImpossibleKey);

    typeEnable();
    if (!accidentalInstruction.classList.contains("hidden") && accidentalOptions.selectedIndex > 0) {
        hideAccidentalInstruction();
    } 
    hideAccidentalInstruction();
    // showTypeInstruction();
    if (isImpossibleKey) {
        showAccidentalInstruction();
        hideTypeInstruction
    }
    // showTypeInstruction();
    }, false);
}
getAccidentalChange();

// GET SELECTED TYPE, ENABLE EXTENSIONS 6, 7, 9, 11, 13 , SHOW INSTR
function getTypeChange() {
    const typeDropdown = document.getElementById("type");
    typeDropdown.addEventListener('change', function() {
    getTypeChangeVal = this.value;
    enableExtensionOptions();
    hideTypeInstruction();
    showExtensionInstruction();
    enableShowChordButton();
    }, false);
}
getTypeChange();

// arraySelects[i].options[selectedOption].disabled = true;

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
function accidentalDisable() {
    accidentalOptions.options[0].disabled = true;
    naturalOpt.disabled = true;
    sharpOpt.disabled = true;
    flatOpt.disabled = true;
}

// ONLY ENABLE POSSIBLE ACCIDENTALS
function accidentalEnable() {
    switch (nameChangeVal) {
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

function typeDisable() {
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
function disableBSharpTypes() {
    showInvalidKeyMessage();
}

// NO MINOR IN Db
function enableDFlatTypes() {
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
function enableDSharpTypes() {
    minorOpt.disabled = false;
    // augmentedOpt.disabled = false;
    diminishedOpt.disabled = false;
    susTwoOpt.disabled = false;
    susFourOpt.disabled = false;
    phrygianOpt.disabled = false;
    lydianOpt.disabled = false;
}

// NO KEY IN E#
function disableESharpTypes() {
    showInvalidKeyMessage();
}

// NO KEY IN Fb
function disableFFlatTypes() {
    showInvalidKeyMessage();
}

// NO MINOR IN Gb
function enableGFlatTypes() {
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
function enableGSharpTypes() {
    minorOpt.disabled = false;
    // augmentedOpt.disabled = false;
    diminishedOpt.disabled = false;
    susTwoOpt.disabled = false;
    susFourOpt.disabled = false;
    phrygianOpt.disabled = false;
    lydianOpt.disabled = false;
}

// NO MAJOR IN A#
function enableASharpTypes() {
    minorOpt.disabled = false;
    // augmentedOpt.disabled = false;
    diminishedOpt.disabled = false;
    susTwoOpt.disabled = false;
    susFourOpt.disabled = false;
    phrygianOpt.disabled = false;
    lydianOpt.disabled = false;    
}

// NO MINOR IN Cb
function enableCFlatTypes() {
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
function enableAllTypes() {
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
function typeEnable() {
    
    if (nameChangeVal=== "b" && accidentalChangeVal === "#") {
        disableBSharpTypes();
    }
     else if (nameChangeVal=== "d" && accidentalChangeVal === "b") {
        enableDFlatTypes();
    }
     else if (nameChangeVal=== "d" && accidentalChangeVal === "#") {
        enableDSharpTypes()
    }
     else if (nameChangeVal=== "e" && accidentalChangeVal === "#") {
        disableESharpTypes();
    }
     else if (nameChangeVal=== "f" && accidentalChangeVal === "b") {
        disableFFlatTypes();
    }
     else if (nameChangeVal=== "g" && accidentalChangeVal === "b") {
        enableGFlatTypes();
    }
     else if (nameChangeVal=== "g" && accidentalChangeVal === "#") {
        enableGSharpTypes();
    }
     else if (nameChangeVal=== "a" && accidentalChangeVal === "#") {
        enableASharpTypes();
    } 
    else if (nameChangeVal=== "c" && accidentalChangeVal === "b") {
        enableCFlatTypes();
    // ENABLE ALL TYPES
    }
     else {
        enableAllTypes();
    }
}


function showInvalidKeyMessage() {
    invalidKeyMessage.classList.remove("hidden");
}

function hideInvalidKeyMessage() {
    invalidKeyMessage.classList.add("hidden");
}

function hideNameInstruction() {
    nameInstruction.classList.add("hidden");
}

function showAccidentalInstruction() {
    accidentalInstruction.classList.remove("hidden");
}

function hideAccidentalInstruction() {
    accidentalInstruction.classList.add("hidden");
}

function showTypeInstruction() {
    typeInstruction.classList.remove("hidden");
}

function hideTypeInstruction() {
    typeInstruction.classList.add("hidden");
}

function showExtensionInstruction() {
    extensionInstruction.classList.remove("hidden");
}

function hideExtensionInstruction() {
    extensionInstruction.classList.add("hidden");
}


function sixthDisable() {
    sixthOptions.options[0].disabled = true;
    sixthOpt.disabled = true;
}

function sixthEnable() {
    sixthOptions.options[0].disabled = false;
    sixthOpt.disabled = false;
}
function seventhDisable() {
    seventhOptions.options[0].disabled = true;
    seventhOpt.disabled = true;
}

function seventhEnable() {
    seventhOptions.options[0].disabled = false;
    seventhOpt.disabled =false;
}

function ninthDisable() {
    ninthOptions.options[0].disabled = true;
    ninthOpt.disabled = true;
    addNinthOpt.disabled = true;
}

function ninthEnable() {
    ninthOptions.options[0].disabled = false;
    ninthOpt.disabled =false;
    addNinthOpt.disabled = false;
}

function eleventhDisable() {
    eleventhOptions.options[0].disabled = true;
    eleventhOpt.disabled = true;
    addEleventhOpt.disabled = true;
}

function eleventhEnable() {
    eleventhOptions.options[0].disabled = false;
    eleventhOpt.disabled = false;
    addEleventhOpt.disabled = false;
}

function thirteenthDisable() {
    thirteenthOptions.options[0].disabled = true;
    thirteenthOpt.disabled = true;
    addThirteenthOpt.disabled = true;
}

function thirteenthEnable() {
    thirteenthOptions.options[0].disabled = false;
    thirteenthOpt.disabled = false;
    addThirteenthOpt.disabled = false;
}

function enablePlayArpNewButtons() {
    playButton.disabled = false;
    playIndividualButton.disabled = false;
    newChordButton.disabled = false;
}

function enableRegister() {
    // guitarOpt IS NOT DISABLED BY DEFAULT
    // guitarOpt.disabled = false;
    bassOpt.disabled = false;
    guitarUpOpt.disabled = false;
}

function enableShowChordButton() {
    showChordTonesBtn.disabled = false;
}
// DISABLE ALL
function disableSelectOptions() {
    accidentalDisable();
    typeDisable();
    sixthDisable();
    seventhDisable();
    ninthDisable();
    eleventhDisable();
    thirteenthDisable();
}

// ENABLE 6, 7, 9, 11, 13 OPTIONS
function enableExtensionOptions() {
    sixthEnable();
    seventhEnable();
    ninthEnable();
    eleventhEnable();
    thirteenthEnable();
}

// PLAY INTRO WHEN PAGE LOADS
function playIntro() {
     const sound = new Howl({
        src: ['sounds/intro2.mp3']
      });
      sound.play();
}

window.addEventListener("load", function() {
    console.log("page is loaded");
        // playIntro();
        disableSelectOptions();
      });
