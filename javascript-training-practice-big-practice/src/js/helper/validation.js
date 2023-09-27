import { REGEX } from "../constants/regex";
import { MESSAGE } from '../constants/message'

export default class Validation {
    constructor(options) {
        this.formElement = document.querySelector(options.form)
        this.formRules = options.rules
        this.errorSelector = options.errorSelector
        this.onSubmit = options.onSubmit

        /**
        * @param {value, message}
        * Have error return value
        * No error return nothing
        */
        this.validatorRules = {
            isRequired: (value, message) => value.trim() ? "" : message || MESSAGE.REQUIRED_MESSAGE,
            isUsername: (value, message) => {
                const regex = REGEX.USERNAME_REGEX
                return regex.test(value) ? "" : message || MESSAGE.USERNAME_FORMAT_MESSAGE
            },
            isPassword: (value, message) => {
                const regex = REGEX.PASSWORD_REGEX
                return regex.test(value) ? "" : message || MESSAGE.PASSWORD_FORMAT_MESSAGE
            },
            isUrl: (value, message) => {
                const regex = REGEX.URL_REGEX
                return regex.test(value) ? "" : message || MESSAGE.URL_FORMAT_MESSAGE
            },
            maxLength: (value, message) => {
                return value.length <= 50 ? "" : message || MESSAGE.MAX_LENGTH_MESSAGE
            },
            isNumber: (value, message) => {
                const regex = REGEX
                return regex.test(value) > 0 ? "" : message || MESSAGE.NUMBER_MESSAGE
            }

        }

        this.handleEvent()

    }

    handleEvent = () => {
        /**
        * Get rules in formRules
        * Get input element follow rules
        * Get func validator follow rules
        * When onBlur input element => validate input element with ruleFunc
        * When onInput input element => remove class invalid and clear text message
        */
        for (let rules of this.formRules) {
            const inputElement = this.formElement.querySelector(`[name= '${this.getNameRuleInput(rules)[0]}']`)
            const ruleFunc = this.validatorRules[this.getNameRuleInput(rules)[1]]

            if (inputElement) {
                inputElement.onblur = () => {
                    this.validate(ruleFunc, inputElement)
                }

                inputElement.oninput = () => {
                    const errorElement = inputElement.parentElement.querySelector(this.errorSelector)
                    errorElement.innerText = ""
                    inputElement.parentElement.classList.remove('invalid')
                }

            }
        }
        this.formElement.onsubmit = (e) => {
            e.preventDefault()

            let isValid
            for (let rules of this.formRules) {
                const inputElement = this.formElement.querySelector(`[name= '${this.getNameRuleInput(rules)[0]}']`)
                const ruleFunc = this.validatorRules[this.getNameRuleInput(rules)[1]]

                isValid = this.validate(ruleFunc, inputElement)

            }

            !isValid ? (typeof this.onSubmit === 'function' ? this.onSubmit() : "") : ""
        }
    }

    validate = (ruleFunc, inputElement) => {
        let errorMessage = ruleFunc(inputElement.value)
        const errorElement = inputElement.parentElement.querySelector(this.errorSelector)

        if (errorMessage) {
            errorElement.innerText = errorMessage
            inputElement.parentElement.classList.add('invalid')
        } else {
            errorElement.innerText = ""
            inputElement.parentElement.classList.remove('invalid')
        }

        return !errorMessage
    }

    getNameRuleInput = (rules) => {
        return rules.split(":")
    }
}

