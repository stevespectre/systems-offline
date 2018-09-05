import TinyMusic from './tiny-music';

export default class Music {
    playMusic() {
        // create the audio context
        this.ac = typeof AudioContext !== 'undefined' ? new AudioContext : new webkitAudioContext,
        //this.convolver = this.ac.createConvolver();
        //this.concertHallBuffer;
        // get the current Web Audio timestamp (this is when playback should begin)
       this. when = this.ac.currentTime;
        // set the tempo
            this.tempo = 60;
        // initialize some vars
            this.sequence1;
            this.sequence3;
            this.sequence4;
        // create an array of "note strings" that can be passed to a sequence
            this.lead = [
                'G4 q',
                'E4 w',
                'G4 q',//1.5

                'A3 w',
                'C4 q',//1.25

                'G3 w'
            ];
            this.bass = [
                'C1 w',
                'C1 h',//1.5

                'F1 w',
                'F1 q',//1.25

                'C1 w'
            ];
            this.bass2 = [
                'C2 w',
                'C2 h',//1.5

                'F2 w',
                'F2 q',//1.25

                'C2 w'
            ];

// create 3 new sequences (one for this.lead, one for harmony, one for this.bass)
        this.sequence1 = new TinyMusic.Sequence( this.ac, this.tempo, this.lead );
        this.sequence3 = new TinyMusic.Sequence( this.ac, this.tempo, this.bass );
        this.sequence4 = new TinyMusic.Sequence( this.ac, this.tempo, this.bass2 );

// set staccato and smoothing values for maximum coolness
        this.sequence1.staccato = 0.55;
        this.sequence3.staccato = 0.05;
        this.sequence3.smoothing = 0.4;
        this.sequence4.staccato = 0.05;
        this.sequence4.smoothing = 0.4;

// adjust the levels so the this.bass and harmony aren't too loud
        this.sequence1.gain.gain.value = 1.0 / 2;
        this.sequence3.gain.gain.value = 0.65 / 2;
        this.sequence4.gain.gain.value = 0.65 / 2;

// apply EQ settings
        this.sequence1.mid.frequency.value = 800;
        this.sequence1.mid.gain.value = 3;
        this.sequence3.mid.gain.value = 3;
        this.sequence3.bass.gain.value = 6;
        this.sequence3.bass.frequency.value = 80;
        this.sequence3.mid.gain.value = -6;
        this.sequence3.mid.frequency.value = 500;
        this.sequence3.treble.gain.value = -2;
        this.sequence3.treble.frequency.value = 1400;
        this.sequence3.mid.gain.value = 3;
        this.sequence4.bass.gain.value = 6;
        this.sequence4.bass.frequency.value = 80;
        this.sequence4.mid.gain.value = -6;
        this.sequence4.mid.frequency.value = 500;
        this.sequence4.treble.gain.value = -2;
        this.sequence4.treble.frequency.value = 1400;


        // this.convolver.buffer = concertHallBuffer;
// play
        this.when = this.ac.currentTime;
        //start the this.lead part immediately
        this.sequence1.play( this.when );
        // delay the harmony by 16 beats
        // start the this.bass part immediately
        this.sequence3.play( this.when );
        this.sequence4.play( this.when );
// pause
        /*document.querySelector('#stop').addEventListener('click', function() {
            this.sequence1.stop();
            this.sequence3.stop();
            this.sequence4.stop();
        }, false );*/
        //this.ac.createBufferSource();
        //this.convolver.buffer = concertHallBuffer;
    }

    play() {

    }
}
