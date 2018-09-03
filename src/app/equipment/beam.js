import EquipmentBase from './equipment-base';

export default class Beam extends EquipmentBase {
    init() {
        this.radius = 100;
        this.color = 'green';
        this.x = this._getXWithoutPlanetCollision();
        this.y = 0;
    }

    activate() {
        alert('activate');
        this._renderBeamEffectRadius();
    }

    _renderBeamEffectRadius() {
        console.log('renderBeamRadius');
    }
}
