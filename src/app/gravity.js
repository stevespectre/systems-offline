const DEFAULT_ROTATION_ANGLE = 0.015;

class Gravity {

    constructor(planets, spaceShip) {
        this.planets = planets;
        this.spaceShip = spaceShip;
    }

    /*addGravityEffect(planets, spaceShip) {
        this.planets = planets;
        this.spaceShip = spaceShip;
        this.rotationAngle = 0.021;
        this.newAngle = this.calcGravityImpact();
        return this.newAngle;
    }*/

    calcGravityImpact() {
        let newAngle = DEFAULT_ROTATION_ANGLE;

        this.shipFrontX = this.spaceShip.x + (this.spaceShip.width / 2);
        this.shipFrontY = this.spaceShip.y;

        if (this.spaceShip.isOnBurstSpeed()) {
            newAngle = newAngle / 3;
        }

        this.planets.forEach(planet => {

            const distanceX = planet.getX() - this.shipFrontX;
            const distanceY = planet.getY() - this.shipFrontY;

            const realDistance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

            if (this._isWithinGravityField(planet, realDistance)) {
                const direction = distanceX > 0 ? -1 : 1;
                this._transformPlanetPoints(newAngle * direction);
            }
        });

        return newAngle;

    }

    _isWithinGravityField(planet, distance) {
        return distance <= planet.gravityRadius && distance > planet.radius
    }

    _transformPlanetPoints(angle) {
        this.planets.map(planet => {
            const newX = ((planet.getX() - this.shipFrontX) * Math.cos(angle) - (planet.getY() - this.shipFrontY) * Math.sin(angle)) + this.shipFrontX;
            const newY = ((planet.getX() - this.shipFrontX) * Math.sin(angle) + (planet.getY() - this.shipFrontY) * Math.cos(angle)) + this.shipFrontY;

            planet.setX(newX).setY(newY);
        });
    }

}

module.exports = Gravity;