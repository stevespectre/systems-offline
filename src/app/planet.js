import Base from './base.js';
import CollisionDetection from './collision-detection';
import config from './config';

const TWO_PI = 2 * Math.PI;

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
        this._renderPlanet();
        this._renderSunShadowSurface();
        this._renderGravityField();

        this.craters.render();
    }

    _generateRandomParameters() {
        this.color = this._getRandomPlanetColor();
        this.gravityRadius = this._getRandomPlanetOuterRadius();
        this.radius = this._getPlanetRadius();
        this.x = this._getRandomX();
        this.y = Math.floor(Math.random() * (this.windowHeight/3)*2) - this.windowHeight/6;
        this._checkCollision();
        this.craters = new Craters(this.ctx, this);
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
        this.ctx.globalAlpha = 1;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, TWO_PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    _renderGravityField() {
        this.ctx.globalCompositeOperation = 'destination-over';
        this.ctx.globalAlpha = 0.1;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.gravityRadius, 0, TWO_PI);
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.globalAlpha = 1;
        this.ctx.globalCompositeOperation = 'source-over';
    }

    _renderSunShadowSurface() {
        const xOffset = this.radius / 3 ;
        this.ctx.globalCompositeOperation = 'source-atop';

        this.ctx.fillStyle = '#aaa';
        this.ctx.beginPath();
        this.ctx.arc(this.x - xOffset, this.y, this.radius, 0, TWO_PI);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.globalCompositeOperation = 'source-over';
    }
}

class Craters {
    constructor(ctx, planet) {
        this.ctx = ctx;
        this.planet = planet;
        this.collisionDetection = new CollisionDetection();
        this.craters = this._generateRandomCraters();
    }

    render() {
        this.craters.forEach(c => c.render());
    }

    _generateRandomCraters() {  
        const craters = [];
        const count = Math.floor(Math.random() * config.planet.maxCraterCount);
        for(let i = 0; i <= count; i++) {
            craters.push(this._getRandomCrater(craters));
        }

        return craters;
    }

    _getRandomCrater(craters) {
        const crater = new Crater(this.ctx, this.planet);
        if (this.collisionDetection.checkCirclesCollision(craters, crater)) {
            return this._getRandomCrater(craters);
        }

        return crater;
    }
}

class Crater {
    constructor(ctx, planet) {
        this.ctx = ctx;
        this.planet = planet;

        const maxRadius = this.planet.radius / 5;
        const minRadius = maxRadius / 2;

        this.radius = Math.floor(Math.random() * maxRadius) + minRadius;
        this.radialDifference = this.planet.radius - this.radius;

        // todo only to support collision detection - refactor needed!
        this.gravityRadius = this.radius;

        this.x = this.radialDifference / Math.floor(Math.random() * 10) - 10;
        this.y = this.radialDifference / Math.floor(Math.random() * 10) - 10;
    }

    getY() {
        return this.y;
    }

    getX() {
        return this.x;
    }

    render() {
        this.ctx.beginPath();
        this.ctx.globalAlpha = 0.1;
        this.ctx.fillStyle = '#000000';
        this.ctx.arc(this.planet.x - this.x, this.planet.y - this.y, this.radius, 0, TWO_PI);
        this.ctx.fill();
        this.ctx.closePath();
        return this;
    }
}