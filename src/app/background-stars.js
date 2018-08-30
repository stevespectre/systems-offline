import Base from './base.js';
import config from './config';

export default class BackgroundStars extends Base {
    constructor() {
        super();
        this.canvas = document.getElementById('space-background-stars');
        this.canvas.width = this.windowWidth;
        this.canvas.height = this.windowHeight;
        this.ctx = this.canvas.getContext('2d', { alpha: false });
        this.velocity = { x: 0, y: -3 };
        this.minRadius = config.stars.minRadius;
        this.maxRadius = config.stars.maxRadius;
        this.starColor = config.stars.color;
        this.starsBg = 'rgba(0,0,0,.5)';
        this.bigStarDensity = config.stars.bigStarDensity;
        this.smallStarDensity = config.stars.smallStarDensity;
        this.stars = [];
    }

    init() {
        this.createBackgroundStars();
        this.render();
    }

    render() {
        if (!config.stars.enabled) {
            return;
        }
        this.clearCanvas();
        this.renderStars();
    }

    speedBurst() {
        this.velocity.y = config.spaceship.burstSpeed / 2 * -1;
    }

    speedStandard() {
        this.velocity.y = config.spaceship.speed/2 * -1;
    }

    createBackgroundStars() {
        while (this.bigStarDensity--) {
            this.createStar(this.maxRadius);
        }

        while (this.smallStarDensity--) {
            this.createStar(this.minRadius);
        }
    }

    createStar(rad) {
        this.stars.push(this.generateStar(rad));
    }

    generateStar(rad) {
        return {
            alpha: this.getRandomBrightness(),
            radius: rad || Math.random() * 2,
            color: this.starColor,
            posX: Math.floor(Math.random() * this.windowWidth),
            posY: Math.floor(Math.random() * this.windowHeight)
        }
    }

    getRandomBrightness() {
        return Math.round((Math.random() * 100 - 70) + 70);
    }

    clearCanvas() {
        this.ctx.fillStyle = this.starsBg;
        this.ctx.fillRect(0, 0, this.windowWidth, this.windowHeight);
    }

    renderStars() {
        this.stars.map(star => {
            this.updateStarPosition(star);
            this.renderStar(star);
        });
    }

    updateStarPosition(star) {
        star.posY += this.velocity.y === 0 ? this.velocity.y : (this.velocity.y / (1- star.radius));

        this.eventuallyKeepStarOnCanvas(star);
    }

    eventuallyKeepStarOnCanvas(star) {
        if(star.posY > this.windowHeight){
            star.posY = 0;
        }
    }

    renderStar(star) {
        const x = Math.round(star.posX);
        const y = Math.round(star.posY);

        this.ctx.save();
        this.ctx.globalCompositeOperation = 'lighter';
        this.ctx.globalAlpha = star.alpha;
        this.ctx.fillStyle = star.color;
        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.arc(x, y, star.radius, 0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.restore();
    }

}