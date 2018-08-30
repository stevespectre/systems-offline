import Base from './base.js';
import CollisionDetection from './collision-detection';
import config from './config';

export default class Planet extends Base {

    constructor(ctx, planets = []) {
        super();
        this.ctx = ctx;
        this.planets = planets;

        this.planetColors = config.planet.colors;
        this.maxPlanetInARow = config.planet.maxInARow;
        this.gravityPlanetRate = config.planet.gravityRate;
        this.gridFillRate = config.planet.gridFillRate;

        this.gridForPlanet = Math.min(this.windowWidth, this.windowHeight) / this.maxPlanetInARow;
        this.maxRadius = this.gridForPlanet * this.gridFillRate;
        this.minRadius = (this.maxRadius / 3) * 2;

        this.collisionDetection = new CollisionDetection();
        this._generateRandomParameters();
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setX(x) {
        this.x = x;
        return this;
    }

    setY(y) {
        this.y = y;
        return this;
    }

    render(speed) {
        this._calculatePosition(speed);
        this._renderGravityField();
        this._renderPlanet();
    }

    _generateRandomParameters() {
        this.color = this._getRandomPlanetColor();
        this.gravityRadius = this._getRandomPlanetOuterRadius();
        this.radius = this._getPlanetRadius();
        this.x = this._getRandomX();
        this.y = Math.floor(Math.random() * (this.windowHeight/3)*2) - this.windowHeight/6;
        this._checkCollision();
    }

    _calculatePosition(speed) {
        if (this._isOutOfView()) {
            this._generateRandomParameters();
            this.y = 0 - Math.floor(Math.random() * (this.gravityRadius * 2));
            this._checkCollision();
            return;
        }

        this.y += speed;
    }

    _isOutOfView() {
        return this.y > this.windowHeight + (this.radius * 1.5);
    }

    _checkCollision() {
        while (this.collisionDetection.checkCirclesCollision(this.planets, this)) {
            this.x = this._getRandomX();
            this.y = this.y - this.minRadius;
        }
    }

    _getRandomX() {
        return Math.floor(Math.random() * (this.windowWidth + this.minRadius)) - this.minRadius;
    }

    _getPlanetRadius() {
        return this.gravityRadius * this.gravityPlanetRate;
    }

    _getRandomPlanetOuterRadius() {
        return Math.floor(Math.random() * (this.maxRadius - this.minRadius + 1) + this.minRadius);
    }

    _getRandomPlanetColor() {
        return this.planetColors[Math.floor(Math.random() * this.planetColors.length)];
    }

    _renderPlanet() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    _renderGravityField() {
        this.ctx.globalAlpha = 0.1;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.gravityRadius, 0, 2 * Math.PI);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.globalAlpha = 1;
    }

}