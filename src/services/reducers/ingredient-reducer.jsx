import {CLEAR_INGREDIENT, OPEN_INGREDIENT} from "../actions/ingredient-actions";

export const defaultIngredientDetailsState = {
    detailsIngredient: {},
    ingredientReady: false
};

export const ingredientReducer = (state = defaultIngredientDetailsState, action) => {
    switch (action.type) {
        case OPEN_INGREDIENT: {
            return {
                ...state,
                detailsIngredient: action.payload,
                ingredientReady: true
            };
        }
        case CLEAR_INGREDIENT: {
            return {
                ...state,
                detailsIngredient: {},
                ingredientReady: false
            };
        }
        default: {
            return state
        }
    }
}
