import Base from './base.js';

export default class Spaceship extends Base {
    constructor() {
        super();
        this.standardSpeed = 5;
        this.burstSpeed = this.standardSpeed * 3;
        this.actualSpeed = this.standardSpeed;
        this.shipWidth = 15;
        this.shipHeight = 40;
        this.posX = this.windowWidth/2 - (this.shipWidth / 2);
        this.posY = this.windowHeight - 150 + (this.shipHeight / 2);
    }

    switchBurstSpeedGraphicOn() {
        document.getElementById('ship').classList.add('burst');
    }

    switchBurstSpeedGraphicOff() {
        document.getElementById('ship').classList.remove('burst');
    }

    /*drawShip(context) {
        context.beginPath();
        context.rect(this.posX, this.posY, this.shipWidth, this.shipHeight);
        context.fillStyle = 'transparent';
        context.fill();
        context.closePath();
    }*/
}