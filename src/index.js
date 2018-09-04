import './styles/index.scss'

import Profile from './app/profile'
import Menu from './app/menu'
import Space from './app/space'

const profile = new Profile();
const space = new Space(profile).init();
new Menu(space, profile).init();
