import {defaultConstructorState, draggableConstructorReducer} from "./constructor-reducer";
import {constructorActions, SORT_INGREDIENT} from "../actions/constructor-actions";
import {IBurgerItem} from "../../types";

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

const ingredientMock2 = {
    name: "Говяжий метеорит (отбивная)",
    price: 125,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    _id: "60666c42cc7b410027a1a9b5",
    type: "bun",
    calories: 700,
    proteins: 81,
    fat: 24,
    carbohydrates: 53,
    count: 0,
    key: 1,
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02.png",
}

describe('constructor-reducer', () => {
    it ('Установка initialState', () => {
        const result = draggableConstructorReducer(undefined, {})
        expect(result).toEqual(defaultConstructorState)
    })

    it ('Увеличение количества ингредиентов', () => {
        const action = {
            type: constructorActions.INCREASE_COUNT,
            id: '42'
        }
        const result = draggableConstructorReducer(defaultConstructorState, action)
        expect(result).toEqual({
            ...defaultConstructorState,
            constructorIngredient: [...defaultConstructorState.constructorIngredient.map(ingredient =>
                (ingredient._id === action.id) ? { ...ingredient, count: ingredient.count ? ingredient.count +=1 : 1} : ingredient,
            )]
        })
    })

    it ('Уменьшение количества ингредиентов', () => {
        const action = {
            type: constructorActions.DECREASE_COUNT,
            id: '42'
        }
        const result = draggableConstructorReducer(defaultConstructorState, action)
        expect(result).toEqual({
            ...defaultConstructorState,
            constructorIngredient: defaultConstructorState.constructorIngredient.map(ingredient =>
                ingredient._id === action.id ? (ingredient.count !== undefined ? ingredient.count > 1 : null ) ?
                    { ...ingredient, count: ingredient.count !== undefined ? ingredient.count -=1 : null} : null : ingredient,
            ).filter(item => Boolean(item) && !!item?.count)
        })
    })

    it ('Добавить ингредиент', () => {
        const action = {
            type: constructorActions.ADD_INGREDIENT,
            payload: ingredientMock
        }
        const result = draggableConstructorReducer(defaultConstructorState, action)
        expect(result).toEqual({
            ...defaultConstructorState,
            constructorIngredient: defaultConstructorState.constructorIngredient
                .filter(item => item._id === action?.payload?._id).length === 0 ?
                [...defaultConstructorState.constructorIngredient, action.payload] : defaultConstructorState.constructorIngredient
            })
        })

    it ('Поменять булки', () => {
        const action = {
            type: constructorActions.REPLACE_BUN,
            payload: '42'
        }
        const result = draggableConstructorReducer(defaultConstructorState, action)
        expect(result).toEqual({
            ...defaultConstructorState,
            constructorIngredient: defaultConstructorState.constructorIngredient
                .filter(item => item.type !== 'bun')
        })
    })

    it ('Понять местами ингредиенты', () => {//???
        const action = {
            type: constructorActions.SORT_INGREDIENT,
            payload: {
                dragIngredient: ingredientMock,
                dropIngredient: ingredientMock2
            }
        }
        const orderedIngredients = []
        const result = draggableConstructorReducer(defaultConstructorState, action)
        expect(result).toEqual({
            constructorIngredient: orderedIngredients
        })
    })

    })
