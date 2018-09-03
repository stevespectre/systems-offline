import EquipmentBase from './equipment-base';

export default class Beam extends EquipmentBase {
    init() {
        this.radius = 25;
        this.color = 'green';
        this.x = this._getXWithoutPlanetCollision();
        this.y = 0;
    }

    activate() {
        this._renderBeamEffectRadius();
    }

    _renderBeamEffectRadius() {
        console.log('renderBeamRadius');
    }
}
