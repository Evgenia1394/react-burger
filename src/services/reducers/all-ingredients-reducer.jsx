import {
    GET_ALLINGREDIENTS_REQUEST,
    GET_FEED_FAILED,
    GET_FEED_SUCCESS
} from "../actions/all-ingredients-actions";

export const defaultAllIngredientsState = {
    allIngredientsReducer: {
        feedIngredientsRequest: false,
        feedIngredientsFailed: false,
        feedIngredients: {success: false, data: []}
    }
};

export const allIngredientsReducer = (state = defaultAllIngredientsState, action) => {
    switch (action.type) {
        case GET_ALLINGREDIENTS_REQUEST: {
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
