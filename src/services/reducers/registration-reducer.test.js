import {defaultRegistrationState, registrationReducer} from "./registration-reducer";
import {registrationActions} from "../actions/registration-actions";

describe('registration-reducer', () => {
    it('Установка initialState', () => {
        const result = registrationReducer(undefined, {})
        expect(result).toEqual(defaultRegistrationState)
    })

    it('Запросить регистрацию', () => {
        const action = {
            type: registrationActions.POST_REGISTRATION
        }
        const result = registrationReducer(defaultRegistrationState, action)
        expect(result).toEqual({
            ...defaultRegistrationState,
            feedRegistrationRequest: true,
            feedRegistrationFailed: false,
        })
    })

    it('Регистрация успешна', () => {
        const action = {
            type: registrationActions.REGISTRATION_SUCCESS,
            feed: {success: true, user: {}, accessToken: 'strfjyufding', refreshToken: 'gfgfgfgf'}
        }
        const result = registrationReducer(defaultRegistrationState, action)
        expect(result).toEqual({
            ...defaultRegistrationState,
            feedRegistration: action.feed,
            feedRegistrationRequest: false
        })
    })

    it('Регистрация неуспешна', () => {
        const action = {
            type: registrationActions.REGISTRATION_FAILED,
        }
        const result = registrationReducer(defaultRegistrationState, action)
        expect(result).toEqual({
            ...defaultRegistrationState,
            feedRegistrationFailed: true,
            feedRegistrationRequest: false
        })
    })
})
