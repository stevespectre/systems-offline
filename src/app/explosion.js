import Base from './base.js';

export default class Explosion extends Base {
    constructor() {
        super();
        this.canvas = document.getElementById('effects');
        this.context = this.canvas.getContext("2d", { alpha: true });
        this.colors = ["#6A0000", "#900000", "#902B2B", "#A63232", "#A62626", "#FD5039", "#C12F2A", "#FF6540", "#f93801"]
        this.minRadius = 2;
        this.maxRadius = 6;
        this.maxGrowRadius = 150;
        this.growSpeed = 2;
        this.grow = true;
        this.maxGrowSpeed = 3;
        this.velocity = 0.2;
        this.centerX = this.windowWidth/2;
        this.centerY = (this.windowHeight/3)*2;
        this.startingDistanceOffset = this.maxRadius / 2;
        this.numberOfParticles = 3;
        this.particles = [];
        this.angles = [-1, 1];
    }

    setCanvasDimensions() {
        this.canvas.width = this.windowWidth;
        this.canvas.height = this.windowHeight;
    }

    explode() {

        this.setCanvasDimensions();
        for (let i = 0; i < this.numberOfParticles; i++){
            this.particles.push(this.createParticle());
        }

        this.interval = setInterval(this.updateExplosion.bind(this), 30);
    }

    drawParticles(){
        this.particles.forEach(p => {
            this.context.beginPath();
            this.context.arc(p.x, p.y, p.r, 0, 2*Math.PI);
            this.context.fillStyle = p.c;
            this.context.fill();
            this.context.closePath();
        });
    }

    createParticle() {
        return {
            x: this.getRandomX(),
            y: this.getRandomY(),
            r: this.getRandomRadius(),
            c: this.getRandomColor(),
            aX: this.getRandomAngle(),
            aY: this.getRandomAngle()
        }
    }

    getRandomX() {
        return this.windowWidth / 2 + Math.floor(Math.random() * this.startingDistanceOffset * 2) - this.startingDistanceOffset;
    }

    getRandomY() {
        return ((this.windowWidth / 3) * 2) + Math.floor(Math.random() * this.startingDistanceOffset * 2) - this.startingDistanceOffset;
    }

    getRandomRadius() {
        return Math.floor(Math.random() * (this.maxRadius - this.minRadius + 1) + this.minRadius);
    }

    getRandomColor() {
        return this.colors[Math.floor(Math.random() * this.colors.length)];
    }

    getRandomAngle() {
        return this.angles[Math.floor(Math.random() * this.angles.length)];
    }

    updateExplosion() {
        this.clearCanvas();
        this.modifyGrowSpeed();
        this.updateParticlePositions();
        this.drawParticles();
    }

    modifyGrowSpeed() {
        if (this.growSpeed <= this.maxGrowSpeed) {
            this.growSpeed += this.velocity;
        }
    }

    updateParticlePositions() {

        this.particles.forEach(p => {
            p.r += this.growSpeed;
            p.x += this.velocity * p.aX;
            p.y += this.velocity * p.aY;
        });
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}