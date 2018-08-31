import Base from '../base';
import Plasma from './plasma';

export default class Equipment extends Base {
    constructor(ctx, planets = []) {
        super();
        this.ctx = ctx;
        this.planets = planets;
        this.possibleEquipments = [
            Plasma
        ];

        this.equipments = [];
    }

    get() {
        return this.equipments;
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
            if(equipment.isOutOfView()){
                this.equipments.splice(i, 1);
            }
        }
    }

    _addRandom() {
        const randomKey = Math.floor(Math.random() * this.possibleEquipments.length);
        const equipment = this.possibleEquipments[randomKey];

        this.equipments.push(new equipment(this.ctx, this.planets));
        return this;
    }
}