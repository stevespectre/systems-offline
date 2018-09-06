import config from './config';

import Equipment from './equipment/index';

const SPACE_KEY_CODE = 32;

const UP_ARROW_KEY_CODE = 38;
const LEFT_ARROW_KEY_CODE = 37;
const RIGHT_ARROW_KEY_CODE = 39;

const KEY_CODE_1 = 49;

export default class Controls {
    constructor(spaceShip, backgroundStars, space, equipment) {
        this.equipment = equipment;
        this.spaceShip = spaceShip;
        this.backgroundStars = backgroundStars;
        this.space = space;
        // this.equipment = new Equipment();
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
            if (e.keyCode == SPACE_KEY_CODE || e.keyCode == UP_ARROW_KEY_CODE) {
                this.spaceShip.speedBurst();
            }

            if(e.keyCode == LEFT_ARROW_KEY_CODE && config.spaceship.turn.enabled) {
                // this.space.turn(config.spaceship.turn.angle);
                this.space.pushShip(1);
                this.spaceShip.turnLeft();
            }

            if(e.keyCode == RIGHT_ARROW_KEY_CODE && config.spaceship.turn.enabled) {
                // this.space.turn(config.spaceship.turn.angle * -1);
                this.space.pushShip(-1);
                this.spaceShip.turnRight();
            }

            if(e.keyCode == KEY_CODE_1) {
                this.equipment.activateEquipment('Beam');
            }
        });

        document.addEventListener('keyup', e => {
            e = e || window.event;
            if (e.keyCode == SPACE_KEY_CODE || e.keyCode == UP_ARROW_KEY_CODE) {
                this.spaceShip.speedStandard();
            }
        });

        this._activateEquipments();
    };

    _activateEquipments() {

        document.getElementById('beam').addEventListener('click', () => {
            this.equipment.activateEquipment('Beam');
        });
    }
}
