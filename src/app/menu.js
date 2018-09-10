import Profile from './profile'
import Space from './space';

export default class Menu {
    constructor() {
        this.space = new Space().init();
        this.profile = new Profile();
        this.intro = this._isIntroSeen();
    }

    init() {
        if (this.intro) {
            document.getElementById('legend').classList.add('active');
            this.profile.updateItem('intro', 1);
        } else {
            document.getElementById('main-menu').classList.add('active');
        }

        document.getElementById('start').addEventListener('click', ()=> {
            this.space.startGame();
            document.body.classList.add('game')
        });

        document.getElementById('restart').addEventListener('click', ()=> {
            // window.location.reload();
            document.body.classList.remove('gameover');
            document.body.classList.add('game');
            this.space.resetGame();
            this.space = new Space().init().startGame();
        });

        document.getElementById('back-to-menu').addEventListener('click', ()=> {
            window.location.reload();
        });

        document.querySelectorAll('.nav').forEach(menu => {
           menu.addEventListener('click', () => {
               const target = menu.dataset.target;
               document.querySelectorAll('.menu').forEach(menu => menu.classList.remove('active'));
               document.getElementById(target).classList.add('active');

           });
        });

        document.getElementById('reset-progress').addEventListener('click', ()=> {
            localStorage.removeItem('offlineChance');
            localStorage.removeItem('offlineProfileData');
            localStorage.removeItem('offlineMoney');
            localStorage.removeItem('offlineRecord');
            window.location.reload();
        });

        this._updateDataInMenu();
        this._updateEquipment();
    }

    _isIntroSeen() {
        return !this.profile.getProgressOfItem('intro');
    }

    _updateDataInMenu() {
        document.getElementById('money').innerHTML = this.profile.getProgressOfItem('money');
        document.getElementById('money-collected').innerHTML = this.profile.getProgressOfItem('money');

        this.updateLevelAndPrice('chance');
        this.updateLevelAndPrice('beam');
        this.updateLevelAndPrice('fuel');
        this.updateLevelAndPrice('plasma');

        this.space.spaceShip.setStartingFuelLevel();
    }

    updateLevelAndPrice(item) {
        document.getElementById(`${ item }-lvl`).innerHTML = this.profile.getProgressOfItem(item);
        document.getElementById(`${ item }-price`).innerHTML = parseInt(this.profile.getProgressOfItem(item) *2);
    }

    _updateEquipment() {
        document.querySelectorAll('.update-equipment').forEach(btn => {
            btn.addEventListener('click', () => {
                const price = btn.querySelector('.price').innerHTML;
                if (this._isEnoughMoneyToUpdate(price)) {
                    this.profile.updateItem(btn.dataset.update, 1);
                    this.profile.updateItem('money', -1 * parseInt(price));
                    this._updateDataInMenu();
                }
            });
        })
    }

    _isEnoughMoneyToUpdate(price) {
        return parseInt(this.profile.getProgressOfItem('money')) >= price;
    }

}