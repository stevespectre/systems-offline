export default class Menu {
    constructor(space) {
        this.space = space;
    }

    init() {
        document.getElementById('start').addEventListener('click', ()=> {
            console.log('start');
            this.space.startGame();
            document.body.classList.add('game')
        });

        document.getElementById('restart').addEventListener('click', ()=> {
            document.body.classList.remove('gameover');
            document.body.classList.add('game');
            //this.space.init().startGame();
        })

        document.querySelectorAll('.nav').forEach(menu => {
           menu.addEventListener('click', () => {
               const id = menu.id;
               document.querySelectorAll('.menu').forEach(menu => menu.classList.remove('active'));
               document.getElementById(`menu-${id}`).classList.add('active');

           });
        });
    }
}