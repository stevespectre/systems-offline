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
    }

    get() {
        return this.equipments;
    }

    _getCollectedEquipments() {
        // if we want to keep equipments in storage
        /*let stored = localStorage.getItem('collectedEquipments');
        if (stored) return JSON.parse(stored);*/

        let collected = {};

        this.possibleEquipments.forEach(equipment => {
            collected[equipment.name] = 0;
        });

        return collected;
    }

    activateEquipment(equipmentName) {
        console.log('activate',equipmentName);
        if (this.collectedEquipments[equipmentName] > 0) {
            console.log('0',0);
            this.possibleEquipments.forEach(possibleEquipment => {
                console.log('1',1);
                if (possibleEquipment.name == equipmentName) possibleEquipment.activate();
            });
            //this.possibleEquipments[equipmentName].activate();
        }
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
        const name = equipment.constructor.name;
        this.collectedEquipments[name]++;
        document.getElementById(`${ name.toLowerCase() }-num`).innerHTML = this.collectedEquipments[name];
        // if we want to keep equipments in storage
        // localStorage.setItem('collectedEquipments', JSON.stringify(this.collectedEquipments));
    }

    _addRandom() {
        const randomKey = Math.floor(Math.random() * this.possibleEquipments.length);
        const equipment = this.possibleEquipments[randomKey];

        this.equipments.push(new equipment(this.ctx, this.planets, this.spaceShip));

        return this;
    }

}