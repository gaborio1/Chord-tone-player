export class Chord {
  constructor(
    name,
    accidental,
    type,
    optSixth = '',
    optSeventh = '',
    optNinth = '',
    optEleventh = '',
    optThirteenth = ''
  ) {
    this.name = name
    this.accidental = accidental
    this.type = type
    this.optSixth = optSixth
    this.optSeventh = optSeventh
    this.optNinth = optNinth
    this.optEleventh = optEleventh
    this.optThirteenth = optThirteenth
    // this.root = getRoot();
    // this.sixthSeventh = this.sixthSeventh;
    this.test = function () {
      const {
        name,
        type,
        getRoot,
        getThird,
        getFifth,
        getMinorSeventh,
        optSeventh,
      } = this
      // console.log(`Hello from: ${name}${accidental} ${type}, my notes: ${getRoot()}, ${getThird()}, ${getFifth()}`);
      return `Hello from: ${name}${accidental} ${type} ${optSeventh}, my notes: ${getRoot()}, ${getThird()}, ${getFifth()}, ${this.getSeventh()}`
    }
  }
  // FIND AND RETURN APPROPRIATE SCALE DEGREE FROM DIATONIC SCALE
  getRoot = () => getDiatonicScale(this.name, this.accidental, this.type)[0]
  getFlatSecond = () => {
    const { getSecond } = this
    // IF second HAS A SECOND CHAR "#", ONLY RETURN THE FIRST CHAR (LETTER NAME)
    let secondChar = getSecond().charAt(1)
    switch (secondChar) {
      case '#':
        return getSecond().charAt(0)
      default:
        return getSecond().concat('b')
    }
  }

  getSecond = () => getDiatonicScale(this.name, this.accidental, this.type)[1]
  getThird = () => getDiatonicScale(this.name, this.accidental, this.type)[2]
  getFourth = () => getDiatonicScale(this.name, this.accidental, this.type)[3]

  getSharpFourth = () => {
    const { getFourth } = this
    let secondChar = getFourth().charAt(1)
    switch (secondChar) {
      case 'b':
        return getFourth().charAt(0)
      default:
        return getFourth().concat('#')
    }
  }

  getFlatFifth = () => {
    const { getFifth } = this
    let secondChar = getFifth().charAt(1)
    switch (secondChar) {
      case '#':
        return getFifth().charAt(0)
      default:
        return getFifth().concat('b')
    }
  }

  getFifth = () => getDiatonicScale(this.name, this.accidental, this.type)[4]

  getSharpFifth = () => {
    const { getFifth } = this
    let secondChar = getFifth().charAt(1)
    switch (secondChar) {
      case 'b':
        return getFifth().charAt(0)
      default:
        return getFifth().concat('#')
    }
  }

  // MINOR6 IN MINOR AND MAJOR6 IN MAJOR !!!
  getSixth = () => getDiatonicScale(this.name, this.accidental, this.type)[5]

  // MAKE MINOR SIXTH MAJOR IN MINOR CHORDS:  C E G Ab  => C E G A
  getMajorSixth = () => {
    const { getSixth } = this
    let secondChar = getSixth().charAt(1)
    switch (secondChar) {
      case 'b':
        return getSixth().charAt(0)
      default:
        return getSixth().concat('#')
    }
  }

  getMinorSeventh = () => {
    const { getSeventh } = this
    let secondChar = getSeventh().charAt(1)
    switch (secondChar) {
      case '#':
        return getSeventh().charAt(0)
      default:
        return getSeventh().concat('b')
    }
  }

  getSeventh = () => getDiatonicScale(this.name, this.accidental, this.type)[6]
  getNinth = () => this.getSecond()
  getEleventh = () => this.getFourth()
  getSharpEleventh = () => {
    const { getEleventh } = this
    let secondChar = getEleventh().charAt(1)
    switch (secondChar) {
      case 'b':
        return getEleventh().charAt(0)
      default:
        return getEleventh().concat('#')
    }
  }

  getThirteenth = () => this.getSixth()
  // MAKE MINOR THIRTEENTH MAJOR IN MINOR CHORDS:  C E G Ab  => C E G A
  getMajorThirteenth = () => this.getMajorSixth()
}
