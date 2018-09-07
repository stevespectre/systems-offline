import BaseObject from '../base-object';
import config from '../config';

export default class Planet extends BaseObject {
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
        this.moons = [];

        this._generateRandomParameters();
    }

    render(speed) {
        this._calculatePosition(speed);
        this._renderPlanet();
        this._renderSunLightSurface();
        this._renderGravityField();
        this.moons.forEach(m => m.render());
        this.craters.render();
    }

    isPointWithinGravityField(point) {
        const distanceX = this.getX() - point.getX();
        const distanceY = this.getY() - point.getY();

        const realDistance = Math.sqrt((distanceX * distanceX) + (distanceY * distanceY));

        return realDistance <= this.gravityRadius && realDistance > this.radius;
    }

    newParametersAfterDestroyed(planet) {
        planet.color = this._getRandomColor();
        planet.gravityRadius = this._getRandomPlanetOuterRadius();
        planet.radius = this._getPlanetRadius();
        planet.x = this._getRandomX();
        planet.y = Math.floor(Math.random() * (this.windowHeight/3)*2) - this.windowHeight/6;
        planet.vx = Math.floor(Math.random() * config.planet.maxVelocity);
        planet.vy = Math.floor(Math.random() * config.planet.maxVelocity);
        planet._checkCollision();
        planet.craters = new Craters(this.ctx, this);
        planet._generateRandomMoons();

        return planet;
    }

    _generateRandomParameters() {
        this.color = this._getRandomColor();
        this.gravityRadius = this._getRandomPlanetOuterRadius();
        this.radius = this._getPlanetRadius();
        this.x = this._getRandomX();
        this.y = Math.floor(Math.random() * (this.windowHeight/3)*2) - this.windowHeight/6;
        this.vx = Math.floor(Math.random() * config.planet.maxVelocity);
        this.vy = Math.floor(Math.random() * config.planet.maxVelocity);
        this._checkCollision();
        this.craters = new Craters(this.ctx, this);
        this._generateRandomMoons();
    }

    _generateRandomMoons() {
        this.moons = [];
        for(let i = 0; i < this.random(0, config.planet.maxMoonCount); i++) {
            const moon = new Moon(this.ctx, this);
            this.moons.push(moon);
        }
    }
    
    _calculatePosition(speed) {
        if (this._isOutOfView()) {
            this._generateRandomParameters();
            this.y = 0 - Math.floor(Math.random() * (this.gravityRadius * 2));
            this._checkCollision();
            return;
        }

        this.y += speed + this.vy;
        this.x += this.vx;
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

    _getRandomColor() {
        return config.planet.colors[Math.floor(Math.random() * config.planet.colors.length)];
    }

    _renderPlanet() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, this.TWO_PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    _renderGravityField() {
        this.ctx.globalCompositeOperation = 'destination-over';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.gravityRadius, 0, this.TWO_PI);
        this.ctx.fillStyle = 'rgba(255,255,255,.1)';
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.globalCompositeOperation = 'source-over';
    }

    _renderSunLightSurface() {
        const xOffset = this.radius / 3 ;
        this.ctx.globalCompositeOperation = 'source-atop';

        this.ctx.fillStyle = 'rgba(255,255,255,.1)';
        this.ctx.beginPath();
        this.ctx.arc(this.x - xOffset, this.y, this.radius, 0, this.TWO_PI);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.globalCompositeOperation = 'source-over';
    }
}

class Moon extends BaseObject {
    constructor(ctx, planet) {
        super();
        this.ctx = ctx;
        this.planet = planet;

        this.theta = this.random(this.TWO_PI);
        this.radius = this.random(5, 10);
        this.period = this.random(20, 100) + this.radius;
        this.freq = 1 / this.period;

        const minOrbit = this.planet.radius + this.radius * 2;
        const maxOrbit = this.planet.gravityRadius + this.radius;
        this.orbitRadius = this.random(minOrbit, maxOrbit);

        this.color = this._getRandomColor();
    }

    render() {
        this._calculatePosition();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, this.TWO_PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();

        this._renderSunLightSurface();
    }

    _calculatePosition() {
        this.theta += this.freq;
		if(this.theta >= this.TWO_PI) this.theta = 0;

		this.x = (this.orbitRadius * Math.cos(this.theta)) + this.planet.getX();
        this.y = (this.orbitRadius * Math.sin(this.theta)) + this.planet.getY();
    }

    _renderSunLightSurface() {
        const xOffset = this.radius / 3 ;
        this.ctx.globalCompositeOperation = 'source-atop';

        this.ctx.fillStyle = 'rgba(255,255,255,.1)';
        this.ctx.beginPath();
        this.ctx.arc(this.x - xOffset, this.y, this.radius, 0, this.TWO_PI);
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.globalCompositeOperation = 'source-over';
    }

    _getRandomColor() {
        return config.planet.colors[Math.floor(Math.random() * config.planet.colors.length)];
    }
}

class Craters extends BaseObject {
    constructor(ctx, planet) {
        super();
        this.ctx = ctx;
        this.planet = planet;
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

class Crater extends BaseObject {
    constructor(ctx, planet) {
        super();
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

    render() {
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(0,0,0,.1)';
        this.ctx.arc(this.planet.getX() - this.x, this.planet.getY() - this.y, this.radius, 0, this.TWO_PI);
        this.ctx.fill();
        this.ctx.closePath();
        return this;
    }
}