import Base from './base.js';
import config from './config';

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
}