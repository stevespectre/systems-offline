import config from './config';

export default class Gravity {
    constructor(planets = [], spaceShip, equipments = []) {
        this.planets = planets;
        this.spaceShip = spaceShip;
        this.equipments = equipments;
    }

    calcGravityImpact() {
        this.shipFrontX = this.spaceShip.getX() + (this.spaceShip.width / 2);
        this.shipFrontY = this.spaceShip.getY();

        this.planets.forEach(p => this._calObjectGravityImpect(p));
    }

    _calObjectGravityImpect(object) {
        const objectGravityForce = object.gravityRadius / 1500 / this.spaceShip.getSpeed();

        const distanceX = object.getX() - this.shipFrontX;
        const distanceY = object.getY() - this.shipFrontY;

        const realDistance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

        if (this._isWithinGravityField(object, realDistance)) {
            const direction = distanceX > 0 ? -1 : 1;
            const angle = objectGravityForce * direction;
            this.rotateObjects(angle);
                        
            // this.spaceShip.decreaseSpeed(0.01 * realDistance);
            this.spaceShip.decreaseSpeed(config.spaceship.gravitydecreaseSpeedVelocity);
        }
    }

    _isWithinGravityField(planet, distance) {
        return distance <= planet.gravityRadius && distance >= planet.radius
    }

    rotateObjects(angle) {
        this.planets.forEach(p => this._doTransform(p, angle));
        this.equipments.forEach(e => this._doTransform(e, angle));
    }

    _doTransform(object, angle) {
        const newX = ((object.getX() - this.shipFrontX) * Math.cos(angle) - (object.getY() - this.shipFrontY) * Math.sin(angle)) + this.shipFrontX;
        const newY = ((object.getX() - this.shipFrontX) * Math.sin(angle) + (object.getY() - this.shipFrontY) * Math.cos(angle)) + this.shipFrontY;

        object.setX(newX).setY(newY);
    }

}
