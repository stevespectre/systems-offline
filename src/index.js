import './styles/index.scss'

import Menu from './app/menu'
import Space from './app/space'

const space = new Space().init();
new Menu(space).init();
