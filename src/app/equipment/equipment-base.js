import BaseObject from '../base-object';

export default class EquipmentBase extends BaseObject {
    constructor(ctx, planets, spaceShip, equipments) {
        super();
        this.ctx = ctx;
        this.planets = planets;
        this.spaceShip = spaceShip;
        this.equipments = equipments;

        this.pickedUp = false;
        this.active = false;
        this.removeable = false;
        this.init();
    }

    init() {
        throw Error('[Equipment].init() method needs to be implemented in child class');
    }

    activate() {
        throw Error('[Equipment].activate() method needs to be implemented in child class');
    }

    pickUp() {
        throw Error('[Equipment].pickedUp() method needs to be implemented in child class');
    }

    // Runs in every frame
    doEffect() {
        throw Error('[Equipment].doEffect() method needs to be implemented in child class');
    }
    // Runs when a connected button is pushed
    isActive() {
        return this.active;
    }

    isRemoveable() {
        return this.removeable;
    }

    render(speed) {
        this._calculatePosition(speed);
        this.ctx.globalAlpha = 1;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, this.TWO_PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
        return this;
    }

    isOutOfView() {
        return this.x > this.windowWidth || this.y > this.windowHeight;
    }

    isPickedUp() {
        return this.pickedUp || this.collisionDetection.isCollisedWithObject(this, this.spaceShip);
    }

    // todo refactor!
    updateButtonText(val = 1, selector) {
        /*let equipmentName = this.constructor.name;
        equipmentName = equipmentName.toLowerCase();*/
        const domElement = document.getElementById(selector);
        if (!domElement) return;
        const newVal = parseInt(domElement.innerHTML) + val;
        domElement.innerHTML = newVal;

        if (newVal) {
            domElement.classList.remove('out');            
        } else {
            domElement.classList.add('out');
        }
    }

    _calculatePosition(speed) {
        this.y += speed;
    }

    _getXWithoutPlanetCollision() {
        this.x = this._getRandomX();
        for (let i= 0; i < this.planets.length; i++) {
            const planet = this.planets[i];
            if (this.collisionDetection.checkCollision(planet, this)) {
                return this._getXWithoutPlanetCollision();
            }
        }


        return this.x;
    }
    
    _getRandomX() {
        return Math.floor(Math.random() * this.windowWidth);
    }
}