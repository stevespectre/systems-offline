import config from './config';
import Particle from './particle';
import BaseObject from './base-object';

class Engine extends BaseObject {
    constructor() {
        super();
        this.particles = [];
        this.particleNum = 0.01;
    }

    _renderParticles() {
        if (!config.spaceship.engineParticlesEnabled) {
            return;
        }

        if((Math.random() > this.particleNum) && this.isOnBurstSpeed()){
            this._addParticle();
        }

        for(let i in this.particles) {
            const particle = this.particles[i].draw();
            if(particle.isOutOfView()){
                this.particles.splice(i, 1);
            }
        }
    }

    _addParticle() {
        const x = this.x + this.width / 2;
        const y = this.y + this.height;
        this.particles.push(new Particle(this.ctx, x, y));
    }
}

export default class Spaceship extends Engine {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.element = document.getElementById('ship');
        this.speed = config.spaceship.speed;
        this.width = 15;
        this.height = 40;
        this.x = this.windowWidth / 2 - (this.width / 2);
        this.y = (this.windowHeight - 150) + (this.height / 2);
        this.burstOn = false;
    }

    setX() {
        return this.windowWidth / 2 - (this.width / 2);
    }

    setY() {
        return (this.windowHeight - config.spaceship.posYOffset) + (this.height / 2);
    }

    getSpeed() {
        return this.speed;
    }

    isOnBurstSpeed() {
        return this.burstOn;
    }

    speedBurst() {
        this.incrieseSpeed(1);
        this.burstOn = true;
        this.element.classList.add('burst');
    }

    speedStandard() {
        this.burstOn = false;
        this.element.classList.remove('burst');
    }

    render() {
        this._renderParticles();

        if (!this.isOnBurstSpeed()) {
            this.decreaseSpeed(0.15);
        }
    }

    incrieseSpeed(value = 1) {
        this.speed += value;
    }

    decreaseSpeed(value = 0.5) {
        if ((this.speed - value) > config.spaceship.minSpeed) {
            this.speed -= value;
        }
    }
}