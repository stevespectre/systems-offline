import config from './config';

export default class Profile {
    constructor() {
        this.chance = this._getChance();
    }

    _getChance() {
        return localStorage.getItem('offlineChance') || config.profile.chance;
    }

    _getUpdateProgress() {
        return localStorage.getItem('offlineChance') || config.profile.chance;
    }

    _setChance() {

    }

    calcChance() {
        return true;
    }
}