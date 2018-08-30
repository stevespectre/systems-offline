import Base from './base.js';
import config from './config';
import Particle from './particle';

export default class Spaceship extends Base {
    constructor(ctx) {
        super();
        this.element = document.getElementById('ship');
        this.ctx = ctx;
        this.standardSpeed = config.spaceship.speed;
        this.burstSpeed = config.spaceship.burstSpeed;
        this.speed = this.standardSpeed;
        this.width = 15;
        this.height = 40;
        this.x = this.windowWidth / 2 - (this.width / 2);
        this.y = this.windowHeight - 150 + (this.height / 2);

        this.particles = {};
        this.particleIndex = 0;
        this.particleNum = 0.001;
    }

    getSpeed() {
        return this.speed;
    }

    isOnBurstSpeed() {
        return this.speed === this.burstSpeed;
    }

    speedBurst() {
        this.speed = this.burstSpeed;
        this.element.classList.add('burst');
    }

    speedStandard() {
        this.speed = this.standardSpeed;
        this.element.classList.remove('burst');
    }

    switchBurstSpeedGraphicOn() {
        this.element.classList.add('burst');
    }

    switchBurstSpeedGraphicOff() {
        this.element.classList.remove('burst');
    }

    render() {
        this._renderParticles();
    }

    _renderParticles() {
        if (!config.spaceship.engineParticlesEnabled) {
            return;
        }

        if((Math.random() > this.particleNum) && this.isOnBurstSpeed()){
            this._addParticle();
        }

        for(let i in this.particles) {
            const particle = this.particles[i];
            this.particles[i].draw();

            if(particle.x > this.windowWidth || particle.y > this.windowHeight){
                delete this.particles[particle.id];
            }
        }
    }

    _addParticle() {
        const x = this.x + this.width / 2;
        const y = this.y + this.height;
        this.particles[this.particleIndex++] = new Particle(this.ctx, x, y).get('bottom');
    }
}