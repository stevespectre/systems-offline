class Score {
    constructor() {
        this.scoreUnit = 1;
        this.score = 0;
    }

    updateScore() {
        this.score += this.scoreUnit;
        document.getElementById('score').innerHTML = this.score;
    }

    getScore() {
        return this.score;
    }
}

module.exports = Score;