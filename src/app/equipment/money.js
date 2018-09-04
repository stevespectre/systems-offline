import EquipmentBase from './equipment-base';

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
}