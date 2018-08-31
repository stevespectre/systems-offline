import Planet from './planet';

export default class Moon extends Planet {
    constructor(ctx, planets) {
        super(ctx, planets);
        this.x = this.windowWidth / 2 + this.radius + ((this.gravityRadius - this.radius) / 2);
        this.y = (this.windowHeight / 3) * 2;
        this.vx = 0;
        this.vy = 0;
    }
}