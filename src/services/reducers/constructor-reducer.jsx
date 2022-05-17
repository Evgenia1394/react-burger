import {
    ADD_INGREDIENT,
    DECREASE_COUNT,
    INCREASE_COUNT,
    REPLACE_BUN,
    SORT_INGREDIENT
} from "../actions/constructor-actions";

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
                    ingredient._id === action.id ? (ingredient.count !== 0 || ingredient.count !== 1 ) ?
                        { ...ingredient, count: ingredient.count -=1} : null : ingredient,
                ).filter(item => Boolean(item) && !!item.count)
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
            const orderedIngredients = [];
            state.constructorIngredient.forEach((ingredient) => {
                if (ingredient._id === action.payload.dropIngredient._id) {
                    return orderedIngredients.push(action.payload.dragIngredient)
                } else if (ingredient._id === action.payload.dragIngredient._id) {
                    return orderedIngredients.push(action.payload.dropIngredient)
                }
                return orderedIngredients.push(ingredient);
            })

            return {
                ...state,
                constructorIngredient: orderedIngredients
                }
            };
        default:
            return state;
    }
}
