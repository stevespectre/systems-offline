//  './app/main'
import './styles/index.scss'

import Menu from './app/menu.js'
import Space from './app/space.js'
import BackgroundStars from './app/background-stars.js'

const space = new Space();
const menu = new Menu();
const backgroundStars = new BackgroundStars();

backgroundStars.init();
menu.addEventListeners(space);

// space.setupStartScene()