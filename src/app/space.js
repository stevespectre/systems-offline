import Base from './base.js';
import BackgroundStars from './background-stars.js';
import Planet from './planet.js';
import Spaceship from './spaceship.js';
import Score from './score.js';
import Explosion from './explosion.js';
import Equipments from './equipments.js';
import Gravity from './gravity.js';
import Controls from './controls.js';
import CollisionDetection from './collision-detection.js';
import Records from './records.js';

export default class Space extends Base {
    constructor() {
        super();
        this.canvas = document.getElementById('space-canvas');
        this.context = this.canvas.getContext("2d", { alpha: true });
        this.traveledDistance = 0;
        this.score = new Score();
        this.planet = new Planet();
        this.planets = [];
        this.backgroundStars = new BackgroundStars();
        this.collisionDetection = new CollisionDetection();
        this.equipments = new Equipments();
        this.gravity = new Gravity();
        this.gameIsOver = false;
        this.explosion = new Explosion();
        this.record = new Records();
    }

    setSpaceDimensions() {
        this.canvas.width = this.windowWidth;
        this.canvas.height = this.windowHeight;
    }

    setupStartScene() {
        this.setSpaceDimensions();
        this.planet.calculatePlanetSizes();

        while(this.planet.maxPlanets--) {
            this.addNewPlanet();
        }

        this.setStartingPlanetToEarth(this.planets[0]);
        this.setFirstPlanetCoordinates(this.planets[1]);
        this.setPlanetsStartingPosition();

        this.drawPlanets();
        this.createSpaceShip();
        this.initBackgroundStars();
        this.startGame();
    }

    setPlanetsStartingPosition() {
        for (let i = 2; i < this.planets.length; i++) {
            let p = this.planets[i];
            p.y = Math.floor(Math.random() * (this.windowHeight/3)*2) - this.windowHeight/6;
            p.x = this.calculateXCoordinateWithoutCollision(p);
        }
    }

    setStartingPlanetToEarth(earth) {
        let earthParams = this.planet.getEarthParams();
        earth.x = earthParams.x;
        earth.y = earthParams.y;
        earth.color = earthParams.color;
        earth.radius = earthParams.radius;
        earth.gravityRadius = 1;
    }

    setFirstPlanetCoordinates(moon) {
        console.log('moon',moon);
        moon.x = this.windowWidth / 2 + moon.radius + ((moon.gravityRadius - moon.radius) / 2 );
        //moon.x = this.windowWidth / 2;
        moon.y = (this.windowHeight / 3) * 2;
    }

    initBackgroundStars() {
        this.backgroundStars.init();
    }

    startGame() {
        this.interval = setInterval(this.updateGameArea.bind(this), 30);
    }

    updateGameArea() {
        if (this.gameIsOver) {
            this.gameOver();
        }

        this.calculatePlanetsNewPositions();
        this.traveledDistance += this.spaceShip.actualSpeed;

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

        // this.spaceShip.drawShip(this.context);
    }

    addNewPlanet() {
        this.planets.push(this.planet.getRandomPlanet(this.planets));
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    calculatePlanetsNewPositions() {
        this.planets.forEach(planet => {
            if (planet.y > this.windowHeight + (planet.radius * 2) ) {
                this.keepPlanetInView(planet);
            } else {
                planet.y += this.spaceShip.actualSpeed;
            }
        });
    }

    keepPlanetInView(planet) {
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
    }

    createSpaceShip() {
        this.spaceShip = new Spaceship();
        // this.spaceShip.drawShip(this.context);
        this.lightSpeedButton = new Controls().addLightSpeedButton(this.spaceShip, this.backgroundStars);
    }

    drawPlanets() {
        this.planets.forEach(planet => {

            this.context.globalAlpha = 0.1;
            this.context.beginPath();
            this.context.arc(planet.x, planet.y, planet.gravityRadius, 0, 2*Math.PI);
            this.context.fillStyle = '#ffffff';
            this.context.fill();
            this.context.closePath();
            this.context.globalAlpha = 1;

            this.context.beginPath();
            this.context.arc(planet.x, planet.y, planet.radius, 0, 2*Math.PI);
            this.context.fillStyle = planet.color;
            this.context.fill();
            this.context.closePath();

        });
    }

    gameOver() {
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
}