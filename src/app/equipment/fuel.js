import EquipmentBase from './equipment-base';
import Profile from '../profile';

export default class Fuel extends EquipmentBase {
    init() {
        this.name = 'fuel';
        this.profile = new Profile();
        this.radius = 35;
        this.color = 'orange';
        this.x = this._getXWithoutPlanetCollision();
        this.y = 0;
    }

    activate() {
        alert('activate');
        //
    }

    pickUp() {
        this.active = true;
        const newFuelLevel = this.profile.getProgressOfItem('fuel') * 10;
        this.spaceShip.setFuelLevel(newFuelLevel);
    }

    doEffect() {
        this.removeable = true;
    }
}