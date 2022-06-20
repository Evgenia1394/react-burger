import {IS_LOGGED, NOT_LOGGED} from "../actions/isLogged-actions";

export const defaultIsLoggedState = {
    isLoggedReducer: {
        isLogged: false,
    }
};

export const isLoggedReducer = (state = defaultIsLoggedState, action) => {
    switch (action.type) {
        case IS_LOGGED: {
            return {
               isLogged: true,
            };
        }
        case NOT_LOGGED: {
            return {
                isLogged: false,
            };
        }
        default: {
            return state
        }
    }
}
