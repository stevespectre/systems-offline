export default class Menu {
    constructor(space) {
        this.space = space;
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
            console.log('Progress has reseted!');
        });
    }
}