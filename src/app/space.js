import Base from './base.js';
import BackgroundStars from './background-stars.js';
import Planet from './planet.js';
import Earth from './earth';
import Moon from './moon';
import Spaceship from './spaceship.js';
import Score from './score.js';
import Explosion from './explosion.js';
import Equipment from './equipment.js';
import Gravity from './gravity.js';
import Profile from './profile.js';
import Controls from './controls.js';
import CollisionDetection from './collision-detection.js';
import Records from './records.js';

export default class Space extends Base {
    constructor() {
        super();

        this.planets = [];
        this.gameIsOver = false;
        this.traveledDistance = 0;
        this.maxPlanets = 5;

        this.canvas = document.getElementById('space-canvas');
        this.ctx = this.canvas.getContext("2d", { alpha: true });

        this.backgroundStars = new BackgroundStars();
        this.score = new Score();
        this.planet = new Planet();
        this.profile = new Profile();
        this.spaceShip = new Spaceship(this.ctx);
        this.controls = new Controls(this.spaceShip, this.backgroundStars);
        this.collisionDetection = new CollisionDetection();
        // this.equipment = new Equipment(this.ctx, this.planets);
        this.gravity = new Gravity(this.planets, this.spaceShip);
        this.explosion = new Explosion();
        this.record = new Records();
    }

    init() {
        this._setSpaceDimensions();
        this._addEarth();
        this._addMoon();
        this._addPlanets();

        this.backgroundStars.init();
        this.controls.init();

        return this;
    }

    startGame() {
        this.interval = setInterval(this._render.bind(this), 30);
    }

    _setSpaceDimensions() {
        this.canvas.width = this.windowWidth;
        this.canvas.height = this.windowHeight;
    }

    _render() {
        if (this.gameIsOver) {
            this._gameOver();
        }

        this._setDistance();
        if (this.traveledDistance % 100 == 0) this.score.updateScore();
        if (this.traveledDistance % 900 == 0 && this.profile.calcChance()) {
            this.equipment = new Equipment(this.ctx, this.planets);
        }

        this._clearCanvas();
        this.gravity.calcGravityImpact(this.equipment);
        this.backgroundStars.render();
        this.spaceShip.render();
        if (this.equipment != undefined) this._renderEquipment();
        this._renderPlanets();

        if (this.collisionDetection.checkObjectCollision(this.planets, this.spaceShip)) {
            this.gameIsOver = true;
        }
    }

    _setDistance() {
        this.traveledDistance += this.spaceShip.getSpeed();
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

    _renderEquipment() {
        const speed = this.spaceShip.getSpeed();
        this.equipment.render(speed);
    }

    _clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    _gameOver() {
        clearInterval(this.interval);
        this.explosion.render(this.spaceShip);
        document.body.classList.add('gameover');
        document.body.classList.remove('game');

        const score = this.score.getScore();
        document.getElementById('end-score').innerHTML = score;
        if (this.record.checkNewRecord(score)) {
            this.record.setRecord(score);
            document.getElementById('new-record').classList.add('show');
        }

        document.getElementById('record').innerHTML = this.record.getRecord();

        setTimeout(() => {
            location.reload();
        }, 10000);
    }

}