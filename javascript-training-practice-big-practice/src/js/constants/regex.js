export const REGEX = {
    USERNAME_REGEX: /^(?=.{8,20}$)[a-zA-Z0-9._]+(?<![_.])$/,
    PASSWORD_REGEX: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
    URL_REGEX: /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
    NUMBER_REGEX: /^[0-9][A-Za-z0-9 -]*$/

}