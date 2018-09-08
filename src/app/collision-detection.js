class CollisionDetection {
    constructor() {
        this.planets = [];
    }

    checkObjectCollision(objects, spaceShip) {
        for (let i = 0; i < objects.length; i++) {
            const object = objects[i];
            if (this.isCollisedWithObject(object, spaceShip)) {
                return true;
            }
        }
        return false;
    }

    isCollisedWithObject(object, spaceShip) {
        const shipFrontX = spaceShip.x + (spaceShip.width / 2);
        const shipFrontY = spaceShip.y;

        const distanceX = object.getX() - shipFrontX;
        const distanceY = object.getY() - shipFrontY;

        const realDistance = Math.sqrt( (distanceX * distanceX) + (distanceY * distanceY) );

        if (realDistance <= object.radius) {
            return true;
        }

        return false;
    }

    checkCirclesCollision(planets, planetToPlace) {
        this.planets = planets;
        for (let i = 0; i < planets.length; i++) {
            const planet = planets[i];

            const distanceX = planet.x - planetToPlace.x;
            const distanceY = planet.y - planetToPlace.y;

            const realDistance = Math.sqrt( (distanceX * distanceX) + (distanceY * distanceY) );

            if (realDistance <= (planet.gravityRadius + planetToPlace.gravityRadius + ((planetToPlace.gravityRadius / 4)*3))
                && realDistance != 0) {
                return true;
            }
        }
        return false;
    }

    checkPlasmaCollision(plasma) {
        for (let i = 0; i < this.planets.length; i++) {
            const planet = this.planets[i];

            console.log(' this.strengthEnoughToDestroy(planet, plasma)', this.strengthEnoughToDestroy(planet, plasma));
            if (this.checkCollision(planet, plasma) && this.strengthEnoughToDestroy(planet, plasma)) {
                planet._generateRandomParameters();
                planet.y = 0 - Math.floor(Math.random() * (planet.gravityRadius * 2));
                planet._checkCollision();
                return true;
            }
        }
    }

    strengthEnoughToDestroy(planet, plasma) {
        const power = planet.minRadius + ((planet.maxRadius - planet.minRadius) / 10) * plasma.level;
        return planet.radius < power;
    }

    checkCollision(object, anotherObject) {
        const distanceX = object.x - anotherObject.x;
        const distanceY = object.y - anotherObject.y;

        const realDistance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

        if (realDistance <= object.radius + anotherObject.radius && realDistance != 0) {
            return true;
        }

        return false;
    }

}

module.exports = CollisionDetection;