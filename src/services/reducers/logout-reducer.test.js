import {defaultLoginState, loginReducer} from "./login-reducer";
import {defaultLogoutState, logoutReducer} from "./logout-reducer";
import {logoutActions} from "../actions/logout-actions";

describe('logout-reducer', () => {
    it('Установка initialState', () => {
        const result = logoutReducer(undefined, {})
        expect(result).toEqual(defaultLogoutState)
    })

    it('Запросить выход', () => {
        const action = {
            type: logoutActions.POST_LOGOUT
        }
        const result = logoutReducer(defaultLogoutState, action)
        expect(result).toEqual({
            ...defaultLogoutState,
            feedLogoutRequest: true,
            feedLogoutFailed: false,
        })
    })

    it('Выйти получилось', () => {
        const action = {
            type: logoutActions.LOGOUT_SUCCESS,
            feed: {success: true, message: 'Мои мысли, мои скакуны'}
        }
        const result = logoutReducer(defaultLogoutState, action)
        expect(result).toEqual({
            ...defaultLogoutState,
            feedLogout: action.feed,
            feedLogoutRequest: false
        })
    })

    it('Выйти не получилось', () => {
        const action = {
            type: logoutActions.LOGOUT_FAILED,
        }
        const result = logoutReducer(defaultLogoutState, action)
        expect(result).toEqual({
            ...defaultLogoutState,
            feedLogoutFailed: true,
            feedLogoutRequest: false
        })
    })
})
