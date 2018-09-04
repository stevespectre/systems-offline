import config from './config';

export default class Profile {
    constructor() {
        this.chance = this._getChance();
        this.money = this.getMoney();
    }

    _getChance() {
        return localStorage.getItem('offlineChance') || config.profile.chance;
    }

    getMoney() {
        return localStorage.getItem('offlineMoney') || 0;
    }

    setMoney() {
        localStorage.setItem('offlineMoney', this.money);
    }

    addMoney() {
        this.money++;
        this.setMoney();
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