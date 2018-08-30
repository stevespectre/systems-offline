class CollisionDetection {

    checkObjectCollision(planets, spaceShip) {
        for (let i = 0; i < planets.length; i++) {
            const planet = planets[i];
            const shipFrontX = spaceShip.x + (spaceShip.width / 2);
            const shipFrontY = spaceShip.y;

            const distanceX = planet.getX() - shipFrontX;
            const distanceY = planet.getY() - shipFrontY;

            const realDistance = Math.sqrt( (distanceX * distanceX) + (distanceY * distanceY) );

            if (realDistance <= planet.radius) {
                return true;
            }
        }
        return false;
    }

    checkCirclesCollision(planets, planetToPlace) {
        for (let i = 0; i < planets.length; i++) {
            const planet = planets[i];

            const distanceX = planet.getX() - planetToPlace.getX();
            const distanceY = planet.getY() - planetToPlace.getY();

            const realDistance = Math.sqrt( (distanceX * distanceX) + (distanceY * distanceY) );

            if (realDistance <= (planet.gravityRadius + planetToPlace.gravityRadius + (planetToPlace.gravityRadius * 1.5))
                && realDistance != 0) {
                return true;
            }
        }
        return false;
    }

    checkCollision(planets, object) {
        planets.forEach( planet => {

        });
    }

}

module.exports = CollisionDetection;