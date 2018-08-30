import Base from './base.js';
import config from './config';

export default class Equipments extends Base {
    constructor(ctx) {
        super();
        this.ctx = ctx;
        this.equipments = config.equipments;
    }

    spawnEquipment() {
        return this.getRandomEquipment();
    }

    getRandomEquipment() {
        const keys = Object.keys(this.equipments);
        let equipment = this.equipments[keys[Math.floor(Math.random() * Object.keys(this.equipments).length)]];
        equipment.x = this.getRandomX();
        return equipment;
    }

    getRandomX() {
        return Math.floor(Math.random() * this.windowWidth)
    }

    render(equipment) {
        this.ctx.beginPath();
        this.ctx.arc(equipment.x, 100, equipment.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = equipment.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

}