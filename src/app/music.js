import TinyMusic from './tiny-music';

export default class Music {
    playMusic() {
        // create the audio context
        var ac = typeof AudioContext !== 'undefined' ? new AudioContext : new webkitAudioContext,
        // get the current Web Audio timestamp (this is when playback should begin)
            when = ac.currentTime,
        // set the tempo
            tempo = 60,
        // initialize some vars
            sequence1,
            sequence3,
            sequence4,
        // create an array of "note strings" that can be passed to a sequence
            lead = [
                'G4 q',
                'E4 w',
                'G4 q',//1.5

                'A3 w',
                'C4 q',//1.25

                'G3 w'
            ],
            bass = [
                'C1 w',
                'C1 h',//1.5

                'F1 w',
                'F1 q',//1.25

                'C1 w',
            ],
            bass2 = [
                'C2 w',
                'C2 h',//1.5

                'F2 w',
                'F2 q',//1.25

                'C2 w',
            ];

// create 3 new sequences (one for lead, one for harmony, one for bass)
        sequence1 = new TinyMusic.Sequence( ac, tempo, lead );
        sequence3 = new TinyMusic.Sequence( ac, tempo, bass );
        sequence4 = new TinyMusic.Sequence( ac, tempo, bass2 );

// set staccato and smoothing values for maximum coolness
        sequence1.staccato = 0.55;
        sequence3.staccato = 0.05;
        sequence3.smoothing = 0.4;
        sequence4.staccato = 0.05;
        sequence4.smoothing = 0.4;

// adjust the levels so the bass and harmony aren't too loud
        sequence1.gain.gain.value = 1.0 / 2;
        sequence3.gain.gain.value = 0.65 / 2;
        sequence4.gain.gain.value = 0.65 / 2;

// apply EQ settings
        sequence1.mid.frequency.value = 800;
        sequence1.mid.gain.value = 3;
        sequence3.mid.gain.value = 3;
        sequence3.bass.gain.value = 6;
        sequence3.bass.frequency.value = 80;
        sequence3.mid.gain.value = -6;
        sequence3.mid.frequency.value = 500;
        sequence3.treble.gain.value = -2;
        sequence3.treble.frequency.value = 1400;
        sequence3.mid.gain.value = 3;
        sequence4.bass.gain.value = 6;
        sequence4.bass.frequency.value = 80;
        sequence4.mid.gain.value = -6;
        sequence4.mid.frequency.value = 500;
        sequence4.treble.gain.value = -2;
        sequence4.treble.frequency.value = 1400;

// play
        when = ac.currentTime;
        //start the lead part immediately
        sequence1.play( when );
        // delay the harmony by 16 beats
        // start the bass part immediately
        sequence3.play( when );
        sequence4.play( when );
// pause
        /*document.querySelector('#stop').addEventListener('click', function() {
            sequence1.stop();
            sequence3.stop();
            sequence4.stop();
        }, false );*/
    }

    play() {

    }
}
