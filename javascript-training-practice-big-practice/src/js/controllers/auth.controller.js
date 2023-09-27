export default class AuthController {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.view.bindRegister(this.handleRegister)
        this.view.bindLogin(this.handleLogin)
        this.view.bindLogout(this.handleLogout)

        this.onAuthenticationChanged(this.model.isAuth)
    }


    handleRegister = async (user) => {
        const userData = await this.model.register(user)
        this.view.notificationRegister(userData)
    }

    handleLogin = async (user) => {
        const userData = await this.model.login(user)
        this.view.renderElement(userData)
        this.view.notificationLogin(userData)
    }

    onAuthenticationChanged = isAuth => {
        this.view.renderElement(isAuth)
    }

    handleLogout = () => {
        this.model.logout();
        this.view.renderElement(false)
    }
}