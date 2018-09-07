import EquipmentBase from './equipment-base';
import config from '../config';
import Profile from '../profile';

export default class Plasma extends EquipmentBase {
    init() {
        this.profile = new Profile();
        this.radius = 100;
        this.color = '#ff0000';
        this.x = this._getXWithoutPlanetCollision();
        this.y = 0;
        this.plasmaWidth = 8;
        this.plasmaHeight = 24;
    }

    pickUp() {
        this.updateButtonText(1);
    }

    activate() {

        this.active = true;

        this.x = this.spaceShip.getX() + this.plasmaWidth/2;
        this.y = this.spaceShip.getY() - this.plasmaHeight;

        /*this.radius = config.equipments.beam.effectRadius * this.profile.getProgressOfItem('plasma');
        this.x = this.spaceShip.getX() + this.spaceShip.width / 2;
        this.y = this.spaceShip.getY() + this.spaceShip.height / 2;*/

        this.updateButtonText(-1);
    }

    doEffect() {
        this.y = this.y - config.equipments.plasma.speed;
        this._renderPlasma();

        this.radius = 0;

        if (this.getY() <= 0 || this.collisionDetection.checkPlasmaCollision(this)) {
            console.log('this.getY',this.getY());
            alert('remove');
            this.removeable = true;
            this.active = false;
            return;
        }

        // console.log('plasma activated');

        /*for (let e of this.equipments) {
            if (this.collisionDetection.checkPlasmaCollision(e, this)) {
                console.log('[equipment] inside radius');
                e.pickedUp = true;
            }
        }*/
    }

    _renderPlasma() {
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.plasmaWidth, this.plasmaHeight);
        this.ctx.fillStyle = 'rgba(255,0,0,.5)';
        this.ctx.fill();
        this.ctx.closePath();
    }
}
