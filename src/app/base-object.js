import Base from './base.js';
import CollisionDetection from './collision-detection';

export default class BaseObject extends Base {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
        this.collisionDetection = new CollisionDetection();
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
}
