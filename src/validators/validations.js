'use strict'

let errors = [];

function Validations() {
    errors - [];
}

//Verifica se o valor recebido é menor igual a 0
Validations.prototype.isRequire = (value, message) => {
    if (!value || value.length <= 0)
        errors.push({ message: message });
}

//Validação para minimo de caracter
Validations.prototype.hasMinLen = (value, min, message) => {
    if (!value || value.length < min)
        errors.push({ message: message });
}

//Validação para maximo de caracter
Validations.prototype.hasMaxLen = (value, max, message) => {
    if (!value || value.length > max)
        errors.push({ message: message });
}

//Verifica se é um e-mail valido
Validations.prototype.isEmail = (value, message) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
        errors.push({ message: message });
}

Validations.prototype.errors = () => {
    return errors;
}

Validations.prototype.clear = () => {
    errors = [];
}

Validations.prototype.isValid = () => {
    return errors.length == 0;
}

module.exports = Validations;