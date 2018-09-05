export default class Menu {
    constructor(space, profile) {
        this.space = space;
        this.profile = profile;
    }

    init() {
        document.getElementById('start').addEventListener('click', ()=> {
            this.space.startGame();
            document.body.classList.add('game')
        });

        document.getElementById('restart').addEventListener('click', ()=> {
            document.body.classList.remove('gameover');
            document.body.classList.add('game');
            //this.space.init().startGame();
        });

        document.querySelectorAll('.nav').forEach(menu => {
           menu.addEventListener('click', () => {
               const target = menu.dataset.target;
               document.querySelectorAll('.menu').forEach(menu => menu.classList.remove('active'));
               document.getElementById(target).classList.add('active');

           });
        });

        document.getElementById('reset-progress').addEventListener('click', ()=> {
            localStorage.removeItem('collectedEquipments');
            localStorage.removeItem('offlineChance');
            localStorage.removeItem('offlineProfileData');
            localStorage.removeItem('offlineMoney');
            localStorage.removeItem('offlineRecord');
            console.log('Progress has reseted!');
        });

        this._updateDataInMenu();
        this._updateEquipment();
    }

    _updateDataInMenu() {
        document.getElementById('money').innerHTML = this.profile.getProgressOfItem('money');
        document.getElementById('chance-lvl').innerHTML = this.profile.getProgressOfItem('chance');
        document.getElementById('chance-price').innerHTML = parseInt(this.profile.getProgressOfItem('chance') *2);
        document.getElementById('beam-lvl').innerHTML = this.profile.getProgressOfItem('beam');
        document.getElementById('beam-price').innerHTML = parseInt(this.profile.getProgressOfItem('beam') *2);
    }

    _updateEquipment() {
        document.querySelectorAll('.update-equipment').forEach(btn => {
            btn.addEventListener('click', () => {
                const price = btn.querySelector('.price').innerHTML;
                console.log('price',price);
                if (this._isEnoughMoneyToUpdate(price)) {
                    this.profile.updateItem(btn.dataset.update, 1);
                    this.profile.updateItem('money', -1 * parseInt(price));
                    this._updateDataInMenu();
                }
            });
        })
    }

    _isEnoughMoneyToUpdate(price) {
        if (parseInt(this.profile.getProgressOfItem('money')) >= price) {
            return true;
        }

        return false;
    }

}