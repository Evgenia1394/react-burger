import {defaultAllIngredientsActions,} from "./all-ingredients-actions";
import {constructorActions} from "./constructor-actions";
import {GET_ORDER_FAILED, GET_ORDER_SUCCESS, orderActions} from "./order-actions";
import {baseUrl, orderUrl} from "../../utils/burger-api";
import {getIngredientsApi} from "../../utils/ingredients-api";
import {forgotPasswordActions, GET_EMAIL_FAILED, GET_EMAIL_SUCCESS} from "./forgot-password-actions";
import {RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS, resetPasswordActions} from "./reset-password-actions";
import {REGISTRATION_FAILED, REGISTRATION_SUCCESS, registrationActions} from "./registration-actions";
import {LOGIN_FAILED, LOGIN_SUCCESS, loginActions} from "./login-actions";
import {logoutActions} from "./logout-actions";
import {userActions} from "./user-info-actions";
import getCookie from "../../utils/get-cookie";
import {checkResponse} from "../../utils/check-response";
import {RootState, TApplicationActions, TDispatch} from "../store";
import {IBurgerItem} from "../../types";
import {oneOrderActions} from "./one-order-actions";
import {ThunkAction} from "redux-thunk";

export type actionCreatorFactory<T extends (...arg: any) => {type: any, payload?: any, feed?: any}> = ReturnType<T>;


const AddFailedAction = (dispatch: TDispatch, text: string): void => {
    const action: any = {
        type: text,
    }
    dispatch(action)
}

const AddSuccessAction = (dispatch: TDispatch, text: string, res: any): void => {
    const action: any = {
        type: text,
        feed: res
    }
    dispatch(action)
}

export function addIngredient(item: IBurgerItem, array: Array<IBurgerItem>): ThunkAction<Promise<void>, RootState, never, TApplicationActions> {
    return async function (dispatch: TDispatch) {
        if (item.type !== 'bun') {
            await dispatch({
                type: constructorActions.ADD_INGREDIENT,
                payload: {...item}
            })
            await dispatch({
                type: constructorActions.INCREASE_COUNT,
                id: item._id
            })
            return;
        } else {
            const previousBun = await array.find(ingredient => (ingredient.type === 'bun'));
            if (previousBun === undefined) {
                await dispatch({
                    type: constructorActions.ADD_INGREDIENT,
                    payload: item
                })
                await dispatch({
                    type: constructorActions.INCREASE_COUNT,
                    id: item._id
                })
            } else {
                const idPreviousBun = await previousBun._id;
                await dispatch({
                    type: constructorActions.REPLACE_BUN,
                })
                await dispatch({
                    type: constructorActions.ADD_INGREDIENT,
                    payload: item
                })
                await dispatch({
                    type: constructorActions.INCREASE_COUNT,
                    id: item._id
                })
            }
        }
    }
}

export function getFeed(): ThunkAction<Promise<void>, RootState, never, TApplicationActions> {
    return function (dispatch: TDispatch) {
         dispatch({
            type: defaultAllIngredientsActions.GET_ALLINGREDIENTS_REQUEST
        })
        return getIngredientsApi
            .then(checkResponse)
            .then(res => !!res ?
                  AddSuccessAction(dispatch, defaultAllIngredientsActions.GET_FEED_SUCCESS, res)
                : AddFailedAction(dispatch, defaultAllIngredientsActions.GET_FEED_FAILED)
            ).catch(err => {
                AddFailedAction(dispatch, defaultAllIngredientsActions.GET_FEED_FAILED)
            })
    }
}

export function postOrder(arrId: (string | undefined)[]): ThunkAction<Promise<void>, RootState, never, TApplicationActions> {
    return function (dispatch: TDispatch) {
        dispatch({
            type: orderActions.POST_ORDER
        })
        const accessToken = getCookie('accessToken');
        return fetch(`${baseUrl}orders`, {
            method: 'POST',
            body: JSON.stringify({ingredients: arrId}),
            // @ts-ignore
            headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken
            }
        })
            .then(checkResponse)
            .then(res => !!res ?
                AddSuccessAction(dispatch, GET_ORDER_SUCCESS, res)
                : AddFailedAction(dispatch, GET_ORDER_FAILED)
            ).catch(err => {
                AddFailedAction(dispatch, GET_ORDER_FAILED)
            })
    }
}

export function postEmail(email: string): ThunkAction<Promise<void>, RootState, never, TApplicationActions> {//послать имейл для восстановления пароля
    return function (dispatch: TDispatch) {
        dispatch({
            type: forgotPasswordActions.POST_EMAIL
        })
        return fetch(`${baseUrl}password-reset`, {
            method: 'POST',
            body: JSON.stringify({email: email}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(checkResponse)
            .then(res => !!res ?
                AddSuccessAction(dispatch, GET_EMAIL_SUCCESS, res)
                : AddFailedAction(dispatch, GET_EMAIL_FAILED)
            ).catch(err => {
                AddFailedAction(dispatch, GET_EMAIL_FAILED)
            })
    }
}

export function resetPassword(password: string, token: string): ThunkAction<Promise<void>, RootState, never, TApplicationActions> {//токен из почты+новый пароль
    return function (dispatch: TDispatch) {
        dispatch({
            type: resetPasswordActions.POST_RESET_PASSWORD
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
            .then(checkResponse)
            .then(res => !!res ?
                AddSuccessAction(dispatch, RESET_PASSWORD_SUCCESS, res)
                : AddFailedAction(dispatch, RESET_PASSWORD_FAILED)
            ).catch(err => {
                AddFailedAction(dispatch, RESET_PASSWORD_FAILED)
            })
    }
}

export function registrationNew(email: string, password: string, name: string): ThunkAction<Promise<void>, RootState, never, TApplicationActions> {
    return function (dispatch: TDispatch) {
        dispatch({
            type: registrationActions.POST_REGISTRATION
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
            .then(checkResponse)
            .then(res => !!res ?
                AddSuccessAction(dispatch, REGISTRATION_SUCCESS, res)
                : AddFailedAction(dispatch, REGISTRATION_FAILED)
            ).catch(err => {
                AddFailedAction(dispatch, REGISTRATION_FAILED)
            })
    }
}

export function logIn(email: string, password: string): ThunkAction<Promise<void>, RootState, never, TApplicationActions> {
    return function (dispatch: TDispatch) {
        dispatch({
            type: loginActions.POST_LOGIN
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
            .then(checkResponse)
            .then(res => !!res ?
                AddSuccessAction(dispatch, LOGIN_SUCCESS, res)
                : AddFailedAction(dispatch, LOGIN_FAILED)
            ).catch(err => {
                AddFailedAction(dispatch, LOGIN_FAILED)
            })
    }
};

export function getNewAccessToken(refreshToken: string): Promise<string | undefined> {
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
                    return newAccessToken;
                } else {
                    throw res;
                }
            }).catch(err => {
                    console.log(err)
                return undefined;
            })
}

export function logOut(refreshToken: string | undefined): (dispatch: TDispatch) => Promise<void | {type: logoutActions.LOGOUT_SUCCESS, feed: {success: boolean, message: string}} | {type: logoutActions.LOGOUT_FAILED}> {
    return function (dispatch: TDispatch) {
        dispatch({
            type: logoutActions.POST_LOGOUT
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
            .then(checkResponse)
            .then(res => !!res ?
                dispatch({
                    type: logoutActions.LOGOUT_SUCCESS,
                    feed: res as {success: boolean, message: string}
                }) : dispatch({
                    type: logoutActions.LOGOUT_FAILED,
                })
            ).catch(err => {
                dispatch({
                    type: logoutActions.LOGOUT_FAILED,
                })
            })
    }
}

export function userInfo(accessToken: string): (dispatch: TDispatch) => Promise<{type: userActions.USER_SUCCESS, feed: any} | {type: userActions.USER_FAILED}> {
    return function (dispatch: TDispatch) {
        dispatch({
            type: userActions.GET_USER
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
                        type: userActions.USER_SUCCESS,
                        feed: await res.json()
                    })
                }
                if (await res.status === 403) {
                    const refreshToken = await getCookie('token');
                    const newAccessToken = await getNewAccessToken(refreshToken as string);
                    userInfo(newAccessToken as string);

                    return dispatch({
                        type: userActions.USER_SUCCESS,
                        feed: await res.json()
                    })
                } else {
                    throw res
                }
            })
            .catch(err => {
                console.log(err)
                return dispatch({
                    type: userActions.USER_FAILED
                })
            })
    }
}

export function editUserInfo(accessToken: string | undefined, editedForm: any ): (dispatch: TDispatch) => Promise<{type: userActions.USER_SUCCESS, feed: any} | {type: userActions.USER_FAILED} | undefined> {//объект
    return function (dispatch: TDispatch) {
        dispatch({
            type: userActions.EDIT_USER,
            feed: editedForm
        })

        return fetch(`${baseUrl}auth/user`, {
            method: 'PATCH',
            body: JSON.stringify(editedForm),
            // @ts-ignore
            headers: {
                'Content-Type': 'application/json',
                Authorization: accessToken
            }
        })
            .then(async res => {
                if (res && res.ok) {
                    return dispatch({
                        type: userActions.USER_SUCCESS,
                        feed: await res.json()
                    })
                }
                if (await res.status === 403) {
                    const refreshToken = await getCookie('token')
                    const newAccessToken = await getNewAccessToken(refreshToken as string);
                    editUserInfo(newAccessToken, editedForm);
                } else {
                    throw res
                }
            }).catch(err => {
                console.log(err)
                return dispatch({
                    type: userActions.USER_FAILED
                })
            })
    }
}


export function getOneOrder(number: number, personal?: boolean) : (dispatch: TDispatch) => Promise<void | {type: oneOrderActions.SUCCESS_ONE_ORDER, feed: any} | {type: oneOrderActions.FAILED_ONE_ORDER}> {
    return function (dispatch: TDispatch) {
        dispatch({
            type: oneOrderActions.REQUEST_ONE_ORDER,
        })
    let url;
    const accessToken = getCookie('accessToken')?.split(' ')[1];
    if (personal === true) {
        url = `${orderUrl}${number}?token=${accessToken}`
    } else {
        url = `${orderUrl}${number}`
    }

    return fetch(url, {
        method: 'GET',
    })
        .then(async res => {
            if (res && res.ok) {
            return dispatch({
                type: oneOrderActions.SUCCESS_ONE_ORDER,
                feed: await res.json()
            })
        } else {
            return dispatch({
                type: oneOrderActions.FAILED_ONE_ORDER,
                })
            }
        }
        ).catch(err => {
            dispatch({
                type: oneOrderActions.FAILED_ONE_ORDER,
            })
        })
    }
}




