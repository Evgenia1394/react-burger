import {
    POST_RESET_PASSWORD,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_SUCCESS,
    TResetPasswordActions
} from "../actions/reset-password-actions";

export type TResetPasswordState = {
        feedResetPasswordRequest: boolean,
        feedResetPasswordFailed: boolean,
        feedResetPassword: {success: boolean, message: string}
};

export const defaultResetPasswordState = {
        feedResetPasswordRequest: false,
        feedResetPasswordFailed: false,
        feedResetPassword: {success: false, message: ''}
};

export const resetPasswordReducer = (state: TResetPasswordState = defaultResetPasswordState, action: TResetPasswordActions): TResetPasswordState => {
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
