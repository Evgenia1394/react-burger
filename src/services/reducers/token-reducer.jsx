import {POST_TOKEN, TOKEN_FAILED, TOKEN_SUCCESS} from "../actions/new-token-actions";

export const defaultTokenState = {
    tokenReducer: {
        feedTokenRequest: false,
        feedTokenFailed: false,
        feedToken: {success: false, accessToken: '', refreshToken: ''}
    }
};

export const tokenReducer = (state = defaultTokenState, action) => {
    switch (action.type) {
        case POST_TOKEN: {
            return {
                ...state,
                feedTokenRequest: true,
                feedTokenFailed: false,
            };
        }
        case TOKEN_SUCCESS: {
            document.cookie = `token=${action.feed.refreshToken}`;
            document.cookie = `accessToken=${action.feed.accessToken}`;
            return {
                ...state,
                feedToken: action.feed,
                feedTokenRequest: false
            };
        }
        case TOKEN_FAILED: {
            return {
                ...state,
                feedTokenFailed: true,
                feedTokenRequest: false
            };
        }
        default: {
            return state
        }
    }
}
