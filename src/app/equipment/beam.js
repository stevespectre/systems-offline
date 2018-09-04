import EquipmentBase from './equipment-base';

export default class Beam extends EquipmentBase {
    init() {
        this.duration = 5000;
        this.radius = 100;
        this.activeRadius = 150;
        this.color = 'green';
        this.x = this._getXWithoutPlanetCollision();
        this.y = 0;
    }

    pickedUp() {
        console.log('BEAM has been picked up');
        // this.activate(); // todo remove! testing only
    }

    activate() {
        this.active = true;

        setTimeout(() => {
            this.removeable = true;
        }, this.duration);
    }

    doEffect() {
        this._renderBeamEffectRadius();
    }

    _renderBeamEffectRadius() {
        const x = this.spaceShip.getX() + this.spaceShip.width/2;
        const y = this.spaceShip.getY() + this.spaceShip.height/2;

        this.ctx.beginPath();
        this.ctx.arc(x, y, this.activeRadius, 0, this.TWO_PI);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        this.ctx.closePath();
    }
}
