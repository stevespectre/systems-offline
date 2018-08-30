import config from './config';

export default class Profile {
    constructor() {
        this.chance = config.profile.chance;
    }

    _getChance() {
        return localStorage.getItem('offlineChance') || config.profile.chance;
    }

    _setChance() {

    }

    calcChance() {
        return true;
    }
}