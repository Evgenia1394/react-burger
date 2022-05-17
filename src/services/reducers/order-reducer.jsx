import {CLEAR_ORDER, GET_ORDER_FAILED, GET_ORDER_SUCCESS, POST_ORDER} from "../actions/order-actions";

export const defaultOrderState = {
    orderReducer: {
        postOrderRequest: false,
        postOrderFailed: false,
        postOrderFeed: {success: false, data: []},
    }
};

export const orderReducer = (state = defaultOrderState, action) => {
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
