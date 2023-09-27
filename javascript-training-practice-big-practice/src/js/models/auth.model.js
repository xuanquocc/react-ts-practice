import LocalStorage from '../helper/localStorage';

export default class AuthModel {
    constructor() {
        this.users = LocalStorage.getItemJSON('users') || []
        this.isAuth = LocalStorage.getItemJSON('isAuth')
    }

    register(user) {
        const checkUser = this.users.find(
            (result) => result.username === user.username,
        );

        if (!checkUser) {
            this.users.push({
                username: user.username,
                password: user.password
            })
            localStorage.setItem('users', JSON.stringify(this.users))
        }

        return checkUser

    }

    login(user) {
        const checkUser = this.users.find(
            (result) => result.username === user.username && result.password === user.password,
        );

        if (checkUser) {
            localStorage.setItem('isAuth', JSON.stringify(true))
        }

        return checkUser

    }

    logout() {
        localStorage.setItem('isAuth', JSON.stringify(false))
    }
}