import {defaultTokenState, tokenReducer} from "./token-reducer";
import {newTokenActions} from "../actions/new-token-actions";

describe('token-reducer', () => {
    it('Установка initialState', () => {
        const result = tokenReducer(undefined, {})
        expect(result).toEqual(defaultTokenState)
    })

    it('Получить токен', () => {
        const action = {
            type: newTokenActions.POST_TOKEN
        }
        const result = tokenReducer(undefined, action)
        expect(result).toEqual({
            ...defaultTokenState,
            feedTokenRequest: true,
            feedTokenFailed: false,
        })
    })

    it('Токен пришел', () => {
        const action = {
            type: newTokenActions.TOKEN_SUCCESS,
            feed: {success: true, accessToken: 'gjdig', refreshToken: 'fddhdhbh'}
        }
        const result = tokenReducer(defaultTokenState, action)
        expect(result).toEqual({
            ...defaultTokenState,
            feedToken: action.feed,
            feedTokenRequest: false
        })
    })

    it('Не получили токен', () => {
        const action = {
            type: newTokenActions.TOKEN_FAILED,
        }
        const result = tokenReducer(defaultTokenState, action)
        expect(result).toEqual({
            ...defaultTokenState,
            feedTokenFailed: true,
            feedTokenRequest: false
        })
    })
})
