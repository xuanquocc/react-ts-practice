/**
* @param {form}
* Get formGroup from form param
* Remove class "invalid" in classList of each item contained in the formGroup
* Change text <small> tag of each item contained in the formGroup
*/
export function resetValidate(form) {
    const formGroup = form.querySelectorAll(".form-group");

    for (let item of formGroup) {
        item.classList.remove("invalid")
        item.querySelector("small").innerText = ""
    }
};

/**
* @param {form}
* Return object data
*/
export function serializeForm(form) {
    let obj = {};
    let formData = new FormData(form);
    for (let key of formData.keys()) {
        obj[key] = formData.get(key);
    }
    return obj;
}

export default { resetValidate, serializeForm }