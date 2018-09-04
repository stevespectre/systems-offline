import config from './config';

export default class Profile {
    constructor() {
        this.progress = this._getStoredProfileData();
    }

    _getStoredProfileData() {
        return  JSON.parse(localStorage.getItem('offlineProfileData')) || config.profile.progress;
    }

    _saveToLocalStorage() {
        localStorage.setItem('offlineProfileData', JSON.stringify(this.progress));
    }

    getProgressOfItem(item) {
        return this.progress[item]
    }

    updateItem(item) {
        console.log('update',item);
        this.progress[item]++;
        this._saveToLocalStorage();
    }
}