import { combineReducers } from "redux";
import {
    GET_ALLINGREDIENTS,
    GET_FEED_FAILED,
    GET_FEED_SUCCESS,
    INCREASE_COUNT,
    DECREASE_COUNT,
    ADD_INGREDIENT,
    REPLACE_BUN,
    SORT_INGREDIENT,
    POST_ORDER,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CLEAR_ORDER,
    OPEN_INGREDIENT, CLEAR_INGREDIENT
} from "../actions/allActions";

//запрос всех ингредиентов
export const defaultAllIngredientsState = {
    allIngredientsReducer: {
        feedIngredientsRequest: false,
        feedIngredientsFailed: false,
        feedIngredients: {success: false, data: []}
    }
};

const allIngredientsReducer = (state = defaultAllIngredientsState, action) => {
    switch (action.type) {
        case GET_ALLINGREDIENTS: {
            return {
                ...state,
                feedIngredientsRequest: true,
                feedIngredientsFailed: false,
            };
        }
        case GET_FEED_SUCCESS: {
            return {
                ...state,
                feedIngredients: action.feed,
                feedIngredientsRequest: false
            };
        }
        case GET_FEED_FAILED: {
            return {
                ...state,
                feedIngredientsFailed: true,
                feedIngredientsRequest: false
            };
        }
        default: {
            return state
        }
    }
}

//для dnd - состояние для того, что переносим
export const defaultConstructorState = {
    constructorIngredient: []
};

export const draggableConstructorReducer = (state = defaultConstructorState, action) => {
    switch (action.type) {
        case INCREASE_COUNT: {
            return {
                ...state,
                constructorIngredient: [...state.constructorIngredient.map(ingredient =>
                    (ingredient._id === action.id) ? { ...ingredient, count: ingredient.count ? ingredient.count +=1 : 1} : ingredient,
                )]

            };
        }
        case DECREASE_COUNT: {
            return {
                ...state,
                constructorIngredient: state.constructorIngredient.map(ingredient =>
                    ingredient._id === action.id ? ingredient.count !== 0 ?
                        { ...ingredient, count: ingredient.count -=1} : null : ingredient,
                ).filter(item => item !== null)
            };
        }
        case ADD_INGREDIENT: {
            return {
                ...state,
                constructorIngredient: state.constructorIngredient
                    .filter(item => item._id === action.payload._id).length === 0 ?
                    [...state.constructorIngredient, action.payload] : state.constructorIngredient
            };
        }
        case REPLACE_BUN: {
            return {
                ...state,
                constructorIngredient: state.constructorIngredient
                    .filter(item => item.type !== 'bun')
            };
        }
        case SORT_INGREDIENT: {
            return {
                ...state,
                constructorIngredient: state.constructorIngredient.map(item => {
                   if (item._id === action.payload.dropIngredient._id) {
                       return {...item, order: action.payload.dragIngredient.order}
                   }
                   if (item._id = action.payload.dragIngredient._id) {
                     return {...item, order: action.payload.dropIngredient.order}
                }})
            };
        }
        default:
            return state;
    }
}

//стейт для отправки заказа
export const defaultOrderState = {
    orderReducer: {
        postOrderRequest: false,
        postOrderFailed: false,
        postOrderFeed: {success: false, data: []},
    }
};

const orderReducer = (state = defaultOrderState, action) => {
    switch (action.type) {
        case POST_ORDER: {
            return {
                ...state,
                postOrderRequest: true,
                postOrderFailed: false,
            };
        }
        case GET_ORDER_SUCCESS: {
            return {
                ...state,
                postOrderFeed: action.feed,
                postOrderRequest: false
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                postOrderFailed: true,
                postOrderRequest: false
            };
        }
        case CLEAR_ORDER: {
            return {
                ...state,
                postOrderRequest: false,
                postOrderFailed: false,
                postOrderFeed: {success: false, data: []},
            };
        }
        default: {
            return state
        }
    }
}
//данные об ингредиенте
export const defaultIngredientDetailsState = {
    detailsIngredient: {}
};

const ingredientReducer = (state = defaultIngredientDetailsState, action) => {
    switch (action.type) {
        case OPEN_INGREDIENT: {
            return {
                ...state,
                detailsIngredient: action.payload,
            };
        }
        case CLEAR_INGREDIENT: {
            return {
                ...state,
                detailsIngredient: {}
            };
        }
        default: {
            return state
        }
    }
}

export const rootReducer = combineReducers({
    allIngredientsReducer,
    draggableConstructorReducer,
    orderReducer,
    ingredientReducer
    })
