import {defaultIngredientDetailsState, ingredientReducer} from "./ingredient-reducer";
import {defaultIsLoggedState, isLoggedReducer} from "./isLogged-reducer";
import {IS_LOGGED, isLoggedActions} from "../actions/isLogged-actions";

describe('isLogged-reducer', () => {
    it ('Установка initialState', () => {
        const result = isLoggedReducer(undefined, {})
        expect(result).toEqual(defaultIsLoggedState)
    })

    it ('Установить флаг - пользователь залогирован', () => {
        const action = {
            type: isLoggedActions.IS_LOGGED
        }
        const result = isLoggedReducer(defaultIsLoggedState, action)
        expect(result).toEqual({
            isLogged: true
        })
    })

    it ('Установить флаг - пользователь не залогирован', () => {
        const action = {
            type: isLoggedActions.NOT_LOGGED
        }
        const result = isLoggedReducer(defaultIsLoggedState, action)
        expect(result).toEqual({
            isLogged: false
        })
    })
})
