import {IS_LOGGED, NOT_LOGGED, TIsLoggedActions} from "../actions/isLogged-actions";

export type TIsLoggedState = {
        isLogged: boolean,
}

export const defaultIsLoggedState = {
        isLogged: false,
};

export const isLoggedReducer = (state: TIsLoggedState = defaultIsLoggedState, action: TIsLoggedActions): TIsLoggedState => {
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
