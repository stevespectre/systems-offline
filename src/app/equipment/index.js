import Base from '../base';
import Plasma from './plasma';
import Beam from './beam';

export default class Equipment extends Base {
    constructor(ctx, planets = [], spaceShip) {
        super();
        this.ctx = ctx;
        this.planets = planets;
        this.spaceShip = spaceShip;
        this.possibleEquipments = [
            Plasma,
            Beam
        ];

        this.equipments = [];
        this.collectedEquipments = this._getCollectedEquipments();
        console.log('this.collectedEquipments',this.collectedEquipments);
    }

    get() {
        return this.equipments;
    }

    _getCollectedEquipments() {
        let collected = {};
        this.possibleEquipments.forEach(equipment => {
            collected[equipment.name] = localStorage.getItem('collectedEquipments') || 0;
        });
        return collected;
    }

    activateEquipment(equipmentName) {
        console.log('activate', equipmentName);
        this.possibleEquipments[equipmentName].activate();
    }

    eventuallyAdd(traveledDistance) {
        // only one equipment is allowed on the screen at once...
        if (this.equipments.length) {
            return;
        }

        // not far enough...
        if (traveledDistance % 100 !== 0) {
            return;
        }

        this._addRandom();
    }

    render(speed) {
        for(let i in this.equipments) {
            const equipment = this.equipments[i].render(speed);

            if(equipment.isPickedUpBySpacehip()) {
                // equipment.activate();
                this._addToCollection(equipment);
                this.equipments.splice(i, 1);
                continue;
            }

            if(equipment.isOutOfView()){
                this.equipments.splice(i, 1);
            }
        }
    }

    _addToCollection(equipment) {
        console.log('equipment',equipment.constructor.name);
        //console.log('this.collectedEquipments[equipment.name]',this.collectedEquipments[equipment.name]);
        this.collectedEquipments[equipment.constructor.name]++;
        console.log('this.collectedEquipments',this.collectedEquipments);
        localStorage.setItem('collectedEquipments', this.collectedEquipments);
    }

    _addRandom() {
        const randomKey = Math.floor(Math.random() * this.possibleEquipments.length);
        const equipment = this.possibleEquipments[randomKey];

        this.equipments.push(new equipment(this.ctx, this.planets, this.spaceShip));

        return this;
    }

}