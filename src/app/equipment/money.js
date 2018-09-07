import EquipmentBase from './equipment-base';
import Profile from '../profile';

export default class Money extends EquipmentBase {
    init() {
        this.name = 'money';
        this.radius = 100;
        this.color = 'yellow';
        this.x = this._getXWithoutPlanetCollision();
        this.y = 0;
    }

    activate() {
        return;
    }

    pickUp() {
        this.active = true;
        const profile = new Profile();
        profile.updateItem('money', 1);
    }

    doEffect() {
        this.removeable = true;
    }
}