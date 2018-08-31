import BaseObject from './base-object';
import config from './config';
import Particle from './particle';

export default class Spaceship extends BaseObject {
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
        this.y = (this.windowHeight - 150) + (this.height / 2);

        this.particles = [];
        this.particleNum = 0.001;
    }

    setX() {
        return this.windowWidth / 2 - (this.width / 2)
    }

    setY() {
        return (this.windowHeight - config.spaceship.posYOffset) + (this.height / 2)
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