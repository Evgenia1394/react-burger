import {GET_EMAIL_FAILED, GET_EMAIL_SUCCESS, POST_EMAIL} from "../actions/forgot-password-actions";


export const defaultForgotPasswordlState = {
    forgotPasswordReducer: {
        feedEmailRequest: false,
        feedEmailFailed: false,
        feedEmail: {success: false, message: ''}
    }
};

export const forgotPasswordReducer = (state = defaultForgotPasswordlState, action) => {
    switch (action.type) {
        case POST_EMAIL: {
            return {
                ...state,
                feedEmailRequest: true,
                feedEmailFailed: false,
            };
        }
        case GET_EMAIL_SUCCESS: {
            return {
                ...state,
                feedEmail: action.feed,
                feedEmailRequest: false
            };
        }
        case GET_EMAIL_FAILED: {
            return {
                ...state,
                feedEmailFailed: true,
                feedEmailRequest: false
            };
        }
        default: {
            return state
        }
    }
}
