import Base from './base.js';
import BackgroundStars from './background-stars.js';
import Planet from './planet.js';
import Earth from './earth';
import Moon from './moon';
import Spaceship from './spaceship.js';
import Score from './score.js';
import Explosion from './explosion.js';
import Equipments from './equipments.js';
import Gravity from './gravity.js';
import Controls from './controls.js';
import CollisionDetection from './collision-detection.js';
import Records from './records.js';

const BACKGROUND_STARS_ON = true;

export default class Space extends Base {
    constructor() {
        super();

        this.planets = [];
        this.gameIsOver = false;
        this.traveledDistance = 0;
        this.maxPlanets = 3;

        this.canvas = document.getElementById('space-canvas');
        this.ctx = this.canvas.getContext("2d", { alpha: true });

        this.score = new Score();
        this.planet = new Planet();
        this.spaceShip = new Spaceship(this.ctx);
        this.backgroundStars = new BackgroundStars(BACKGROUND_STARS_ON);
        this.controls = new Controls(this.spaceShip, this.backgroundStars);
        this.collisionDetection = new CollisionDetection();
        this.equipments = new Equipments();
        this.gravity = new Gravity(this.planets, this.spaceShip);
        this.explosion = new Explosion();
        this.record = new Records();
    }

    init() {
        this._setSpaceDimensions();
        this._addEarth();
        this._addMoon();
        this._addPlanets();

        // this.backgroundStars.init();
        this.controls.addLightSpeedButton();

        this._startGame();
    }

    _setSpaceDimensions() {
        this.canvas.width = this.windowWidth;
        this.canvas.height = this.windowHeight;
    }

    _startGame() {
        this.interval = setInterval(this._render.bind(this), 30);
    }

    _render() {
        if (this.gameIsOver) {
            this._gameOver();
        }

        this._clearCanvas();
        // this.spaceShip.render();
        this.gravity.calcGravityImpact();
        this.backgroundStars.render();
        this._renderPlanets();

        if (this.collisionDetection.checkObjectCollision(this.planets, this.spaceShip)) {
            this.gameIsOver = true;
        }
    }

    _addEarth() {
        const earth = new Earth(this.ctx, this.planets);
        this.planets.push(earth);
        this.maxPlanets--;
    }

    _addMoon() {
        const moon = new Moon(this.ctx, this.planets);
        this.planets.push(moon);
        this.maxPlanets--;
    }

    _addPlanets() {
        while(this.maxPlanets--) {
            const planet = new Planet(this.ctx, this.planets);
            this.planets.push(planet);
        }
    }

    _renderPlanets() {
        const speed = this.spaceShip.getSpeed();
        this.planets.forEach(planet => planet.render(speed));
    }

    _clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    _gameOver() {
        clearInterval(this.interval);
        this.explosion.explode();
        document.body.classList.add('gameover');

        let score = this.score.getScore();
        document.getElementById('end-score').innerHTML = score;
        if (this.record.checkNewRecord(score)) {
            this.record.setRecord(score);
            console.log('score',score);

            document.getElementById('new-record').classList.add('show');
        }

        document.getElementById('record').innerHTML = this.record.getRecord();

        setTimeout(() => {
            location.reload();
        }, 10000);

    }

    /*setupStartScene() {
        //this.setSpaceDimensions();
        //this.planet.calculatePlanetSizes();

        // this.setStartingPlanetToEarth(this.planets[0]);
        // this.setFirstPlanetCoordinates(this.planets[1]);
        this.setPlanetsStartingPosition();

        //this.drawPlanets();
        this.createSpaceShip();
        //this.backgroundStars.init();
        //this.controls.addLightSpeedButton();
        // this.startGame();
    }

    setPlanetsStartingPosition() {
        for (let i = 2; i < this.planets.length; i++) {
            let p = this.planets[i];
            p.y = Math.floor(Math.random() * (this.windowHeight/3)*2) - this.windowHeight/6;
            p.x = this.calculateXCoordinateWithoutCollision(p);
        }
    }*/

    /*setStartingPlanetToEarth(earth) {
        let earthParams = this.planet.getEarthParams();
        earth.x = earthParams.x;
        earth.y = earthParams.y;
        earth.color = earthParams.color;
        earth.radius = earthParams.radius;
        earth.gravityRadius = 1;
    }*/

    /*setFirstPlanetCoordinates(moon) {
        console.log('moon',moon);
        moon.x = this.windowWidth / 2 + moon.radius + ((moon.gravityRadius - moon.radius) / 2 );
        //moon.x = this.windowWidth / 2;
        moon.y = (this.windowHeight / 3) * 2;
    }*/



    /*updateGameArea() {
        if (this.gameIsOver) {
            this.gameOver();
        }
        this.calculatePlanetsNewPositions();
        this.traveledDistance += this.spaceShip.getSpeed();
        if (this.score.getScore() % 5 == 0) {

        }
        if (this.traveledDistance % 100 == 0) {
            this.score.updateScore();
        }
        if (this.traveledDistance % 10 == 0) {

            this.backgroundStars.renderFrame();

            if (this.collisionDetection.checkObjectCollision(this.planets, this.spaceShip)) {
                this.gameIsOver = true;
            }

            this.gravity.addGravityEffect(this.planets, this.spaceShip);
        }

        this.clearCanvas();
        this.drawPlanets();
    }*/

    /*addNewPlanet() {
        this.planets.push(this.planet.getRandomPlanet(this.planets));
    }*/



    /*calculatePlanetsNewPositions() {
        this.planets.forEach(planet => {
            if (planet.y > this.windowHeight + (planet.radius * 2) ) {
                return this.keepPlanetInView(planet);
            }
            planet.y += this.spaceShip.getSpeed();
        });
    }*/

    /*keepPlanetInView(planet) {
        planet.color = this.planet.getRandomPlanetColor();
        planet.gravityRadius = this.planet.getRandomPlanetOuterRadius();
        planet.radius = this.planet.getPlanetRadius(planet.gravityRadius);
        planet.y = 0 - Math.floor(Math.random() * (planet.gravityRadius * 1.5));
        planet.x = this.calculateXCoordinateWithoutCollision(planet);
    }

    calculateXCoordinateWithoutCollision(planet) {
        let newPlanetX = this.planet.getRandomPlanetXPos();
        planet.x = newPlanetX;
        while (this.collisionDetection.checkCirclesCollision(this.planets, planet)) {
            newPlanetX = planet.x = this.planet.getRandomPlanetXPos();
            planet.y = planet.y - this.planet.minRadius;
        }

        return newPlanetX;
    }*/

    /*createSpaceShip() {
        this.spaceShip = new Spaceship();
        // this.spaceShip.drawShip(this.context);
    }*/

    /*drawPlanets() {
        this.planets.forEach(planet => {

            this.ctx.globalAlpha = 0.1;
            this.ctx.beginPath();
            this.ctx.arc(planet.x, planet.y, planet.gravityRadius, 0, 2*Math.PI);
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fill();
            this.ctx.closePath();
            this.ctx.globalAlpha = 1;

            this.ctx.beginPath();
            this.ctx.arc(planet.x, planet.y, planet.radius, 0, 2*Math.PI);
            this.ctx.fillStyle = planet.color;
            this.ctx.fill();
            this.ctx.closePath();

        });
    }*/


}