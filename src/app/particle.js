import BaseObject from './base-object';

export default class Particle extends BaseObject {
    constructor(ctx, x, y, direction = 'bottom', spaceship) {
        super();

        this.ctx = ctx;
        this.direction = direction;
        this.spaceship = spaceship;
        this.x = x;
        this.y = y;

        this.colors = [
            'rgba(35,11,37,'+ (Math.random() + .5) +')',
            'rgba(227,82,22,'+ (Math.random() + .5) +')',
            'rgba(237,160,77,'+ (Math.random() + .5) +')',
            'rgba(248,224,133,'+ (Math.random() + .5) +')'
        ];

        this._getRandomParams();
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    _getRandomParams() {
        let growth = 0;
        switch (this.direction) {
            case 'right':
                this.vx = Math.random() * 1 + 3;
                this.vy = Math.random() * -1 + 1;
                growth = 0.015;
            break;
            case 'left':
                this.vx = Math.random() * 1 - 3;
                this.vy = Math.random() * -1 + 1;
                growth = 0.015;
            break;
            case 'bottom':
                this.vx = Math.random() * 2 - 1;
                this.vy = 4;
                growth = 0.04;
            break;
        }

        this.size = this.random(0, 1);
        this.growth = ( Math.abs(this.vx) + Math.abs(this.vy) ) * growth;
    }

    isOutOfView() {
        return this.x > this.windowWidth || this.y > this.windowHeight;
    }

    draw() {
        this.x += this.vx;
        this.y += this.vy + this.spaceship.getSpeed() / (this.x/100);
        this.size += this.growth;
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, this.TWO_PI);
        this.ctx.fill();
        this.ctx.closePath();
        
        return this;
    }
}
