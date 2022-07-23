import {defaultIngredientDetailsState, ingredientReducer} from "./ingredient-reducer";
import {defaultForgotPasswordlState, forgotPasswordReducer} from "./forgot-password-reducer";
import {ingredientActions} from "../actions/ingredient-actions";

const ingredientMock = {
    name: "Краторная булка N-200i",
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    _id: "60666c42cc7b410027a1a9b1",
    type: "bun",
    calories: 420,
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    count: 0,
    key: 1,
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02.png",
}

describe('ingredient-reducer', () => {
    it ('Установка initialState', () => {
        const result = ingredientReducer(undefined, {})
        expect(result).toEqual(defaultIngredientDetailsState)
    })

    it ('Положить выбранный и открытый в модалке элемент в стейт', () => {
        const action = {
            type: ingredientActions.OPEN_INGREDIENT,
            payload: ingredientMock
        }
        const result = ingredientReducer(defaultIngredientDetailsState, action)
        expect(result).toEqual({
            ...defaultIngredientDetailsState,
            detailsIngredient: action.payload,
            ingredientReady: true
        })
    })

    it ('Убрать выбранный и открытый в модалке элемент из стейта', () => {
        const action = {
            type: ingredientActions.CLEAR_INGREDIENT,
        }
        const result = ingredientReducer(defaultIngredientDetailsState, action)
        expect(result).toEqual({
            ...defaultIngredientDetailsState,
            detailsIngredient: null,
            ingredientReady: false
        })
    })
})
