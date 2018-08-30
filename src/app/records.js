export default class Records {
    checkNewRecord(score) {
        if (score > this.getRecord()) return true;
    }

    setRecord(score) {
        localStorage.setItem('offlineRecord', score);
    }

    getRecord() {
        return localStorage.getItem('offlineRecord');
    }
}