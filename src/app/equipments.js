import Base from './base.js';
import CollisionDetection from './collision-detection';
import config from './config';

export default class Equipments extends Base {
    constructor(ctx, planets = []) {
        super();
        this.ctx = ctx;
        this.planets = planets;
        this.equipments = config.equipments;

        this.collisionDetection = new CollisionDetection();
    }

    spawnEquipment() {
        return this.getRandomEquipment();
    }

    getRandomEquipment() {
        const keys = Object.keys(this.equipments);
        this.equipment = this.equipments[keys[Math.floor(Math.random() * Object.keys(this.equipments).length)]];
        this.equipment.x = this.getRandomX();
        this._checkCollision();
        return this.equipment;
    }

    getX() {
        return this.equipment.x;
    }

    getY() {
        return this.equipment.y;
    }

    getRandomX() {
        return Math.floor(Math.random() * this.windowWidth)
    }

    render(speed) {
        this._calculatePosition(speed);
        this.renderEquipment();
    }

    _calculatePosition(speed) {
        console.log('speed',this.equipment.y);
        this.equipment.y += speed;
    }

    _checkCollision() {
        while (this.collisionDetection.checkCirclesCollision(this.planets, this.equipment)) {
            this.x = this._getRandomX();
        }
    }

    renderEquipment() {
        this.ctx.beginPath();
        this.ctx.arc(this.equipment.x, this.equipment.y, this.equipment.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.equipment.color;
        this.ctx.fill();
        this.ctx.closePath();
    }
}