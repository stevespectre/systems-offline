const DEFAULT_ROTATION_ANGLE = 0.015;

class Gravity {

    constructor(planets, spaceShip, equipment) {
        this.planets = planets;
        this.spaceShip = spaceShip;
        // this.equipment = equipment;
    }

    /*addGravityEffect(planets, spaceShip) {
        this.planets = planets;
        this.spaceShip = spaceShip;
        this.rotationAngle = 0.021;
        this.newAngle = this.calcGravityImpact();
        return this.newAngle;
    }*/

    calcGravityImpact(equipment) {
        this.equipment = equipment;
        let newAngle = DEFAULT_ROTATION_ANGLE;

        this.shipFrontX = this.spaceShip.x + (this.spaceShip.width / 2);
        this.shipFrontY = this.spaceShip.y;

        if (this.spaceShip.isOnBurstSpeed()) {
            newAngle = newAngle / 3;
        }

        this.planets.forEach(planet => {
            this._calcElementNewPosition(planet, newAngle);
        });

        return newAngle;

    }

    _calcElementNewPosition(object, newAngle) {
        const distanceX = object.getX() - this.shipFrontX;
        const distanceY = object.getY() - this.shipFrontY;

        const realDistance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

        if (this._isWithinGravityField(object, realDistance)) {
            const direction = distanceX > 0 ? -1 : 1;
            this._transformRotatedPoints(newAngle * direction);
        }
    }

    _isWithinGravityField(planet, distance) {
        return distance <= planet.gravityRadius && distance > planet.radius
    }

    _transformRotatedPoints(angle) {
        this.planets.map(planet => {
            this._doTransform(planet, angle)
        });

        if (this.equipment) {
            this._doTransform(this.equipment, angle);
        }
    }

    _doTransform(object, angle) {
        const newX = ((object.getX() - this.shipFrontX) * Math.cos(angle) - (object.getY() - this.shipFrontY) * Math.sin(angle)) + this.shipFrontX;
        const newY = ((object.getX() - this.shipFrontX) * Math.sin(angle) + (object.getY() - this.shipFrontY) * Math.cos(angle)) + this.shipFrontY;

        object.setX(newX).setY(newY);
    }

}

module.exports = Gravity;