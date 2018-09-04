import EquipmentBase from './equipment-base';
import config from '../config';

export default class Beam extends EquipmentBase {
    init() {
        this.duration = 10000;
        this.radius = 100;
        this.color = 'green';
        this.x = this._getXWithoutPlanetCollision();
        this.y = 0;
    }

    pickUp() {
        this.updateButtonText(1);
    }

    activate() {
        this.active = true;
        this.radius = 150;
        this.x = this.spaceShip.getX() + this.spaceShip.width / 2;
        this.y = this.spaceShip.getY() + this.spaceShip.height / 2;

        this.updateButtonText(-1);

        // setTimeout(() => {
        //     this.removeable = true;
        // }, this.duration);
    }

    doEffect() {
        const radiusVelocity = this.radius / (this.duration / config.fps);
        this.radius -= radiusVelocity;

        if (this.radius <= 0) {
            this.removeable = true;
            return;
        }

        this._renderBeamEffectRadius();

        for (let e of this.equipments) {
            if (this.collisionDetection.checkCollision(e, this)) {
                console.log('[equipment] inside radius');
                e.pickedUp = true;
            }
        }
    }

    _renderBeamEffectRadius() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, this.TWO_PI);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        this.ctx.closePath();
    }
}
