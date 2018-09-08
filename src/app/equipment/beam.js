import EquipmentBase from './equipment-base';
import config from '../config';
import Profile from '../profile';

export default class Beam extends EquipmentBase {
    init() {
        this.name = 'beam';
        this.profile = new Profile();
        this.duration = 10000;
        this.radius = config.equipments.beam.radius;
        this.color = 'green';
        this.x = this._getXWithoutPlanetCollision();
        this.y = 0;
    }

    pickUp() {
        console.log('pick beam');
        this.updateButtonText(1, 'beam');
    }

    activate() {
        this.active = true;
        this.radius = config.equipments.beam.effectRadius * this.profile.getProgressOfItem('beam');
        this.x = this.spaceShip.getX() + this.spaceShip.width / 2;
        this.y = this.spaceShip.getY() + this.spaceShip.height / 2;

        this.updateButtonText(-1, 'beam');
    }

    doEffect() {
        const radiusVelocity = this.radius / (this.duration / config.fps);
        this.radius -= radiusVelocity;

        if (this.radius <= 0) {
            this.removeable = true;
            this.active = false;
            return;
        }

        this._renderBeamEffectRadius();

        for (let e of this.equipments) {
            if (this.collisionDetection.checkCollision(e, this)) {
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
