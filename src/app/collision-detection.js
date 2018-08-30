class CollisionDetection {

    checkObjectCollision(planets, spaceShip) {
        for (let i = 0; i < planets.length; i++) {
            let p = planets[i];
            let shipFrontX = spaceShip.posX + (spaceShip.shipWidth / 2);
            let shipFrontY = spaceShip.posY;

            let distanceX = p.x - shipFrontX;
            let distanceY = p.y - shipFrontY;

            let realDistance = Math.sqrt( (distanceX * distanceX) + (distanceY * distanceY) );

            if (realDistance <= p.radius) {
                return true;
            }
        }
        return false;
    }

    checkCirclesCollision(planets, planetToPlace) {
        for (let i = 0; i < planets.length; i++) {
            let p = planets[i];

            let distanceX = p.x - planetToPlace.x;
            let distanceY = p.y - planetToPlace.y;

            let realDistance = Math.sqrt( (distanceX * distanceX) + (distanceY * distanceY) );

            if (realDistance <= (p.gravityRadius + planetToPlace.gravityRadius + (planetToPlace.gravityRadius * 1.5))
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