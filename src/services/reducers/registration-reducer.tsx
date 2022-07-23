import {
    POST_REGISTRATION,
    REGISTRATION_FAILED,
    REGISTRATION_SUCCESS,
    TRegistrationActions
} from "../actions/registration-actions";

export type TRegistrationState = {
        feedRegistrationRequest: boolean,
        feedRegistrationFailed: boolean,
        feedRegistration: {success: boolean, user: {}, accessToken: string, refreshToken: string}
};

export const defaultRegistrationState = {
        feedRegistrationRequest: false,
        feedRegistrationFailed: false,
        feedRegistration: {success: false, user: {}, accessToken: '', refreshToken: ''}
};

export const registrationReducer = (state: TRegistrationState = defaultRegistrationState, action: TRegistrationActions): TRegistrationState => {
    switch (action.type) {
        case POST_REGISTRATION: {
            return {
                ...state,
                feedRegistrationRequest: true,
                feedRegistrationFailed: false,
            };
        }
        case REGISTRATION_SUCCESS: {
            if (!action.feed) return state;
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
