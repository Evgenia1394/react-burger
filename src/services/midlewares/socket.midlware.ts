import {Middleware} from "redux";
import {ActionCreatorWithoutPayload, ActionCreatorWithPayload} from "@reduxjs/toolkit";
import {IwsConnectionInit, TwsOrderActions, WS_CONNECTION_START} from "../actions/socket-actions";


interface IAppActions {
    [key: string]: ActionCreatorWithPayload<any, string> | ActionCreatorWithoutPayload<string>
}

export const socketMiddleware = (wsActions: any): Middleware  => {
    return (store: any) => {
        let socket: WebSocket | null = null;

        return (next: any) => (action: any) => {
            const { dispatch } = store;
            const { type, wsUrl, payload } = action;

            const {
                wsConnectionSuccess,
                wsConnectionError,
                wsConnectionClosed,
                wsGetMessage,
                wsSendMessage
            } = wsActions;

            if (type === WS_CONNECTION_START) {
                socket = new WebSocket(wsUrl);
            }

            if (socket) {
                socket.onopen = (event: any) => {
                    dispatch(wsConnectionSuccess(event));
                };

                socket.onerror = (event: any)  => {
                    dispatch(wsConnectionError(event));
                };

                socket.onmessage = (event: any)  => {
                    const { data } = event;
                    const parsedData = JSON.parse(data);
                    const { success, ...restParsedData } = parsedData;
                    dispatch(wsGetMessage(restParsedData));
                };

                socket.onclose = (event: any)  => {
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
