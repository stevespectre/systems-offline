import Base from './base.js';

export default class Explosion extends Base {
    constructor() {
        super();
        this.canvas = document.getElementById('effects');
        this.ctx = this.canvas.getContext("2d", { alpha: true });
        this.particles = [];
        this.numParticles = 150;
    }

    _setCanvasDimensions() {
        this.canvas.width = this.windowWidth;
        this.canvas.height = this.windowHeight;
    }

    render(spaceShip) {
        this.spaceShip = spaceShip;
        this._setCanvasDimensions();
        for(var i = 0; i<this.numParticles; i++){
            this.particles.push(new Particle(this.spaceShip.getX(),this.spaceShip.getY(),Math.random()*10,Math.random()*2*Math.PI));
        }
        this.interval = setInterval(this._renderParticles.bind(this), 30);
    }

    _renderParticles(){
        this._clearCanvas();
        let i;
        for(i=0; i< this.numParticles/3; i++){
            this.ctx.fillStyle = this.particles[i].color;
            this.ctx.beginPath();
            this.ctx.arc(this.particles[i].position.getX(),this.particles[i].position.getY(), 5, 0, Math.PI*2);
            this.ctx.fill();
            this.particles[i].update();
        }

        for(i; i< this.numParticles*2/3; i++){
            this.ctx.fillStyle = this.particles[i].color;
            this.ctx.beginPath();
            this.ctx.arc(this.particles[i].position.getX(),this.particles[i].position.getY(), 3, 0, Math.PI*2);
            this.ctx.fill();

            this.particles[i].update();
        }

        for(i; i< this.numParticles; i++){
            this.ctx.fillStyle = this.particles[i].color;
            this.ctx.beginPath();
            this.ctx.arc(this.particles[i].position.getX(),this.particles[i].position.getY(), 4, 0, Math.PI*2);
            this.ctx.fill();

            this.particles[i].update();
        }
    }

    _clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class Vector {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this._generateVector();
    }

    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    setX(x){
        this.x = x;
    }
    setY(y){
        this.y = y;
    }
    setAngle(angle){
        const length = this.getLength();
        this.x = Math.cos(angle)*length;
        this.y = Math.sin(angle)*length;
    }
    setLength(length){
        const angle = this.getAngle();
        this.x = Math.cos(angle)*length;
        this.y = Math.sin(angle)*length;
    }
    getAngle(){
        return Math.atan2(this.y,this.x);
    }
    getLength() {
        return (Math.sqrt(this.x*this.x+this.y*this.y));
    }
    _generateVector(){
        this.setX(this.x);
        this.setY(this.y);
    }
    addTo(v2){
        v2.x += this.getX();
        v2.y += this.getY();
    }
}

class Particle {
    constructor(x, y, speed, angle, grav) {
        this.position = null;
        this.velocity = null;
        this.colors = [
            'rgba(105, 13, 8,'+ (Math.random() + .5) +')',
            'rgba(227,82,22,'+ (Math.random() + .5) +')',
            'rgba(237,160,77,'+ (Math.random() + .5) +')',
            'rgba(248,224,133,'+ (Math.random() + .5) +')'
        ];
        this.color = this._getRandomColor();
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.angle = angle;
        this.grav = grav;
        this._generateParticle();
    }

    _getRandomColor() {
        return this.colors[Math.floor(Math.random() * 3)];
    }

    _generateParticle(){
        let particle = this._generateParams();
        this._setParticleVelocity(particle, this.speed, this.angle);
        return particle;
    }

    _generateParams() {
        this.position = new Vector(this.x,this.y);
        this.velocity = new Vector(0,0);
    }

    _setParticleVelocity(particle, speed, angle) {
        this.velocity.setLength(speed);
        this.velocity.setAngle(angle);
    }

    update(){
        this.velocity.addTo(this.position);
    }
}