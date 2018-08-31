import Base from '../base';
import CollisionDetection from '../collision-detection';

export default class EquipmentBase extends Base {
    constructor(ctx, planets) {
        super();
        this.ctx = ctx;
        this.planets = planets;
        this.collisionDetection = new CollisionDetection();
        this.x = this._getXWithoutCollision();
        this.y = 0;
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
        this.ctx.globalAlpha = 1;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, this.TWO_PI);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
        this.ctx.closePath();
        return this;
    }

    isOutOfView() {
        return this.x > this.windowWidth || this.y > this.windowHeight;
    }

    _calculatePosition(speed) {
        this.y += speed;
    }

    _getXWithoutCollision() {
        this.x = this._getRandomX();
        if (this.collisionDetection.checkCirclesCollision(this.planets, this)) {
            return this._getXWithoutCollision();
        }

        return this.x;
    }
    
    _getRandomX() {
        return Math.floor(Math.random() * this.windowWidth);
    }
}