import {CLEAR_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS, POST_ORDER, TOrderActions} from "../actions/order-actions";

export type TOrderState = {
    // orderReducer: {
        postOrderRequest: boolean,
        postOrderFailed: boolean,
        postOrderFeed: {success: boolean, order: {number: string} },
    // }
};

export const defaultOrderState = {
    // orderReducer: {
        postOrderRequest: false,
        postOrderFailed: false,
        postOrderFeed: {success: false, order: {number: ''} },
    // }
};

export const orderReducer = (state: TOrderState = defaultOrderState, action: TOrderActions): TOrderState => {
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
                postOrderFeed: {success: false, order: {number: ''} },
            };
        }
        default: {
            return state
        }
    }
}
