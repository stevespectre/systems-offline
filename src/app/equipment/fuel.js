import EquipmentBase from './equipment-base';
import Profile from '../profile';

export default class Fuel extends EquipmentBase {
    init() {
        this.profile = new Profile();
        this.radius = 100;
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
        console.log('1',this.profile.getProgressOfItem('fuel'));
        document.getElementById('fuel').style.width = `${ this.profile.getProgressOfItem('fuel') * 30}%`;
    }

    doEffect() {
        this.removeable = true;
    }
}