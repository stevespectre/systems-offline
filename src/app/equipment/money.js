import EquipmentBase from './equipment-base';
import Profile from '../profile';

export default class Money extends EquipmentBase {
    init() {
        this.radius = 100;
        this.color = 'yellow';
        this.x = this._getXWithoutPlanetCollision();
        this.y = 0;
    }

    activate() {
        this.profile.updateItem('money');
    }

    pickUp() {
        this.active = true;
    }

    doEffect() {
        const profile = new Profile();
        profile.updateItem('money');
        
        this.removeable = true;
    }
}