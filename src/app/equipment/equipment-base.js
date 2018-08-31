import BaseObject from '../base-object';
import CollisionDetection from '../collision-detection';

export default class EquipmentBase extends BaseObject {
    constructor(ctx, planets, spaceShip) {
        super();
        this.ctx = ctx;
        this.planets = planets;
        this.spaceShip = spaceShip;
        this.collisionDetection = new CollisionDetection();
        this.init();
    }

    init() {
        throw Error('[Equipment].init() method needs to be implemented in child class');
    }

    activate() {
        throw Error('[Equipment].activate() method needs to be implemented in child class');
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

    isPickedUpBySpacehip() {
        return this.collisionDetection.isCollisedWithObject(this, this.spaceShip);
    }

    _calculatePosition(speed) {
        this.y += speed;
    }

    _getXWithoutPlanetCollision() {
        this.x = this._getRandomX();
        if (this.collisionDetection.checkCirclesCollision(this.planets, this)) {
            return this._getXWithoutCollision();
        }

        return this.x;
    }
    
    _getRandomX() {
        return Math.floor(Math.random() * this.windowWidth);
    }
}