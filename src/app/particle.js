import Base from './base';

export default class Particle extends Base {
    constructor(ctx, x, y) {
        super();

        this.ctx = ctx;
        this.x = x;
        this.y = y;

        this.colors = [
            'rgba(35,11,37,'+ (Math.random() + .5) +')',
            'rgba(227,82,22,'+ (Math.random() + .5) +')',
            'rgba(237,160,77,'+ (Math.random() + .5) +')',
            'rgba(248,224,133,'+ (Math.random() + .5) +')'
        ];
    }

    isOutOfView() {
        return this.x > this.windowWidth || this.y > this.windowHeight;
    }

    draw() {
        this.x += this.vx;
        this.y += this.vy;
        this.size += this.growth;

        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    get() {
        this.vx = Math.random() * 2 - 1;
        this.vy = 4;
        this.size = Math.random() * 2;
        this.growth = ( Math.abs(this.vx) + Math.abs(this.vy) ) * 0.04;
        this.color = this.colors[Math.floor(Math.random() * 3)];

        return this;
    }
}
