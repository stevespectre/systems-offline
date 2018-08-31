import Base from './base.js';

export default class BaseObject extends Base {
    constructor() {
        super();
        this.x = 0;
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
}
