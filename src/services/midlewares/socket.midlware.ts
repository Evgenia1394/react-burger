import {Middleware, MiddlewareAPI} from "redux";
import {RootState, TDispatch} from "../store";

export const socketMiddleware = (wsActions: any): Middleware  => {
    return (store: MiddlewareAPI<TDispatch, RootState>) => {
        let socket: WebSocket | null = null;

        return (next) => (action) => {
            const { dispatch } = store;
            const { type, wsUrl, payload } = action;

            const {
                wsConnectionSuccess,
                wsConnectionError,
                wsConnectionClosed,
                wsGetMessage,
                wsSendMessage,
                wsInit
            } = wsActions;

            if (type === wsInit().type) {
                socket = new WebSocket(wsUrl);
            }

            if (socket) {
                socket.onopen = (event) => {
                    dispatch(wsConnectionSuccess(event));
                };

                socket.onerror = (event)  => {
                    dispatch(wsConnectionError(event));
                };

                socket.onmessage = (event)  => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;
                    dispatch(wsGetMessage(restParsedData));
                };

                socket.onclose = (event)  => {
                    dispatch(wsConnectionClosed(event));
                };

                if (type === wsSendMessage) {
                    const message = { ...payload };
                    socket.send(JSON.stringify(message));
                }
            }

            next(action);
        };
    };
};
