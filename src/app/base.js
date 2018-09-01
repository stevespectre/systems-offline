class Base {
    constructor() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.TWO_PI = 2 * Math.PI;
    }

    random(min = 0, max = 0) {
        return Math.floor(Math.random() * (max - min + 1) ) + min;
    }
}

module.exports = Base;
