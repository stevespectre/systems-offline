import CollisionDetection from './collision-detection';
import config from './config';

class Vector2D {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    setX(x) {
        this._x = x;
    }

    setY(y) {
        this._y = y;
    }

    getX() {
        return this._x;
    }

    getY() {
        return this._y;
    }
}

export default class Path {
    constructor(ctx, planets, spaceship) {
        this.ctx = ctx;
        this.planets = planets;
        this.spaceship = spaceship;
        this.collisionDetection = new CollisionDetection();
        this.precision = 200;
        this.durationMs = 15000;
        this.precisionVelocity = this.precision / (this.durationMs / config.fps);
    }

    render() {
        this.precision -= this.precisionVelocity;
        const coordinates = this._predictPath();
        coordinates.forEach((c, i) => {
            const opacity = (1 - i * (1/this.precision));
            this.ctx.fillStyle = `rgba(${this.color.join(',')},${opacity})`;
            this.ctx.beginPath();
            this.ctx.moveTo(c.getX(), c.getY());
            this.ctx.arc(c.getX(), c.getY(), 1, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.closePath();
        });
    }

    _predictPath() {
        const path = [];

        let prevPos = new Vector2D(this.spaceship.x + this.spaceship.width/2, this.spaceship.y);
        path.push(prevPos);

        this.color = [51, 204, 51]; // green

        for (let c = 0; c < this.precision; c++) {
            const speed = this.spaceship.getSpeed();
            const x = prevPos.getX();
            const y = prevPos.getY() - speed;

            const nextPos = new Vector2D(x, y);

            this._gravitationalPull(nextPos);

            const pos = {
                x: nextPos.getX(),
                y: nextPos.getY(),
                width: 1,
            };

            // exit if it would hit a planet!
            if (this.collisionDetection.checkObjectCollision(this.planets, pos)) {
                this.color = [255, 51, 0]; // red
                break;
            }

            path.push(nextPos);
            prevPos = nextPos;
        }

        return path;
    }

    _gravitationalPull(point) {
        this.planets.forEach(planet => {
            if (planet.isPointWithinGravityField(point)) {
                const direction = planet.getX() - point.getX() > 0 ? -1 : 1;
                const angle = (planet.gravityRadius / 1500 / this.spaceship.getSpeed()) * direction;
                point.setX(point.getX() - angle * 100);
            }
        });

        return point;
    }
}
