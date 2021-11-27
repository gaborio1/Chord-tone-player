Audio production software used in this program:
    Apple Logic Pro v10.6.1
        Built-in sampler preset: Steel string acoustic
        Dynamics: Compressor, Channel EQ
        Reverb: ChromaVerb

functions to add:
  dynamically enable / disable extensions based on other extensions ( for example, add9add13 )
  add alterations



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
    augmented with optional 7th ??
  IN PROGRESS: fix double sharp in augmented C# E# G##
  IN PROGRESS: fix double flat in diminished Eb Gb Bbb
   REFACTOR disable select options for impossible key signatures 

