//  './app/main'
import './styles/index.scss'

const BACKGROUND_STARS_ON = true;

import Menu from './app/menu.js'
import Space from './app/space.js'
import BackgroundStars from './app/background-stars.js'

const backgroundStars = new BackgroundStars(BACKGROUND_STARS_ON);
const space = new Space(backgroundStars);
const menu = new Menu();

backgroundStars.init();
menu.addEventListeners(space);

// space.setupStartScene()