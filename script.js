
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

    // THIS WILL BE MAJOR SIXTH IN MAJOR SCALE AND MINOR SIXTH IN MINOR SCALE !!!
    getThirteenth = () => this.getSixth();

    // FORCE MINOR THIRTEENTH TO BE MAJOR IN MINOR CHORDS:  C E G Ab  => C E G A   !!!
    // THIS IS BECAUSE THIRTEENTH IS SAME AS SIXTH AND MINOR CHORDSCALE HAS A MINOR SIXTH
    forceMajorThirteenth = () => this.getMajorSixth();
}

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

const getOptSixth  = () => {
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

// CONSTRUCT BASE TRIAD / DOMINANT(7) SYMBOL, BASED ON name, accidetal and type ( sus2, aug, 7 etc ) FOR addExtensionToBaseTypeSymbol() 
const buildBaseTypeSymbol = () => {

    let baseTypeSymbol;
    let type = getType();
    switch (type) {
        case "major" :
            baseTypeSymbol = "";
            break;
        case "minor" :
            baseTypeSymbol = "m";
            break;
        case "dominant" :
            if (getOptNinth() === "9" || getOptNinth() === "add9") {
                baseTypeSymbol = "9";
            } else if (getOptEleventh() === "11") {
                baseTypeSymbol = "11";
            } else if (getOptThirteenth() === "13") {
                baseTypeSymbol = "13"
            }
            else {
                baseTypeSymbol = "7";
            }
            break;
        case "augmented" :
            if (getOptSeventh()) {
                baseTypeSymbol = "+7 (7#5)";
            } else {
                baseTypeSymbol = "+";
            }
            break;
        case "diminished" :
            if (getOptSeventh()) {
                baseTypeSymbol = "07";
            } else {
                baseTypeSymbol = "0";
            }
            break;
        case "sus2" :
            baseTypeSymbol = "sus2"
            break;
        case "sus4" :
            baseTypeSymbol = "sus4"
            break;
        case "phrygian" :
            baseTypeSymbol = " sus(b)2"
            break;
        case "lydian" :
            baseTypeSymbol = " sus(#)4"
            break;
        default:
            baseTypeSymbol = "invalid type"
        }
    return baseTypeSymbol;

}

// OPTIONALLY ADD EXTENSIONS TO BASE SYMBOL ( C => Cadd9 ) FOR displayFullChordName()
const addExtensionToBaseChordSymbol = () => {

    const type = getType();
    const sixthValue = getOptSixth();
    const seventhValue = getOptSeventh();
    const ninthValue = getOptNinth();
    const eleventhValue = getOptEleventh();
    const thirteenthValue = getOptThirteenth();

    fullSymbol = buildBaseTypeSymbol();

    // ADD OPTIONAL 6,7,9,11,13 TO SYMBOL
    if (sixthValue && !seventhValue) {
        console.log("hello");
        if (type === "major") {
            fullSymbol += "6";
        } else if (type === "minor") {
            fullSymbol += "6";
        } else if (type === "dominant") {
            fullSymbol += "/6";
        }
    }

    if (seventhValue && !sixthValue) {
        if (type === "major") {
            fullSymbol += "M7";
        } else if (type === "minor") {
            fullSymbol += "7";
        } else {
            console.log("another type you have to fix");
        }
    }

    // 6/7
    if (sixthValue && seventhValue) {
        if (type === "minor") {
            fullSymbol += "7/6";
        } else if (type === "major") {
            fullSymbol += "M7/6"
        } else {
            console.log("another type you have to fix")
        }
    }

    if (ninthValue === "9") {
        if (type === "major") {
            if (sixthValue) {
                fullSymbol = "M9/6"
            } else {
                fullSymbol = "M9";
            }
        } else if (type === "minor") {
            if (sixthValue) {
                fullSymbol = "m9/6"
            } else {
                fullSymbol += "9";
            }
            
        } else if (type === "dominant") {
            fullSymbol += "";
        } else {
            console.log("another type you have to fix");
        }
    } 
    
    else if (ninthValue === "add9") {
        if (type === "dominant") {
            if (sixthValue) {
                console.log("dom9 = dom add9 !!!");
            } else {
                fullSymbol = "9";
            }
        } else {
            fullSymbol += " add9";
        }
    }

    if (eleventhValue === "11") {
        if (type === "major") {
            fullSymbol += "M11";
        } else if (type === "minor") {
            fullSymbol += "11";
        } else if (type === "dominant") {
            fullSymbol += "";
        } else {
            console.log("another type you have to fix");
        }

    } else if (eleventhValue === "add11") {
        if (type === "dominant") {
            fullSymbol = "11";
        } else {
            fullSymbol += " add11";
        }
    }

    if (thirteenthValue === "13") {
        if (type === "major") {
            fullSymbol += "M13";
        } else if (type === "minor") {
            fullSymbol += "13";
        } else if (type === "dominant") {
            fullSymbol += "";
        } else {
            console.log("another type you have to fix");
        }

    } else if (thirteenthValue === "add13") {
        if (type === "dominant") {
            fullSymbol = "13";
        } else {
            fullSymbol += " add13";
        }
    }
    return fullSymbol;

}

// CAPITALISE LETTER NAME, ADD ACCIDENTAL AND TYPE SYMBOL ( c => C + # + m9 ==> Cm9 ) FOR DISPLAYFULLCHORDNAME()
const buildFullChordName = () => {
    fullSymbol = addExtensionToBaseChordSymbol();
    let fullChordName;
    fullChordName = `${getName().toUpperCase()}${getAccidental()}${fullSymbol}`;
    return fullChordName;
}

// SEQUENCE OF BUILDING AND DISPLAYING FULL CHORD NAME:
// buildBaseTypeSymbol() => addExtensionToBaseChordSymbol() => buildFullChordName() => displayFullChordName()
const displayFullChordName = () => {
    const fullChordNameSpan = document.getElementById("full-chord-name");
    fullChordNameSpan.innerText = buildFullChordName();
}

const buildChordTones = () => {
    // MAKE NEW CHORD AND USE ITS METHODS TO RETRIEVE ITS NOTES BASED OFF OF ITS CHORD SCALE
    const chordObj = new Chord(getName(), getAccidental(), getType(), getOptSeventh());
    // this.test FROM CONSTRUCTOR
    console.log(chordObj.test());

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
    const majorThirteenth = chordObj.forceMajorThirteenth();

    switch (type) {
        case "diminished" :
            // chordTones = `${chordObj.getRoot()} ${chordObj.getThird()} ${chordObj.getFlatFifth()}`;
            chordTones = `${root} ${third} ${fifth}`;
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



// DISPLAY CHORD TONES 
const displayChordTones = () => {
   const chordTonesSpan = document.getElementById("chord-tones");
    chordTones = buildChordTones();
    chordTonesSpan.innerText = buildChordTones();
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
const getNaturalScale = (name) => {
    let tonic = name;
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
const getDiatonicScale = (name, accidental, type) => {  
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
    // UPPERCASE NOTE LETTER NAMES BUT NOT THE ACCIDENTAL
    const result = diatonicScale.map(note => note.charAt(0).toUpperCase() + note.slice(1));

    return result;
}


// GET AND DISPLAY DIATONIC SCALE 
const displayChordScale = () => {
    const chordScaleSpan = document.getElementById("chord-scale");
    const scale = getDiatonicScale(getName(), getAccidental(), getType());
    chordScaleSpan.innerText = scale;
}



// PLAY CHORD 

// SHARP-FLAT COMBINED CHROMATIC SCALE E2-B4 
// "s"="sharp" AND "b"="flat"
const soundNames = [
    "E1", "FEs1", "FsGb1", "GFss1", "GsAb1", "AGssBbb1", "AsBb1", "BCb1", "C2", "CsDb2", "DCssEbb2", "DsEb2",
    "E2", "FEs2", "FsGb2", "GFss2", "GsAb2", "AGssBbb2", "AsBb2", "BCb2", "C3", "CsDb3", "DCssEbb3", "DsEb3", 
    "E3", "FEs3", "FsGb3", "GFss3", "GsAb3", "AGssBbb3", "AsBb3", "BCb3", "C4", "CsDb4", "DCssEbb4", "DsEb4", 
    "E4", "FEs4", "FsGb4", "GFss4", "GsAb4", "AGssBbb4", "AsBb4", "BCb4", "C5", "CsDb5", "DCssEbb5", "DsEb5", 
    "E5", "FEs5", "FsGb5", "GFss5", "GsAb5", "AGssBbb5", "AsBb5", "BCb5", "C6", "CsDb6", "DCssEbb6"
];

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
            let condC = i >= minIdx;
            let condD = chordTone.length === 2;
            let condE = soundNames[i].includes(chordTone);
            let condF = soundNames[i].length < 8;
            let condG = chordTone.length === 3;
            let condH = (soundNames[i].indexOf(chordTone) === 0 || soundNames[i].indexOf(chordTone) === 2);
            // chordTone.length = 1    (  "F" )
            if (condA && condB && condC) {
                soundsArr.push("sounds/" + soundNames[i].concat(".mp3"));
                minIdx = i;
                break;
            // chordTone.length = 2    ( F#" )
            } else if (condC && condD && condE && condF & condH) {
                soundsArr.push("sounds/" + soundNames[i].concat(".mp3"));
                minIdx = i;
                break;
            // chordTone.length = 3 "   ( F##" )
            } else if (condC && condE && condG) {
                soundsArr.push("sounds/" + soundNames[i].concat(".mp3"));
                minIdx = i;
                break;
            }
        }
        return minIdx;
    })
    console.log("soundsArr updated octave: " + soundsArr);
    return soundsArr;

}

// PLAY CHORD NOTES TOGETHER ( PLAY CHORD BUTTON )
const playChordTones = (arr) => {
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

// PLAY CHORD NOTES IN SEQUENCE ( ARPEGGIO BUTTON )
const arpeggiateChord = () => {

    const soundFiles = getChordToneSounds();
    setTimeout(() => {
        const sound = new Howl({
            src: [soundFiles[0]],
            volume: 0.3
        });
        sound.play();
    }, 500)
    setTimeout(() => {
        const sound = new Howl({
            src: [soundFiles[1]],
            volume: 0.33
        });
        sound.play();
    }, 700)
    setTimeout(() => {
        const sound = new Howl({
            src: [soundFiles[2]],
            volume: 0.36
        });
        sound.play();
    }, 900)
    setTimeout(() => {
        const sound = new Howl({
            src: [soundFiles[3]],
            volume: 0.39
        });
        sound.play();
    }, 1100)
    setTimeout(() => {
        const sound = new Howl({
            src: [soundFiles[4]],
            volume: 0.42
        });
        sound.play();
    }, 1300)
    setTimeout(() => {
        const sound = new Howl({
            src: [soundFiles[5]],
            volume: 0.45
        });
        sound.play();
    }, 1500)
    setTimeout(() => {
        const sound = new Howl({
            src: [soundFiles[6]],
            volume: 0.48
        });
        sound.play();
    }, 1700)

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
}

const handlePlayChord = () => {
    playChordTones(getChordToneSounds());
}

const handleArpeggiate = () => {
    arpeggiateChord();
}

const handlePlayIndividual = () => {
    makeSoundDivs();
}

const handleNewChord = () => {
    refreshPage();
}

// EVENT LISTENERS ON BUTTONS
const showChordTonesButton = document.getElementById("chord-tones-btn");
const playButton = document.getElementById("play-chord-btn");
const arpeggiateButton = document.getElementById("arpeggiate-chord-btn");
const playIndividualButton = document.getElementById("play-individual-btn");
const newChordButton = document.getElementById("new-chord-btn");

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

// WHEN PAGE LOADS, ONLY NAME SELECTION IS ENABLED. ENABLE DROPDOWNS IN SEQUENCE: ONCE ONE IS SELECTED, ENABLE NEXT THEN ATER TYPE IS SELECTED, ENABLE EXTENSIONS 6, 7, 9, 11, 13

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
const getNameChange = () => {
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
const getAccidentalChange = () => {
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
            // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            hideTypeInstruction();
        }
        showTypeInstruction();
    }, false);
}
getAccidentalChange();

// GET SELECTED TYPE, ENABLE EXTENSIONS 6, 7, 9, 11, 13 , SHOW INSTR
const getTypeChange = () => {
    const typeDropdown = document.getElementById("type");
    typeDropdown.addEventListener('change', function() {
        typeChangeVal = this.value;
        enableExtensionOptions(typeChangeVal);
        hideTypeInstruction();
        showExtensionInstruction();
        enableShowChordButton();
        // ENABLE SHOW CHORD BUTTON 
        showChordTonesButton.classList.add("animated-btn");
        addListenerShowChordButton()
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
const accidentalDisable = () => {
    accidentalOptions.options[0].disabled = true;
    naturalOpt.disabled = true;
    sharpOpt.disabled = true;
    flatOpt.disabled = true;
}

// ONLY ENABLE POSSIBLE ACCIDENTALS
const accidentalEnable = () => {
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
        
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // THESE 2 WORK FINE:
    // newChordButton.classList.remove("pre-animation-btn");
    // playButton.classList.remove("pre-animation-btn");

    // // ??????   THESE 2 DON'T WORK ???????

    // arpeggiateButton.classlist.remove("pre-animation-btn");
    // playIndividualButton.classlist.remove("pre-animation-btn");
   
    // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    // !!!!!    classlist.remove WORKS WITH A LOOP WTF???   !!!!!
    elements = document.querySelectorAll(".enabled-with-show-btn");
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
            src: ['sounds/intro2.mp3']
          });
          sound.play();      
    }, 600)
}

window.addEventListener("load", function() {
    console.log("page is loaded");
        // playIntro();
    disableSelectOptions();
    setTimeout(() => {
        showNameInstruction();
    }, 2000)
});
