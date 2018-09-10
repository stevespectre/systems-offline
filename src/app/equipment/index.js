import Base from '../base';
import Plasma from './plasma';
import Beam from './beam';
import Money from './money';
import Fuel from './fuel';

export default class Equipment extends Base {
    constructor(ctx, planets = [], spaceShip, profile) {
        super();
        this.ctx = ctx;
        this.planets = planets;
        this.spaceShip = spaceShip;
        this.profile = profile;
        this.possibleEquipments = [
            Fuel,
            Money,
            Beam,
            Plasma
        ];
        this.equipments = [];
        this.collectedEquipments = [];
    }

    get() {
        return this.equipments;
    }

    activateEquipment(type) {
        for(let i in this.collectedEquipments) {
            const e = this.collectedEquipments[i];

            if (e.name === type && !e.isActive()) {
                e.activate();
                break;
            }
        }
    }

    eventuallyAdd(traveledDistance) {
        // only one equipment is allowed on the screen at once...
        if (this.equipments.length) {
            return;
        }

        // not far enough...
        if (Math.round(traveledDistance % 100) !== 0) {
            return;
        }

        // TODO: true is just for dev mode
        if (this._haveYouLuckToSpawnEquipment()) {
            this._addRandom();
        }
    }

    _haveYouLuckToSpawnEquipment() {
        const rand = Math.floor(Math.random() * 100) + 1;
        const chanceInPercent = this.profile.getProgressOfItem('chance') * 5;

        return rand <= chanceInPercent;
    }

    render(speed) {
        this._renderPickabbleEquipments(speed);
        this._renderPickedEquipments();
    }

    _renderPickabbleEquipments(speed) {
        for(let i in this.equipments) {
            const equipment = this.equipments[i].render(speed);

            if(equipment.isPickedUp()) {
                equipment.pickUp();
                this.collectedEquipments.push(equipment);
                this.equipments.splice(i, 1);
                continue;
            }

            if(equipment.isOutOfView()){
                this.equipments.splice(i, 1);
            }
        }
    }

    _renderPickedEquipments() {
        for(let i in this.collectedEquipments) {
            const equipment = this.collectedEquipments[i];

            if (!equipment.isActive()) {
                continue;
            }
            
            this.collectedEquipments[i].doEffect();

            if (equipment.isRemoveable()) {
                this.collectedEquipments.splice(i, 1);
            }
        }
    }

    _addRandom() {
        const randomKey = Math.floor(Math.random() * this.possibleEquipments.length);
        const equipment = this.possibleEquipments[randomKey];

        this.equipments.push(new equipment(this.ctx, this.planets, this.spaceShip, this.equipments));

        return this;
    }

}