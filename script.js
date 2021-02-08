console.log('connected');

class Chord {
    constructor(name, accidental, type, optSixth = "", optSeventh = "", optNinth = "") {
        this.name = name;
        this.accidental = accidental;
        this.type = type;
        this.optSixth = optSixth;
        this.optSeventh = optSeventh;
        this.optNinth = optNinth;
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
function getOptninth() {
    const ninthSelect = document.getElementById("ninth");
    let chordNinth = ninthSelect.options[ninthSelect.selectedIndex].value;
    return chordNinth;
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
            if (getOptninth() === "9" || getOptninth() === "add9") {
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
    let ninthValue = getOptninth();
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
    chordNameType = `${getName().toUpperCase()}${getAccidental()}${typeSymbol}`;
    document.getElementById("chordNameType").innerText = chordNameType;
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
    let ninthValue = getOptninth();
    if (ninthValue === "9") {
        chordTones += " " + chordObj.getSeventh() + " " + chordObj.getNinth();
    } else if (ninthValue === "add9") {
        chordTones += " " + chordObj.getNinth();
    }
    chordTonesDisplay.innerText = chordTones;
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


// HOWLER JS AUDIO TEST PLAYS WAV FILE
const sound = new Howl({
    src: ['sounds/soundTest.wav']
  });

function soundTest() {
    console.log("sound!");
    console.log(sound);
    sound.play();
}

