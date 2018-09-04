import EquipmentBase from './equipment-base';

export default class Beam extends EquipmentBase {
    init() {
        this.radius = 100;
        this.activeRadius = 150;
        this.color = 'green';
        this.x = this._getXWithoutPlanetCollision();
        this.y = 0;
    }

    activate(ctx, spaceShip, profile) {
        alert('activate');
        this.ctx = ctx;
        this.spaceShip = spaceShip;
        this.profile = profile;

        this._updateButtonText(name);
        this._renderBeamEffectRadius();
    }

    _updateButtonText(equipmentName) {
        document.getElementById(`${ equipmentName.toLowerCase() }-num`).innerHTML = this.collectedEquipments[equipmentName];
    }

    _renderBeamEffectRadius() {
        console.log('renderBeamRadius');
        this.ctx.beginPath();
        this.ctx.arc(this.spaceShip.x, this.spaceShip.y, this.radius, 0, this.TWO_PI);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        this.ctx.closePath();
    }
}
