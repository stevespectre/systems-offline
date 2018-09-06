class CollisionDetection {

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
        for (let i = 0; i < planets.length; i++) {
            const planet = planets[i];

            const distanceX = planet.x - planetToPlace.x;
            const distanceY = planet.y - planetToPlace.y;

            const realDistance = Math.sqrt( (distanceX * distanceX) + (distanceY * distanceY) );

            if (realDistance <= (planet.gravityRadius + planetToPlace.gravityRadius + (planetToPlace.gravityRadius * 1.1))
                && realDistance != 0) {
                return true;
            }
        }
        return false;
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