import {IForm} from "../types";

function setCookie(name: string, value: string, options?: IForm) {

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

function deleteCookie(name: string) {
    setCookie(name, "", {
        'max-age': -1
    })
}

export default deleteCookie;
