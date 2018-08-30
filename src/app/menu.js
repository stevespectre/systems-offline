export default class Menu {
    constructor(space) {
        this.space = space;
    }

    init() {
        document.getElementById('start').addEventListener('click', ()=> {
            this.space.startGame();
            document.body.classList.add('game')
        })
    }
}