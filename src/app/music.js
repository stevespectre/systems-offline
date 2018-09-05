// import TinyMusic from './tiny-music';
var enharmonics = 'B#-C|C#-Db|D|D#-Eb|E-Fb|E#-F|F#-Gb|G|G#-Ab|A|A#-Bb|B-Cb',
    middleC = 440 * Math.pow( Math.pow( 2, 1 / 12 ), -9 ),
    numeric = /^[0-9.]+$/,
    octaveOffset = 4,
    space = /\s+/,
    num = /(\d+)/,
    offsets = {};


var ac, tempo = 128, volume = 0.5;

ac = new ( window.AudioContext || window.webkitAudioContext )();

export default class Music {

    constructor() {
        this.bass = new Sequence( ac, tempo, [
            'C2  e',
            'C2  e',
            'C2  e',
            'C2  e',
            'C2  e',
            'C2  e',
            'C2  e',
            'G2  e',

            'G2  e',
            'G2  e',
            'G2  e',
            'G2  e',
            'G2  e',
            'G2  e',
            'G2  e',
            'E2  e',

            'E2  e',
            'E2  e',
            'E2  e',
            'E2  e',
            'E2  e',
            'E2  e',
            'E2  e',
            'G2  e',

            'G2  e',
            'G2  e',
            'G2  e',
            'D2  e',
            'D2  e',
            'D2  e',
            'D2  e',
            'C2  e'
        ]);
        this.lead = new Sequence( ac, tempo, [
            '_  e',
            'G4 e',
            'G5 e',
            'G4 e',
            'D5 e',
            'C5 e',
            'B4 e',
            'C5 e',

            '_  e',
            'G4 e',
            'D5 e',
            'E5 e',
            'D5 e',
            'C5 e',
            'B4 e',
            'A4 e',

            '_  e',
            'G4 e',
            'G5 e',
            'G4 e',
            'D5 e',
            'C5 e',
            'B4 e',
            'C5 e',

            '_  e',
            'G4 e',
            'D5 e',
            'E5 e',
            'D5 e',
            'B4 e',
            'A4 e',
            'G4 e',
        ]);
    }

    init() {
        if ( ac ) {
            this.ac = ac;
            this.osc = this.ac.createOscillator();
            this.compressor = this.ac.createDynamicsCompressor();
            this.output = this.ac.createGain();
            this.output.connect( this.ac.destination );
            this.output.gain.value = volume;
            this.dry = this.ac.createGain();
            this.wet = this.ac.createGain();

            this.reverb = this.ac.createConvolver();
            this.reverb.buffer = this.createReverb( 2 );
            this.reverb.connect( this.compressor );

            //this.collision1.dry.connect( this.output );
            //this.collision1.gain.gain.value = 0.4;
            //this.collision1.loop = false;

            //this.collision2.dry.connect( this.output );
            //this.collision2.gain.gain.value = 0.4;
            //this.collision2.loop = false;

            this.osc.frequency.value = 0;
            this.osc.connect( this.compressor );
            this.osc.start();

            this.bass.wet.connect( this.reverb );
            this.lead.wet.connect( this.reverb );
            this.bass.dry.connect( this.compressor );
            this.lead.dry.connect( this.compressor );

            this.compressor.ratio.value = 4;
            this.compressor.threshold.value = -12;
            this.compressor.connect( this.output );

            this.bass.staccato = 0.25;
            this.bass.waveType = 'sawtooth';
            this.bass.treble.type = 'lowpass';
            this.bass.treble.frequency.value = 2500;
            this.bass.mid.gain.value = -2;

            this.lead.smoothing = 0.06;
            this.lead.gain.gain.value = 0.35;
            this.lead.wet.gain.value = 1.5;

        }
    }

    splitEnharmonics() {
        enharmonics.split('|').forEach(function( val, i ) {
            val.split('-').forEach(function( note ) {
                offsets[ note ] = i;
            });
        });
    }

    play() {
        var now, delay;
        if ( this.ac ) {
            now = this.ac.currentTime;
            delay = now + ( 60 / tempo * 16 );
            this.lead.play( now );
            this.bass.play( delay );
        }
    }

    stop() {
        if ( this.ac ) {
            this.lead.stop();
            this.counterpoint.stop();
            this.bass.stop();
            this.kick.stop();
            this.pad1.stop();
            this.pad2.stop();
        }
    }

    mute() {
        if ( this.ac ) {
            if ( this.muted ) {
                this.muted = false;
                this.output.gain.value = volume;
            } else {
                this.muted = true;
                this.output.gain.value = 0;
            }
        }
    }

    collide( descend ) {
        if ( this.ac ) {
            this.collision1.stop();
            this.collision2.stop();
            if ( descend ) {
                this.collision2.play();
            } else {
                this.collision1.play();
            }
        }
    }

    createReverb( duration, decay ) {
        var sr = ac.sampleRate,
            len = sr * duration,
            impulse = this.ac.createBuffer( 2, len, sr ),
            impulseL = impulse.getChannelData( 0 ),
            impulseR = impulse.getChannelData( 1 ),
            i = 0;

        if ( !decay ) {
            decay = 2.0;
        }
        for ( ; i < len; ++i ) {
            impulseL[ i ] = ( Math.random() * 2 - 1 ) * Math.pow( 1 - i / len, decay );
            impulseR[ i ] = ( Math.random() * 2 - 1 ) * Math.pow( 1 - i / len, decay );
        }
        return impulse;
    }
}

class Sequence {
    constructor(ac, tempo, arr) {
        this.ac = ac;
        this.createFxNodes();
        this.tempo = tempo || 120;
        this.loop = true;
        this.smoothing = 0;
        this.staccato = 0;
        this.notes = [];
        this.push.apply( this, arr || [] );
    }

    createFxNodes() {
        this.eq = [ [ 'bass', 100 ], [ 'mid', 1000 ], [ 'treble', 2500 ] ];
        this.prev = this.gain = this.ac.createGain();


        this.eq.forEach(function( config, filter ) {
            filter = this[ config[ 0 ] ] = this.ac.createBiquadFilter();
            filter.type = 'peaking';
            filter.frequency.value = config[ 1 ];
            this.prev.connect( this.prev = filter );
        }.bind( this ));
        this.prev.connect( this.wet );
        this.prev.connect( this.dry );
        return this;
    }

    push() {
        Array.prototype.forEach.call( arguments, function( note ) {
            this.notes.push( note instanceof Note ? note : new Note( note ) );
        }.bind( this ));
        return this;
    }

    createOscillator() {
        this.stop();
        this.osc = this.ac.createOscillator();
        this.osc.type = this.waveType || 'square';
        this.osc.connect( this.gain );
        return this;
    }

    scheduleNote( index, when ) {
        var duration = 60 / this.tempo * this.notes[ index ].duration,
            cutoff = duration * ( 1 - ( this.staccato || 0.00000000001 ) );

        this.setFrequency( this.notes[ index ].frequency, when );

        if ( this.smoothing && this.notes[ index ].frequency ) {
            this.slide( index, when, cutoff );
        }

        this.setFrequency( 0, when + cutoff );
        return when + duration;
    }

    getNextNote( index ) {
        return this.notes[ index < this.notes.length - 1 ? index + 1 : 0 ];
    }

    getSlideStartDelay( duration ) {
        return duration - Math.min( duration, 60 / this.tempo * this.smoothing );
    }

    slide( index, when, cutoff ) {
        var next = this.getNextNote( index ),
            start = this.getSlideStartDelay( cutoff );
        this.setFrequency( this.notes[ index ].frequency, when + start );
        this.rampFrequency( next.frequency, when + cutoff );
        return this;
    }

    setFrequency( freq, when ) {
        this.osc.frequency.setValueAtTime( freq, when );
        return this;
    }

    rampFrequency( freq, when ) {
        this.osc.frequency.linearRampToValueAtTime( freq, when );
        return this;
    }

    play( when ) {
        when = typeof when === 'number' ? when : this.ac.currentTime;

        this.createOscillator();
        this.osc.start( when );

        this.notes.forEach(function( note, i ) {
            when = this.scheduleNote( i, when );
        }.bind( this ));

        this.osc.stop( when );
        this.osc.onended = this.loop ? this.play.bind( this, when ) : null;

        return this;
    }

    stop() {
        if ( this.osc ) {
            this.osc.onended = null;
            this.osc.stop( 0 );
            this.osc.frequency.cancelScheduledValues( 0 );
            this.osc = null;
        }
        return this;
    };

}

class Note {
    init( str ) {
        var couple = str.split( space );
        // frequency, in Hz
        this.frequency = Note.getFrequency( couple[ 0 ] ) || 0;
        // duration, as a ratio of 1 beat (quarter note = 1, half note = 0.5, etc.)
        this.duration = Note.getDuration( couple[ 1 ] ) || 0;
    }

    getFrequency( name ) {
        var couple = name.split( num ),
            distance = offsets[ couple[ 0 ] ],
            octaveDiff = ( couple[ 1 ] || octaveOffset ) - octaveOffset,
            freq = middleC * Math.pow( Math.pow( 2, 1 / 12 ), distance );
        return freq * Math.pow( 2, octaveDiff );
    }

    getDuration( symbol ) {
        return numeric.test( symbol ) ? parseFloat( symbol ) :
            symbol.toLowerCase().split('').reduce(function( prev, curr ) {
                return prev + ( curr === 'w' ? 4 : curr === 'h' ? 2 :
                        curr === 'q' ? 1 : curr === 'e' ? 0.5 :
                            curr === 's' ? 0.25 : 0 );
            }, 0 );
    }
}
