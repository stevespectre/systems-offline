const SPACE_KEY_CODE = 32;

class Controls {
    constructor(spaceShip, backgroundStars) {
        this.spaceShip = spaceShip;
        this.backgroundStars = backgroundStars;
    }

    init() {
        /*document.getElementById('burst').addEventListener('mousedown', () => {
            this.burst();
        });

        document.getElementById('burst').addEventListener('mouseup', () => {
            this.standard();
        });*/

        document.addEventListener('keydown', e => {
            e = e || window.event;
            if (e.keyCode == SPACE_KEY_CODE) {
                this.burst();
            }
        });

        document.addEventListener('keyup', e => {
            e = e || window.event;
            if (e.keyCode == SPACE_KEY_CODE) {
                this.standard();
            }
        });
    };

    burst() {
        this.spaceShip.speedBurst();
        this.backgroundStars.speedBurst();
        this.spaceShip.switchBurstSpeedGraphicOn();
    }

    standard() {
        this.spaceShip.speedStandard();
        this.backgroundStars.speedStandard();
        this.spaceShip.switchBurstSpeedGraphicOff();
    }
}

module.exports = Controls;