import {defaultResetPasswordState, resetPasswordReducer} from "./reset-password-reducer";
import {resetPasswordActions} from "../actions/reset-password-actions";

describe('reset-password-reducer', () => {
    it('Установка initialState', () => {
        const result = resetPasswordReducer(undefined, {})
        expect(result).toEqual(defaultResetPasswordState)
    })

    it('Запрос на сброс пароля', () => {
        const action = {
            type: resetPasswordActions.POST_RESET_PASSWORD
        }
        const result = resetPasswordReducer(defaultResetPasswordState, action)
        expect(result).toEqual({
            ...defaultResetPasswordState,
            feedResetPasswordRequest: true,
            feedResetPasswordFailed: false,
        })
    })
    it('Успешный сброс пароля', () => {
        const action = {
            type: resetPasswordActions.RESET_PASSWORD_SUCCESS,
            feed: {success: true, message: 'здарова, как сам'}
        }
        const result = resetPasswordReducer(defaultResetPasswordState, action)
        expect(result).toEqual({
            ...defaultResetPasswordState,
            feedResetPassword: action.feed,
            feedResetPasswordRequest: false
        })
    })

    it('Неуспешный сброс пароля', () => {
        const action = {
            type: resetPasswordActions.RESET_PASSWORD_FAILED,
        }
        const result = resetPasswordReducer(defaultResetPasswordState, action)
        expect(result).toEqual({
            ...defaultResetPasswordState,
            feedResetPasswordFailed: true,
            feedResetPasswordRequest: false
        })
    })
})
