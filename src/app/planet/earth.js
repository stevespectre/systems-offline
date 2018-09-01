import Planet from './index';

export default class Earth extends Planet {
    constructor(ctx, planets) {
        super(ctx, planets);
        this.gravityRadius = 1;
        this.radius = 75;
        this.color = '#00FF00';
        this.x = this.windowWidth / 2;
        this.y = this.windowHeight - (75 / 2);
        this.vx = 0;
        this.vy = 0;
    }
}