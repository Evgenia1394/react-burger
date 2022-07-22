import {allIngredientsReducer, defaultAllIngredientsState} from "./all-ingredients-reducer";
import {defaultAllIngredientsActions} from "../actions/all-ingredients-actions";

const ingredientsMock = [{
    _id: "60666c42cc7b410027a1a9b1",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0
}]

describe('all-ingredient-reducer', () => {
    it ('Установка initialState', () => {
        const result = allIngredientsReducer(undefined, {})
        expect(result).toEqual(defaultAllIngredientsState)
    })

    it ('Запрос всех ингредиентов', () => {
        const action = {
            type: defaultAllIngredientsActions.GET_ALLINGREDIENTS_REQUEST
        }
        const result = allIngredientsReducer(defaultAllIngredientsState, action)
        expect(result).toEqual({
            ...defaultAllIngredientsState,
            feedIngredientsRequest: true,
            feedIngredientsFailed: false,
    })
    })

    it ('Успешное получение всех ингредиентов', () => {
        const action = {
            type: defaultAllIngredientsActions.GET_FEED_SUCCESS,
            feed: {success: true, data: ingredientsMock }
        }
        const result = allIngredientsReducer(defaultAllIngredientsState, action)

        expect(result).toEqual({
            ...defaultAllIngredientsState,
            feedIngredientsRequest: false,
            feedIngredients: {
                success: true,
                data: ingredientsMock
            }
        })
    })

    it ('Неуспешное получение всех ингредиентов', () => {
        const action = {
            type: defaultAllIngredientsActions.GET_FEED_FAILED
        }
        const result = allIngredientsReducer(defaultAllIngredientsState, action)
        expect(result).toEqual({
            ...defaultAllIngredientsState,
            feedIngredientsRequest: false,
            feedIngredientsFailed: true
        })
    })
})
