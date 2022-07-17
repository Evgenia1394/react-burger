import {ingredientActions, TIngredientActions} from "../actions/ingredient-actions";
import {IBurgerItem} from "../../types";

export type TIngredientDetailsState = {
    detailsIngredient: IBurgerItem | null,
    ingredientReady: boolean
}

export const defaultIngredientDetailsState: TIngredientDetailsState = {
    detailsIngredient: null,
    ingredientReady: false
};

export const ingredientReducer = (state = defaultIngredientDetailsState, action: TIngredientActions): TIngredientDetailsState => {
    switch (action.type) {
        case ingredientActions.OPEN_INGREDIENT: {
            return {
                ...state,
                detailsIngredient: action.payload,
                ingredientReady: true
            };
        }
        case ingredientActions.CLEAR_INGREDIENT: {
            return {
                ...state,
                detailsIngredient: null,
                ingredientReady: false
            };
        }
        default: {
            return state
        }
    }
}
