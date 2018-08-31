import Base from './base.js';

export default class Explosion extends Base {
    constructor() {
        super();
        this.canvas = document.getElementById('effects');
        this.ctx = this.canvas.getContext("2d", { alpha: true });
        this.particles = [];
        this.numParticles = 200;
    }

    _setCanvasDimensions() {
        this.canvas.width = this.windowWidth;
        this.canvas.height = this.windowHeight;
    }

    render() {
        this._setCanvasDimensions();
        for(var i = 0; i<this.numParticles; i++){
            this.particles.push(new Particle(this.windowWidth/2,(this.windowHeight/3)*2,Math.random()*10,Math.random()*2*Math.PI));
        }
        this.interval = setInterval(this._renderParticles.bind(this), 30);
    }

    _renderParticles(){
        this._clearCanvas();
        let i;
        for(i=0; i< this.numParticles/3; i++){
            this.ctx.beginPath();
            this.ctx.arc(this.particles[i].position.getX(),this.particles[i].position.getY(), 4, 0, Math.PI*2);
            this.ctx.fill();
            console.log('this.particles[i]',this.particles[i]);
            this.particles[i].update();
        }

        for(i; i< this.numParticles*2/3; i++){
            this.ctx.beginPath();
            this.ctx.arc(this.particles[i].position.getX(),this.particles[i].position.getY(), 2, 0, Math.PI*2);
            this.ctx.fill();

            this.particles[i].update();
        }

        for(i; i< this.numParticles; i++){
            this.ctx.beginPath();
            this.ctx.arc(this.particles[i].position.getX(),this.particles[i].position.getY(), 3, 0, Math.PI*2);
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

        // return obj;
    }
    add(v2){
        const x = this.x + v2.x;
        const y = this.y + v2.y;

        return this._generateVector(x,y);
    }
    addTo(v2){
        v2.x += this.getX();
        v2.y += this.getY();
    }
    subtract(v2){
        const x = this.x - v2.x;
        const y = this.y - v2.y;

        const o = this._generateVector(x,y);
        return o;
    }
    subtractFrom(v2){
        v2.setX(v2.getX() - this.getX());
        v2.setY(v2.getY() - this.getY());
    }
    multiply(val){
        this.x *= val;
        this.y *= val;
    }
}

class Particle {
    constructor(x, y, speed, angle, grav) {
        this.position = null;
        this.velocity = null;
        this.color = 'red';
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.angle = angle;
        this.grav = grav;
        //this.vector = new Vector();
        this._generateParticle();
    }

    _generateParticle(){
        let particle = this._generateParams();
        this._setParticleVelocity(particle, this.speed, this.angle);
        return particle;
    }

    _generateParams() {
        return {
            position: new Vector(this.x,this.y),
            velocity: new Vector(0,0)
        }
    }

    _setParticleVelocity(particle, speed, angle) {
        particle.velocity.setLength(speed);
        particle.velocity.setAngle(angle);
    }

    update(){
        this.velocity.addTo(this.position);
    }
}