import Base from './base.js';

export default class BackgroundStars extends Base {
    constructor() {
        super();

        this.backgroundStars = document.getElementById('space-background-stars');
        this.backgroundStars.width = this.windowWidth;
        this.backgroundStars.height = this.windowHeight;
        this.ctxStars = this.backgroundStars.getContext("2d", { alpha: false });
        this.velocity = {x:0, y: -3};
        this.minRadius = 2;
        this.maxRadius = 3;
        this.starColor = '#fff';
        this.starsBg = 'rgba(0,0,0,.5)';
        this.starDensity = 4;
        this.stars = [];
    }

    initBackgroundStars() {
        this.createBackgroundStars();
        this.drawFrame();
    }

    createBackgroundStars() {
        for (let i = 0; i < (this.starDensity*10); i++) {
            let rad = this.maxRadius;
            this.createStar(rad);
            rad = this.minRadius;
            this.createStar(rad);
            this.createStar(rad);
        }
    }

    createStar(rad) {
        this.stars.push(this.generateStar(rad));
    }

    generateStar(rad) {
        return {
            alpha: Math.round((Math.random() * 100 - 70) + 70),
            radius: rad || Math.random() * 2,
            color: this.starColor,
            posX: Math.floor(Math.random() * this.windowWidth),
            posY: Math.floor(Math.random() * this.windowHeight)
        }
    }

    drawFrame() {
        this.clearCanvas();
        this.drawStar();
    }

    clearCanvas() {
        this.ctxStars.fillStyle = this.starsBg;
        this.ctxStars.fillRect(0, 0, this.windowWidth, this.windowHeight);
    }

    drawStar() {
        var s = this.stars.length;
        while(s--) {
            var star = this.stars[s];
            this.updateStars(star);
            this.starRender(star);
        }
    }

    updateStars(star) {
        star.posY += this.velocity.y === 0 ? this.velocity.y : (this.velocity.y / (1- star.radius));

        if(star.posY > this.windowHeight){
            star.posY = 0;
        }
    }

    starRender(star) {
        var x = Math.round(star.posX),
            y = Math.round(star.posY);

        this.ctxStars.save();
        this.ctxStars.globalCompositeOperation = 'lighter';
        this.ctxStars.globalAlpha = star.alpha;
        this.ctxStars.fillStyle = star.color;
        this.ctxStars.beginPath();
        this.ctxStars.moveTo(x, y);
        this.ctxStars.arc(x, y, star.radius, 0, Math.PI * 2, true);
        this.ctxStars.closePath();
        this.ctxStars.fill();
        this.ctxStars.restore();
    }

}