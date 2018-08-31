class Score {
    constructor() {
        this.scoreUnit = 1;
        this.score = 0;
        this.element = document.getElementById('score');
    }

    updateScore(traveledDistance) {
        if (traveledDistance && traveledDistance % 100 < 1) {
            this.score += this.scoreUnit;
            this.element.innerHTML = this.score;
        }
    }

    getScore() {
        return this.score;
    }
}

module.exports = Score;