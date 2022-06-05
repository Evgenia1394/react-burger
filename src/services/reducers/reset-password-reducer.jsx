import {POST_RESET_PASSWORD, RESET_PASSWORD_FAILED, RESET_PASSWORD_SUCCESS} from "../actions/reset-password-actions";

export const defaultResetPasswordlState = {
    resetPasswordReducer: {
        feedResetPasswordRequest: false,
        feedResetPasswordFailed: false,
        feedResetPassword: {success: false, message: ''}
    }
};

export const resetPasswordReducer = (state = defaultResetPasswordlState, action) => {
    switch (action.type) {
        case POST_RESET_PASSWORD: {
            return {
                ...state,
                feedResetPasswordRequest: true,
                feedResetPasswordFailed: false,
            };
        }
        case RESET_PASSWORD_SUCCESS: {
            return {
                ...state,
                feedResetPassword: action.feed,
                feedResetPasswordRequest: false
            };
        }
        case RESET_PASSWORD_FAILED: {
            return {
                ...state,
                feedResetPasswordFailed: true,
                feedResetPasswordRequest: false
            };
        }
        default: {
            return state
        }
    }
}
