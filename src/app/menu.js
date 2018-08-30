export default class Menu {
    addEventListeners(space) {
        document.getElementById('start').addEventListener('click', ()=> {
            space.setupStartScene()
            document.body.classList.add('game')
        })
    }
}