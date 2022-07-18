import {
    GET_EMAIL_FAILED,
    GET_EMAIL_SUCCESS,
    POST_EMAIL,
    TForgotPasswordActions
} from "../actions/forgot-password-actions";

export type TForgotPasswordlState = {
        feedEmailRequest: boolean,
        feedEmailFailed: boolean,
        feedEmail: {success: boolean, message: string}
};


export const defaultForgotPasswordlState = {
        feedEmailRequest: false,
        feedEmailFailed: false,
        feedEmail: {success: false, message: ''}
};

export const forgotPasswordReducer = (state: TForgotPasswordlState = defaultForgotPasswordlState, action: TForgotPasswordActions): TForgotPasswordlState => {
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
