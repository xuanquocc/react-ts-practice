export default class LocalStorage {
    static getItemJSON = (name) => {
        return JSON.parse(localStorage.getItem(name));
    }
}