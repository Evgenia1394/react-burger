import {POST_REGISTRATION, REGISTRATION_FAILED, REGISTRATION_SUCCESS} from "../actions/registration-actions";

export const defaultRegistrationState = {
    registrationReducer: {
        feedRegistrationRequest: false,
        feedRegistrationFailed: false,
        feedRegistration: {success: false, user: {}, accessToken: '', refreshToken: ''}
    }
};

export const registrationReducer = (state = defaultRegistrationState, action) => {
    switch (action.type) {
        case POST_REGISTRATION: {
            return {
                ...state,
                feedRegistrationRequest: true,
                feedRegistrationFailed: false,
            };
        }
        case REGISTRATION_SUCCESS: {
            document.cookie = `token=${action.feed.refreshToken}`;
            document.cookie = `accessToken=${action.feed.accessToken}`
            return {
                ...state,
                feedRegistration: action.feed,
                feedRegistrationRequest: false
            };
        }
        case REGISTRATION_FAILED: {
            return {
                ...state,
                feedRegistrationFailed: true,
                feedRegistrationRequest: false
            };
        }
        default: {
            return state
        }
    }
}
