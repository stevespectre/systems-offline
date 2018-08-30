class Score {
    constructor() {
        this.scoreUnit = 1;
        this.score = 0;
        this.element = document.getElementById('score');
    }

    updateScore() {
        this.score += this.scoreUnit;
        this.element.innerHTML = this.score;
    }

    getScore() {
        return this.score;
    }
}

module.exports = Score;