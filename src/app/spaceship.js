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

        this._eventuallyAddParticle();

        for(let i in this.particles) {
            const particle = this.particles[i].draw();
            if(particle.isOutOfView()){
                this.particles.splice(i, 1);
            }
        }
    }

    _eventuallyAddParticle() {
        if(!(Math.random() > this.particleNum)) {
            return;
        }

        if (this.burstOn) this._addParticle('bottom');
        if (this.leftEngineOn) this._addParticle('left');
        if (this.rightEngineOn) this._addParticle('right');
    }

    _addParticle(direction) {
        const x = this.x + this.width / 2;
        const y = this.y + this.height / 3;
        this.particles.push(new Particle(this.ctx, x, y, direction, this));
    }
}

export default class Spaceship extends Engine {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.element = document.getElementById('ship');
        this.speed = config.spaceship.startSpeed;
        this.width = 15;
        this.height = 40;
        this.x = this.windowWidth / 2 - (this.width / 2);
        this.y = (this.windowHeight - config.spaceship.posYOffset) + (this.height / 2);
        this.burstOn = false;
        this.leftEngineOn = false;
        this.rightEngineOn = false;
    }

    getSpeed() {
        return this.speed;
    }

    isOnBurstSpeed() {
        return this.burstOn;
    }

    speedBurst() {
        this.incrieseSpeed(config.spaceship.incrieseSpeedVelocity);
        this.burstOn = true;
        this.element.classList.add('burst');
    }

    speedStandard() {
        this.burstOn = false;
        this.element.classList.remove('burst');
    }

    incrieseSpeed(value = 1) {
        if ((this.speed + value) <= config.spaceship.maxSpeed) {
            this.speed += value;
        }
    }

    decreaseSpeed(value = 0.5) {
        if ((this.speed - value) >= config.spaceship.minSpeed) {
            this.speed -= value;
        }
    }

    turnLeft() {
        this.rightEngineOn = true;
    }

    turnRight() {
        this.leftEngineOn = true;
    }

    turnEnd() {
        this.leftEngineOn = false;
        this.rightEngineOn = false;
    }
    
    render() {
        this._renderParticles();

        if (!this.isOnBurstSpeed()) {
            this.decreaseSpeed(config.spaceship.decreaseSpeedVelocity);
        }
    }
}