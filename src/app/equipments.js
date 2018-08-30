import config from './config';

export default class Equipments {
    constructor() {
        this.equipments = config.equipments;
    }

    spawnEquipment() {
        this.equipment = this.getRandomEquipment();
        console.log('this.equipment',this.equipment);
    }

    getRandomEquipment() {
        const keys = Object.keys(this.equipments);
        console.log('keys',keys);
        return this.equipments[keys[Math.floor(Math.random() * Object.keys(this.equipments).length)]];
    }

    clearEquipment() {

    }

    drawPlasmaPick() {

    }

    setEquipmentProgress() {

    }

    getEquipmentProgress() {

    }
}