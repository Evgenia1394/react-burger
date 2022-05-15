import {CLEAR_INGREDIENT, OPEN_INGREDIENT} from "../actions/ingredient-actions";

export const defaultIngredientDetailsState = {
    detailsIngredient: {}
};

export const ingredientReducer = (state = defaultIngredientDetailsState, action) => {
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
