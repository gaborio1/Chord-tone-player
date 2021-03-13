Audio production software used in this program:
    Apple Logic Pro v10.6.1
        Built-in sampler preset: Steel string acoustic
        Dynamics: Compressor, Channel EQ
        Reverb: ChromaVerb

functions to add:
 ✔️ add instructions
 ✔️ play some sound when page loads
 ✔️ transpose option
 ✔️ arpeggiate chords
 ✔️ individually display and play chord notes
 ✔️ sus2
 ✔️ sus4
 ✔️ phrygian
 ✔️ lydian
 ✔️ "new chord" button to reset / clear dropdowns
 ✔️ dinamically show and hide options/buttons based on selections made
 ✔️ animate buttons :hover
 ✔️ animate cards, sidebar (slide in)
 ✔️ add icons
 ✔️ tablet size
 ✔️ mobile size
 ✔️ add colour theme button in large size

  customise dropdown!
 ✔️ dynamically enable / disable extensions based on type selected! ( for example, disable 11 with sus2 )
  dynamically enable / disable extensions based on other extensions ( for example, add9add13 )
  add alterations

 refactor:
✔️ BEM naming convention 
✔️ no ID selectors in CSS


bugs:
  DUE TO THE LARGE NUMBER OF POSSIBLE COMBINATIONS BOTH IN CHORD TONES AND CHORD NAMES,
  SOME OF THE LESS FREQUENTLY USED CHORD NAMES ARE NOT HANDLED PROPERLY AT THIS MOMENT.
  HOWEVER, CHORD TONES ARE DISPLAYED CORRECTLY IN EVERY CHORD.

  ✔️ LIST OF CHORD NAMES THAT HAS BEEN FIXED SO FAR:
      M7/6  m7/6  7/6 
      +7  07
      M9/6  m9/6  9/6
      6add9 m6add9   
      add9 madd9 

  C7/6: 6th plays same pitch as 7th
  make add13 an octave higher than 6

  ✔️ if chordTone.length = 2 make sure chordTone is at idx 0 || 2
  ✔️ remove existing chord degree divs before appending new ones 
    augmented with optional 7th ???
  ✔️ diminished 7 - make 7th = major 6th 
  ✔️ dominant(7) 9 get rid of 7th
  ✔️ dominant(7) 7 chord name/chord tones C E G Bb B, GET RID OF B
  ✔️ dominant(7) 11 chord name/chord tones 
  ✔️  dominant(7) 13 chord name/chord tones 
  ✔️ make minor6 6th major6th and 13th major13th
  IN PROGRESS: fix double sharp in augmented C# E# G##
  IN PROGRESS: fix double flat in diminished Eb Gb Bbb
   REFACTOR disable select options for impossible key signatures 

