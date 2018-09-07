import config from './config';

const SPACE_KEY_CODE = 32;
const UP_ARROW_KEY_CODE = 38;
const LEFT_ARROW_KEY_CODE = 37;
const RIGHT_ARROW_KEY_CODE = 39;

const KEY_CODE_1 = 49;
const KEY_CODE_2 = 50;

export default class Controls {
    constructor(spaceShip, backgroundStars, space, equipment) {
        this.equipment = equipment;
        this.spaceShip = spaceShip;
        this.backgroundStars = backgroundStars;
        this.space = space;
    }

    init() {
        document.addEventListener('keydown', e => {
            e = e || window.event;
            if (e.keyCode == SPACE_KEY_CODE || e.keyCode == UP_ARROW_KEY_CODE) {
                this.spaceShip.speedBurst();
            }

            if(e.keyCode == LEFT_ARROW_KEY_CODE) {
                this.space.turnLeft();
            }

            if(e.keyCode == RIGHT_ARROW_KEY_CODE) {
                this.space.turnRight();
            }

            if(e.keyCode == KEY_CODE_1) {
                this.equipment.activateEquipment('beam');
            }

            if(e.keyCode == KEY_CODE_2) {
                this.equipment.activateEquipment('plasma');
            }
        });

        document.addEventListener('keyup', e => {
            e = e || window.event;
            if (e.keyCode == SPACE_KEY_CODE || e.keyCode == UP_ARROW_KEY_CODE) {
                this.spaceShip.speedStandard();
            }
        });

        document.addEventListener('touchstart', e => {
            this.spaceShip.speedBurst();
        });

        document.addEventListener('touchend', e => {
            this.spaceShip.speedStandard();
        });

        this._activateEquipments();
    };
    
    reset() {
        this._resetEquipmentButton('beam');
        this._resetEquipmentButton('plasma');
    }

    _resetEquipmentButton(selector) {
        const domElement = document.getElementById(selector);
        domElement.classList.add('out');
        domElement.innerHTML = 0;
    }

    _activateEquipments() {
        ['beam', 'plasma'].forEach(equipmentName => {
            const element = document.getElementById(equipmentName);

            ['click', 'touchstart'].forEach(eventName => {
                element.addEventListener(eventName, () => {
                    this.equipment.activateEquipment(equipmentName);
                });
            });
        });
    }
}
