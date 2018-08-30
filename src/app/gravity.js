class Gravity {
    addGravityEffect(planets, spaceShip) {

        this.planets = planets;
        this.spaceShip = spaceShip;
        this.rotationAngle = 0.021;
        this.newAngle = this.calcGravityImpact();
        return this.newAngle;
    }

    calcGravityImpact() {
        let newAngle = this.rotationAngle;

        if (this.spaceShip.actualSpeed == this.spaceShip.burstSpeed) {
            newAngle = newAngle / 3;
        }

        for (let i = 0; i < this.planets.length; i++) {
            let p = this.planets[i];
            this.shipFrontX = this.spaceShip.posX + (this.spaceShip.shipWidth / 2);
            this.shipFrontY = this.spaceShip.posY;

            let distanceX = p.x - this.shipFrontX;
            let distanceY = p.y - this.shipFrontY;

            let realDistance = Math.sqrt( (distanceX * distanceX) + (distanceY * distanceY) );

            if (realDistance <= p.gravityRadius && realDistance > p.radius) {
                const direction = distanceX > 0 ? -1 : 1;
                this.transformPlanetPoints(newAngle * direction);
            }
        }

        return newAngle;

    }

    transformPlanetPoints(angle) {
        this.planets.map(planet => {
            const newX = (planet.x - this.shipFrontX) * Math.cos(angle) - (planet.y - this.shipFrontY) * Math.sin(angle);
            const newY = (planet.x - this.shipFrontX) * Math.sin(angle) + (planet.y - this.shipFrontY) * Math.cos(angle);

            planet.x = newX + this.shipFrontX;
            planet.y = newY + this.shipFrontY;
        });
    }

}

module.exports = Gravity;