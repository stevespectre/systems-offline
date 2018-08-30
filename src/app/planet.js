import Base from './base.js';

export default class Planet extends Base {

    constructor() {
        super();
        this.planetColors = [
            'yellow',
            '#666666',
            'red'
        ];
        this.maxPlanetInARow = 3;
        this.maxPlanets = 1;
        this.gridForPlanet = this.windowWidth / this.maxPlanetInARow;
        this.minRadius;
        this.maxRadius;
        this.gravityPlanetRate = 0.33;
        this.gridFillRate = 0.78;
        this.earth = {
            radius: 75,
            color: '#00FF00',
            x: this.windowWidth/2,
            y: this.windowHeight - (75 / 2)
        }
    }

    calculatePlanetSizes() {
        const smallestViewportDimension = Math.min(this.windowWidth, this.windowHeight);
        this.gridForPlanet = smallestViewportDimension / this.maxPlanetInARow;
        this.maxRadius = this.gridForPlanet * this.gridFillRate;
        this.minRadius = (this.maxRadius / 3) * 2;
    }

    createRandomPlanet() {
        let newRadius = this.getRandomPlanetOuterRadius();
        let planetRadius =this.getPlanetRadius(newRadius);

        return {
            radius: planetRadius,
            color: this.getRandomPlanetColor(),
            gravityRadius: newRadius,
            x: this.getRandomPlanetXPos(),
            y: 0 - newRadius
        }
    }

    getRandomPlanetXPos() {
        return Math.floor(Math.random() * (this.windowWidth + this.minRadius)) - this.minRadius;
    }

    getEarthParams() {
        return this.earth;
    }

    getRandomPlanet() {
        return this.createRandomPlanet();
    }

    getPlanetRadius(radiusToReduce) {
        return radiusToReduce * this.gravityPlanetRate;
    }

    getRandomPlanetOuterRadius() {
        return Math.floor(Math.random() * (this.maxRadius - this.minRadius + 1) + this.minRadius);
    }

    getRandomPlanetColor() {
        return this.planetColors[Math.floor(Math.random() * this.planetColors.length)];
    }
}