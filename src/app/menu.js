export default class Menu {
    constructor(space) {
        this.space = space;
    }

    init() {
        document.getElementById('start').addEventListener('click', ()=> {
            this.space.init();
            document.body.classList.add('game')
        })
    }
}