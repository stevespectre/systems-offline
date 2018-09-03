import EquipmentBase from './equipment-base';

export default class Plasma extends EquipmentBase {
    init() {
        this.radius = 100;
        this.color = '#ff0000';
        this.x = this._getXWithoutPlanetCollision();
        this.y = 0;
    }

    activate() {
        alert('plasma');
        console.info('[equipment] Plasma ACTIVE');
    }
}
