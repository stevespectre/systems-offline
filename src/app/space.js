window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.cancelAnimationFrame = (function(){
    return  window.cancelAnimationFrame ||
        window.mozCancelAnimationFrame
})();

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
    constructor() {
        super();

        this.planets = [];
        this.gameIsOver = false;
        this.traveledDistance = 0;
        this.maxPlanets = 8;

        this.canvas = document.getElementById('space-canvas');
        this.ctx = this.canvas.getContext('2d', { alpha: true });

        this.score = new Score();
        this.profile = new Profile();
        this.spaceShip = new Spaceship(this.ctx);
        this.equipment = new Equipment(this.ctx, this.planets, this.spaceShip, this.profile);
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
        // this.music = new Music().playMusic();
        // this.music = new Music().init();
        // this.music.play();
        //this.interval = setInterval(this._render.bind(this), config.fps);
        this.animFrame = requestAnimationFrame(this._render.bind(this));
        return this;
    }

    resetGame() {
        if (this.interval) clearInterval(this.interval);
        if (this.animationInterval) clearInterval(this.animationInterval);

        this.explosion.reset();
        this.controls.reset();
        return this;
    }

    turnLeft() {
        if(!this.spaceShip.isAllowedToTurn()) return;
        this._turn(1);
        this.spaceShip.turnLeft();
    }

    turnRight() {
        if(!this.spaceShip.isAllowedToTurn()) return;
        this._turn(-1);
        this.spaceShip.turnRight();
    }

    _turn(direction) {

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

            this.gravity.moveObjects(direction);
        }, config.fps);
    }

    _setSpaceDimensions() {
        this.canvas.width = this.windowWidth;
        this.canvas.height = this.windowHeight;
    }

    _render() {
        const speed = this.spaceShip.getSpeed();

        if (this.gameIsOver) {
            this._gameOver();
            return;
        }

        this._setDistance();
        this._clearCanvas();
        this.updateScore();
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
        requestAnimationFrame(this._render.bind(this));
    }

    _setDistance() {
        this.traveledDistance += this.spaceShip.getSpeed();
    }

    updateScore() {
        if (!this.spaceShip.burstOn) {
            this.score.updateScore(this.traveledDistance / 2);
        } else {
            this.score.updateScore(this.traveledDistance * 2);
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

    _clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    _gameOver() {
        // clearInterval(this.interval);
        cancelAnimationFrame(this.animFrame);
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
