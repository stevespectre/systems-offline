import EquipmentBase from './equipment-base';
import config from '../config';
import Profile from '../profile';

export default class Plasma extends EquipmentBase {
    init() {
        this.name = 'plasma';
        this.profile = new Profile();
        this.radius = 35;
        this.color = '#ff0000';
        this.x = this._getXWithoutPlanetCollision();
        this.y = 0;
        this.plasmaWidth = 8;
        this.plasmaHeight = 24;
        this.level = this.profile.getProgressOfItem('plasma');
    }

    calcStrength() {
        console.log('config',config);
        return ((config.planet.maxRadius - config.planet.minRadius) / 10) * this.profile.getProgressOfItem('plasma');
    }

    pickUp() {
        this.updateButtonText(1, 'plasma');
    }

    activate() {

        this.active = true;

        this.x = this.spaceShip.getX() + this.plasmaWidth/2;
        this.y = this.spaceShip.getY() - this.plasmaHeight;

        this.updateButtonText(-1, 'plasma');
    }

    doEffect() {
        this.y = this.y - config.equipments.plasma.speed;
        this._renderPlasma();

        this.radius = 0;

        if (this.getY() <= 0 || this.collisionDetection.checkPlasmaCollision(this)) {
            this.removeable = true;
            this.active = false;
            return;
        }
    }

    _renderPlasma() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.plasmaWidth, this.plasmaHeight);
        this.ctx.fillStyle = 'rgba(255,0,0,.5)';
        this.ctx.fill();
        this.ctx.closePath();
    }
}
