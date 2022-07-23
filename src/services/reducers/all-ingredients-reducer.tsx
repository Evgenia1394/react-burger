import {
    defaultAllIngredientsActions,
    GET_FEED_SUCCESS, TAllIngredientsActions
} from "../actions/all-ingredients-actions";
import {IBurgerItem} from "../../types";

export type TAllIngredientsState = {
        feedIngredientsRequest: boolean,
        feedIngredientsFailed: boolean,
        feedIngredients: {success: boolean, data: Array<IBurgerItem> | null}
}

export const defaultAllIngredientsState = {
        feedIngredientsRequest: false,
        feedIngredientsFailed: false,
        feedIngredients: {success: false, data: null}
};

export const allIngredientsReducer = (state: TAllIngredientsState = defaultAllIngredientsState, action: TAllIngredientsActions): TAllIngredientsState => {
    switch (action.type) {
        case defaultAllIngredientsActions.GET_ALLINGREDIENTS_REQUEST: {
            return {
                ...state,
                feedIngredientsRequest: true,
                feedIngredientsFailed: false,
            };
        }
        case defaultAllIngredientsActions.GET_FEED_SUCCESS: {
            return {
                ...state,
                feedIngredients: action.feed,
                feedIngredientsRequest: false
            };
        }
        case defaultAllIngredientsActions.GET_FEED_FAILED: {
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
