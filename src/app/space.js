import Base from './base';
import BackgroundStars from './background-stars';
import Planet from './planet/index';
import Earth from './planet/earth';
import Moon from './planet/moon';
import Spaceship from './spaceship';
import Score from './score';
import Explosion from './explosion';
import Equipment from './equipment/index';
import Gravity from './gravity';
import Profile from './profile';
import Controls from './controls';
import CollisionDetection from './collision-detection';
import Records from './records';
import config from './config';
import Path from './path';
// import Music from './music';

export default class Space extends Base {
    constructor(profile) {
        super();

        this.planets = [];
        this.gameIsOver = false;
        this.traveledDistance = 0;
        this.maxPlanets = 7;

        this.canvas = document.getElementById('space-canvas');
        this.ctx = this.canvas.getContext('2d', { alpha: true });

        this.score = new Score();
        this.profile = profile;
        this.spaceShip = new Spaceship(this.ctx);
        this.equipment = new Equipment(this.ctx, this.planets, this.spaceShip, profile);
        this.controls = new Controls(this.spaceShip, this.backgroundStars, this, this.equipment);
        this.backgroundStars = new BackgroundStars();
        this.gravity = new Gravity(this.spaceShip, this.planets, this.equipment.get());

        this.collisionDetection = new CollisionDetection();
        this.explosion = new Explosion();
        this.record = new Records();
        this.path = new Path(this.ctx, this.planets, this.spaceShip);
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
         //this.music = new Music().playMusic();
        //this.music = new Music().init();
        // this.music.play();
        this.interval = setInterval(this._render.bind(this), config.fps);
    }

    turn(angle) {
        const start = Date.now();

        // cancel previous turn
        if (this.animationInterval) {
            clearInterval(this.animationInterval);
            this.spaceShip.turnEnd();
        }
        
        this.animationInterval = setInterval(() => {
            const now = Date.now();
            if (now - start >= config.spaceship.turn.duration) {
                clearInterval(this.animationInterval);
                this.spaceShip.turnEnd();
            }

            const p = (now - start) / config.spaceship.turn.duration;
            const rotationAngle = angle * this._easingOutCube(p);

            this.gravity.rotateObjects(rotationAngle / 1000);
        }, config.fps);
    }

    _easingOutCube(n){
        return --n * n * n + 1;
    }

    _setSpaceDimensions() {
        this.canvas.width = this.windowWidth;
        this.canvas.height = this.windowHeight;
    }

    _render() {

        const speed = this.spaceShip.getSpeed();

        if (this.gameIsOver) {
            this._gameOver();
        }

        this._setDistance();
        this._clearCanvas();
        this.score.updateScore(this.traveledDistance);
        this.equipment.eventuallyAdd(this.traveledDistance);
        this.gravity.calcGravityImpact();
        this.backgroundStars.render(speed);
        this.spaceShip.render();
        this.equipment.render(speed);
        this.planets.forEach(planet => planet.render(speed));
        this.path.render();

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
    }
}
