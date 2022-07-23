import {defaultForgotPasswordlState, forgotPasswordReducer} from "./forgot-password-reducer";
import {forgotPasswordActions} from "../actions/forgot-password-actions";

describe('forgot-password-reducer', () => {
    it ('Установка initialState', () => {
        const result = forgotPasswordReducer(undefined, {})
        expect(result).toEqual(defaultForgotPasswordlState)
    })

    it ('Сброс пароля', () => {
        const action = {
            type: forgotPasswordActions.POST_EMAIL
        }
        const result = forgotPasswordReducer(defaultForgotPasswordlState, action)
        expect(result).toEqual({
            ...defaultForgotPasswordlState,
            feedEmailRequest: true,
            feedEmailFailed: false,
        })
    })

    it ('Успешный сброс пароля', () => {
        const action = {
            type: forgotPasswordActions.GET_EMAIL_SUCCESS,
            feed: {success: true, message: 'fgfgf'}
        }
        const result = forgotPasswordReducer(defaultForgotPasswordlState, action)
        expect(result).toEqual({
            ...defaultForgotPasswordlState,
            feedEmail: action.feed,
            feedEmailRequest: false
        })
    })

    it ('Неуспешный сброс пароля', () => {
        const action = {
            type: forgotPasswordActions.GET_EMAIL_FAILED
        }
        const result = forgotPasswordReducer(defaultForgotPasswordlState, action)
        expect(result).toEqual({
            ...defaultForgotPasswordlState,
            feedEmailFailed: true,
            feedEmailRequest: false
        })
    })

})
