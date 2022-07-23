import {defaultIsLoggedState, isLoggedReducer} from "./isLogged-reducer";
import {defaultLoginState, loginReducer} from "./login-reducer";
import {loginActions, POST_LOGIN} from "../actions/login-actions";

describe('login-reducer', () => {
    it('Установка initialState', () => {
        const result = loginReducer(undefined, {})
        expect(result).toEqual(defaultLoginState)
    })

    it('Запрос логина', () => {
        const action = {
            type: loginActions.POST_LOGIN
        }
        const result = loginReducer(defaultLoginState, action)
        expect(result).toEqual({
            ...defaultLoginState,
            feedLoginRequest: true,
            feedLoginFailed: false,
            isLogged: false
        })
    })

    it('Запрос логина закончился успехом', () => {
        const action = {
            type: loginActions.LOGIN_SUCCESS,
            feed: {success: true, accessToken: 'отпустите', refreshToken: 'меня', user:  {name: 'в', email: 'Гималаи'}}
        }
        const result = loginReducer(defaultLoginState, action)
        expect(result).toEqual({
            ...defaultLoginState,
            feedLogin: action.feed,
            feedLoginRequest: false,
            isLogged: true
        })
    })

    it('Запрос логина закончился неудачей', () => {
        const action = {
            type: loginActions.LOGIN_FAILED,
        }
        const result = loginReducer(defaultLoginState, action)
        expect(result).toEqual({
            ...defaultLoginState,
            feedLoginFailed: true,
            feedLoginRequest: false,
            isLogged: false,
            feedLogin: {success: false, accessToken: '', refreshToken: '', user: {name: "", email: ""}},
        })
    })
})
