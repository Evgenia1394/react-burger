import {wsReducer, initialSocketState} from "./socket-reducer";
import {
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS, WS_GET_MESSAGE
} from "../actions/socket-actions";

describe('socket-reducer', () => {
    it('Установка initialState', () => {
        const result = wsReducer(undefined, {})
        expect(result).toEqual(initialSocketState)
    })

    it('Запрос на коннект с вебсокетом', () => {
        const action = {
            type: WS_CONNECTION_START,
            wsUrl: 'космосприём'
        }
        const result = wsReducer(initialSocketState, action)
        expect(result).toEqual({
            ...initialSocketState,
            error: undefined,
            wsConnected: false,
            wsLoadingConnect: true
        })
    })

    it('Запрос на коннект с вебсокетом успешный', () => {
        const action = {
            type: WS_CONNECTION_SUCCESS,
        }
        const result = wsReducer(initialSocketState, action)
        expect(result).toEqual({
            ...initialSocketState,
            error: undefined,
            wsConnected: true,
            wsLoadingConnect: false
        })
    })

    it('Запрос на коннект с вебсокетом неуспешный', () => {
        const action = {
            type: WS_CONNECTION_ERROR,
            payload: 'я сказала нет!'
        }
        const result = wsReducer(initialSocketState, action)
        expect(result).toEqual({
            ...initialSocketState,
            error: action.payload,
            wsConnected: false,
            wsLoadingConnect: false
        })
    })

    it('Закрыто соединение с вебсокетом', () => {
        const action = {
            type: WS_CONNECTION_CLOSED,
        }
        const result = wsReducer(initialSocketState, action)
        expect(result).toEqual({
            ...initialSocketState,
            error: undefined,
            wsConnected: false,
            wsLoadingConnect: false
        })
    })

    it('Сообщение от вебсокета', () => {
        const action = {
            type: WS_GET_MESSAGE,
            payload: 'инопланетныезвуки'
        }
        const result = wsReducer(initialSocketState, action)
        expect(result).toEqual({
            ...initialSocketState,
            error: undefined,
            messages: [...initialSocketState.messages, action.payload],
            wsLoadingConnect: false
        })
    })
})
