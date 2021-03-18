// MODELLING CHORDS

import getDiatonicScale from "../utils/buildScale.js";

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
        
        this.root = this.getRoot();
        this.flatSecond = this.getFlatSecond();
        this.second = this.getSecond();
        this.third = this.getThird();
        this.fourth = this.getFourth();
        this.sharpFourth = this.getSharpFourth();
        this.flatFifth = this.getFlatFifth();
        this.fifth = this.getFifth();
        this.sharpFifth = this.getSharpFifth();
        this.sixth = this.getSixth();
        this.majorSixth = this.getMajorSixth();
        this.minorSeventh = this.getMinorSeventh();
        this.seventh = this.getSeventh();
        this.ninth = this.getNinth();
        this.eleventh = this.getEleventh();
        this.sharpEleventh = this.getSharpEleventh();
        this.thirteenth = this.getThirteenth();
        this.forcedMajorThirteenth = this.forceMajorThirteenth();

        this.test = function() {
            const {name, type, getRoot, getThird, getFifth, optSixth, optSeventh, optNinth, optEleventh, optThirteenth} = this;
            // console.log(`Hello from: ${name}${accidental} ${type}, my notes: ${getRoot()}, ${getThird()}, ${getFifth()}`);
            return `Hello from: ${name}${accidental} ${type} ${optSixth} ${optSeventh} ${optNinth} ${optEleventh} ${optThirteenth}, my notes: ${getRoot()}, ${getThird()}, ${getFifth()}`;
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

export default Chord;