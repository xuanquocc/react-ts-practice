import Validate from "../helper/validation";
import { resetValidate, serializeForm } from '../helper/UtilForm';
import { MESSAGE } from '../constants/message'

export default class AuthView {
    constructor() {
        //Register
        this.registerForm = document.querySelector(".form-register");
        this.registerBtn = document.querySelector("#registerBtn");

        //Login
        this.loginForm = document.querySelector(".form-login");
        this.loginBtn = document.querySelector("#loginBtn");

        //Logout
        this.logoutBtn = document.querySelector("#logoutBtn");

        this.btnAddNewProduct = document.querySelector("#btnAddNewProduct");
        this.btnAddNewProduct = document.querySelector("#btnAddNewProduct");
    }

    renderElement = (isAuth) => {
        this.tableAction = document.querySelectorAll(".table-action");
        if (isAuth) {
            this.loginBtn.style.display = "none";
            this.registerBtn.style.display = "none";
            this.logoutBtn.style.display = "block";
            this.btnAddNewProduct.style.display = "block";
            this.tableAction.forEach((btn) => {
                btn.style.display = "table-cell";
            });
        } else {
            this.loginBtn.style.display = "block";
            this.registerBtn.style.display = "block";
            this.logoutBtn.style.display = "none";
            this.btnAddNewProduct.style.display = "none";
            this.tableAction.forEach((btn) => {
                btn.style.display = "none";
            });
        }
    };

    notificationLogin = (status) => {
        !status ?
            document.querySelector(".status-login").innerText = MESSAGE.LOGIN_MESSAGE
            : ($("#login").modal("hide"),
                this.loginForm.reset(),
                document.querySelector(".status-login").innerText = ""
            )
    }

    notificationRegister = status => {
        status ?
            document.querySelector(".status-username").innerText = MESSAGE.REGISTER_MESSAGE
            : ($("#registerModal").modal("hide"),
                this.registerForm.reset(),
                document.querySelector(".status-username").innerText = "",
                alert("Register Success!")
            )
    }

    //Register
    showModalRegister = () => {
        this.registerBtn.addEventListener("click", () => {
            $("#registerModal").modal("show");
            resetValidate(this.registerForm)
        });
    };

    bindRegister(handler) {
        this.showModalRegister();
        const validator = new Validate({
            form: '.form-login',
            errorSelector: 'small',
            rules: [
                'username:isRequired',
                'password:isRequired',
                'username:isUsername',
                'password:isPassword'
            ],
            onSubmit: () => {
                const formData = serializeForm(document.querySelector('.form-register'))
                handler(formData)
            }
        })
    }

    //Login
    showModalLogin = () => {
        this.loginBtn.addEventListener("click", () => {
            $("#login").modal("show");
            resetValidate(this.loginForm)
        });
    };

    bindLogin(handler) {
        this.showModalLogin();
        const validator = new Validate({
            form: '.form-login',
            errorSelector: 'small',
            rules: [
                'username:isRequired',
                'password:isRequired',
                'username:isUsername',
                'password:isPassword'
            ],
            onSubmit: () => {
                const formData = serializeForm(document.querySelector('.form-login'))
                handler(formData)
            }
        })
    }

    //Logout
    bindLogout(handler) {
        this.logoutBtn.addEventListener("click", (e) => {
            handler();
        });
    }
}
