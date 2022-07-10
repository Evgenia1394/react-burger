import {
    TwsOrderActions,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR, WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS, WS_GET_MESSAGE
} from "../actions/socket-actions";

type TWSState = {
    wsConnected: boolean;
    wsLoadingConnect: boolean;
    messages: Array<{
        orders:
            Array<{
                _id: string,
                ingredients: Array<string>
                status: string,
                name: string,
                createdAt: string,
                updatedAt: string,
                number: number
            }>,
        total: string, totalToday: string}>;
    error?: Event;
}

const initialSocketState = {
    wsConnected: false,
    wsLoadingConnect: false,
    messages: []
};

export const wsReducer = (state: TWSState = initialSocketState, action: TwsOrderActions): TWSState => {
    switch (action.type) {
        case WS_CONNECTION_START:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
                wsLoadingConnect: true
            };
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true,
                wsLoadingConnect: false
            };
        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false,
                wsLoadingConnect: false
            };
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
                wsLoadingConnect: false
            };
        case WS_GET_MESSAGE:
            return {
                ...state,
                error: undefined,
                messages: [...state.messages, action.payload],
                wsLoadingConnect: false
            };
        default:
            return state;
    }
};


