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
            console.log('Progress has reseted!');
        });

        this._loadProfileData();
        this._updateEquipment();
    }

    _loadProfileData() {
        document.getElementById('money').innerHTML = this.profile.getProgressOfItem('money');
        document.getElementById('chance-lvl').innerHTML = this.profile.getProgressOfItem('chance');
        document.getElementById('beam-lvl').innerHTML = this.profile.getProgressOfItem('beam');
    }

    _updateEquipment() {
        document.querySelectorAll('.update-equipment').forEach(btn => {
            btn.addEventListener('click', () => {
                this.profile.updateItem(btn.dataset.update);
            });
        })
    }
}