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
            //Plasma,
            Beam
        ];
        /*this.collectedEquipments = {
            Beam: 0
        };*/

        this.equipments = [];
        this.collectedEquipments = this._getCollectedEquipments();
        //this.collectedEquipments = {};
    }

    get() {
        return this.equipments;
    }

    _getCollectedEquipments() {
        //alert('c');
        // if we want to keep equipments in storage
        /*let stored = localStorage.getItem('collectedEquipments');
        if (stored) return JSON.parse(stored);*/

        if (this.collectedEquipments) return;

        let collected = {};

        this.possibleEquipments.forEach(equipment => {
            collected[equipment.name] = 0;
        });

        return collected;
    }

    activateEquipment(equipmentName) {
        if (this.collectedEquipments[equipmentName] == 0) return;
        for(let i in this.equipments) {
            const equipment = this.equipments[i];
            console.log('equipment',equipment.constructor.name);
            if (equipment.constructor.name == equipmentName) equipment.activate();
            this.collectedEquipments[equipmentName]--;
            this._updateButtonText(equipmentName);
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
        this._updateButtonText(name);
    }

    _updateButtonText(equipmentName) {
        document.getElementById(`${ equipmentName.toLowerCase() }-num`).innerHTML = this.collectedEquipments[equipmentName];
    }

    _addRandom() {
        const randomKey = Math.floor(Math.random() * this.possibleEquipments.length);
        const equipment = this.possibleEquipments[randomKey];

        this.equipments.push(new equipment(this.ctx, this.planets, this.spaceShip));

        return this;
    }

}