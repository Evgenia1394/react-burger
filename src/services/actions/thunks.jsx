import {
    GET_ALLINGREDIENTS_REQUEST,
    GET_FEED_FAILED,
    GET_FEED_SUCCESS
} from "./all-ingredients-actions";
import {ADD_INGREDIENT, INCREASE_COUNT, REPLACE_BUN} from "./constructor-actions";
import {GET_ORDER_FAILED, GET_ORDER_SUCCESS, POST_ORDER} from "./order-actions";
import {baseUrl} from "../../utils/burger-api";
import {getIngredientsApi} from "../../utils/ingredients-api";
import {GET_EMAIL_FAILED, GET_EMAIL_SUCCESS, POST_EMAIL} from "./forgot-password-actions";
import {POST_RESET_PASSWORD, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS} from "./reset-password-actions";
import {POST_REGISTRATION, REGISTRATION_FAILED, REGISTRATION_SUCCESS} from "./registration-actions";
import {LOGIN_FAILED, LOGIN_SUCCESS, POST_LOGIN} from "./login-actions";
import {POST_TOKEN, TOKEN_FAILED, TOKEN_SUCCESS} from "./new-token-actions";
import {LOGOUT_FAILED, LOGOUT_SUCCESS, POST_LOGOUT} from "./logout-actions";
import {
    EDIT_USER,
    GET_USER,
    USER_FAILED,
    USER_SUCCESS
} from "./user-info-actions";
import getCookie from "../../utils/get-cookie";
import {CheckResponse, checkResponse} from "../../utils/check-response";

const AddFailedAction = (dispatch, text) => {
    const action = {
        type: text,
    }
    dispatch(action)
}

const AddSuccessAction = (dispatch, text, res) => {
    const action = {
        type: text,
        feed: res
    }
    dispatch(action)
}

export function addIngredient(item, array) {
    return async function (dispatch) {
        if (item.type !== 'bun') {
            await dispatch({
                type: ADD_INGREDIENT,
                payload: {...item}
            })
            await dispatch({
                type: INCREASE_COUNT,
                id: item._id
            })
            return;
        } else {
            const previousBun = await array.find(ingredient => (ingredient.type === 'bun'));
            if (previousBun === undefined) {
                await dispatch({
                    type: ADD_INGREDIENT,
                    payload: item
                })
                await dispatch({
                    type: INCREASE_COUNT,
                    id: item._id
                })
            } else {
                const idPreviousBun = await previousBun._id;
                await dispatch({
                    type: REPLACE_BUN,
                })
                await dispatch({
                    type: ADD_INGREDIENT,
                    payload: item
                })
                await dispatch({
                    type: INCREASE_COUNT,
                    id: item._id
                })
            }
        }
    }
}

export function getFeed() {
    return function (dispatch) {
        dispatch({
            type: GET_ALLINGREDIENTS_REQUEST
        })
        return getIngredientsApi
            .then(CheckResponse)
            .then(res => !!res ?
                  AddSuccessAction(dispatch, GET_FEED_SUCCESS, res)
                : AddFailedAction(dispatch, GET_FEED_FAILED)
            )
    }
}

export function postOrder(arrId) {
    return function (dispatch) {
        dispatch({
            type: POST_ORDER
        })
        return fetch(`${baseUrl}orders`, {
            method: 'POST',
            body: JSON.stringify({ingredients: arrId}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(CheckResponse)
            .then(res => !!res ?
                AddSuccessAction(dispatch, GET_ORDER_SUCCESS, res)
                : AddFailedAction(dispatch, GET_ORDER_FAILED)
            )
    }
}

export function postEmail(email) {//послать имейл для восстановления пароля
    return function (dispatch) {
        dispatch({
            type: POST_EMAIL
        })
        return fetch(`${baseUrl}password-reset`, {
            method: 'POST',
            body: JSON.stringify({email: email}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(CheckResponse)
            .then(res => !!res ?
                AddSuccessAction(dispatch, GET_EMAIL_SUCCESS, res)
                : AddFailedAction(dispatch, GET_EMAIL_FAILED)
            )
    }
}

export function resetPassword(password, token) {//токен из почты+новый пароль
    return function (dispatch) {
        dispatch({
            type: POST_RESET_PASSWORD
        })
        return fetch(`${baseUrl}password-reset/reset`, {
            method: 'POST',
            body: JSON.stringify({
                password: password,
                token: token
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(CheckResponse)
            .then(res => !!res ?
                AddSuccessAction(dispatch, RESET_PASSWORD_SUCCESS, res)
                : AddFailedAction(dispatch, RESET_PASSWORD_FAILED)
            )
    }
}

export function registrationNew(email, password, name) {
    return function (dispatch) {
        dispatch({
            type: POST_REGISTRATION
        })
        return fetch(`${baseUrl}auth/register`, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(CheckResponse)
            .then(res => !!res ?
                AddSuccessAction(dispatch, REGISTRATION_SUCCESS, res)
                : AddFailedAction(dispatch, REGISTRATION_FAILED)
            )
    }
}

export function logIn(email, password) {
    return function (dispatch) {
        dispatch({
            type: POST_LOGIN
        })
        return fetch(`${baseUrl}auth/login`, {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                password: password,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(CheckResponse)
            .then(res => !!res ?
                AddSuccessAction(dispatch, LOGIN_SUCCESS, res)
                : AddFailedAction(dispatch, LOGIN_FAILED)
            )
    }
};

export function getNewAccessToken(refreshToken) {
        return fetch(`${baseUrl}auth/token`, {
            method: 'POST',
            body: JSON.stringify({
                token: refreshToken,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                if (res && res.ok) {
                    const result = await res.json().then(res => res);
                    document.cookie = `accessToken=${await result.accessToken}`;
                    document.cookie = `token=${await result.refreshToken}`;
                    const newAccessToken = await getCookie('accessToken');
                } else {
                    throw res;
                }
            }).catch(err => {
                    console.log(err)
            })
}

export function logOut(refreshToken) {
    return function (dispatch) {
        dispatch({
            type: POST_LOGOUT
        })
        return fetch(`${baseUrl}auth/logout`, {
            method: 'POST',
            body: JSON.stringify({
                token: refreshToken,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(CheckResponse)
            .then(res => !!res ?
                dispatch({
                    type: LOGOUT_SUCCESS,
                    feed: res
                }) : dispatch({
                    type: LOGOUT_FAILED,
                })
            )
    }
}

export function userInfo(accessToken) {
    return function (dispatch) {
        dispatch({
            type: GET_USER
        })
        return fetch(`${baseUrl}auth/user`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken
            }
        })
            .then(async res => {
                if (res && res.ok) {
                    return dispatch({
                        type: USER_SUCCESS,
                        feed: await res.json()
                    })
                }
                if (await res.status === 403) {
                    const refreshToken = await getCookie('token');
                    const newAccessToken = await getNewAccessToken(refreshToken);
                    await userInfo(newAccessToken);//не понимаю, почему не работает повторно, что мешает?
                    return dispatch({
                        type: USER_SUCCESS,
                        feed: await res.json()
                    })
                } else {
                    throw res
                }
            })
            .catch(err => {
                console.log(err)
                return dispatch({
                    type: USER_FAILED
                })
            })
    }
}

export function editUserInfo(accessToken, editedForm) {//объект
    return function (dispatch) {
        dispatch({
            type: EDIT_USER
        })
        return fetch(`${baseUrl}auth/user`, {
            method: 'PATCH',
            body: JSON.stringify(editedForm),
            headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken
            }
        })
            .then(async res => {
                if (res && res.ok) {
                    return dispatch({
                        type: USER_SUCCESS,
                        feed: await res.json()
                    })
                }
                if (await res.status === 403) {
                    const refreshToken = await getCookie('token')
                    const newAccessToken = await getNewAccessToken(refreshToken);
                    editUserInfo(newAccessToken, editedForm);//внутри себя не запускается, не знаю почему, пришлось дублировать
                } else {
                    throw res
                }
            }).catch(err => {
                console.log(err)
                return dispatch({
                    type: USER_FAILED
                })
            })
    }
}




