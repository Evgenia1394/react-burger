import {POST_TOKEN, TNewTokenActions, TOKEN_FAILED, TOKEN_SUCCESS} from "../actions/new-token-actions";

export type TTokenState = {
        feedTokenRequest: boolean,
        feedTokenFailed: boolean,
        feedToken: {success: boolean, accessToken: string, refreshToken: string}
}

export const defaultTokenState = {
        feedTokenRequest: false,
        feedTokenFailed: false,
        feedToken: {success: false, accessToken: '', refreshToken: ''}
};

export const tokenReducer = (state: TTokenState = defaultTokenState, action: TNewTokenActions): TTokenState => {
    switch (action.type) {
        case POST_TOKEN: {
            return {
                ...state,
                feedTokenRequest: true,
                feedTokenFailed: false,
            };
        }
        case TOKEN_SUCCESS: {
            if (!action.feed) return state;
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
