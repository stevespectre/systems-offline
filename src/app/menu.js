export default class Menu {
    addEventListeners(space) {
        document.getElementById('start').addEventListener('click', ()=> {
            space.init();
            document.body.classList.add('game')
        })
    }
}