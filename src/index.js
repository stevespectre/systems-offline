//  './app/main'
import './styles/index.scss'

import Menu from './app/menu.js'
import Space from './app/space.js'

const space = new Space();
new Menu(space).init();
