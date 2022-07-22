import {oneOrderReducer, oneOrderState} from "./one-order-reducer";
import {oneOrderActions} from "../actions/one-order-actions";

export const oneOrderMock = {
    orders:
        [{
            _id: 'тмвомаш',
            ingredients: ['fjvdvfdfvj', 'hbefeiuf'],
                status: 'done',
        name: 'бумшакатакабумсеньорита',
        createdAt: 'какая-то дата',
        updatedAt: 'какая-то дата',
        number: 65
}],
    success: true
}

describe('one-order-reducer', () => {
    it('Установка initialState', () => {
        const result = oneOrderReducer(undefined, {})
        expect(result).toEqual(oneOrderState)
    })

    it('Запрос в стейт открываемый заказ из ленты или истории', () => {
        const action = {
            type: oneOrderActions.REQUEST_ONE_ORDER
        }
        const result = oneOrderReducer(oneOrderState, action)
        expect(result).toEqual({
            ...oneOrderState,
            requestOneOrder: true,
            })
    })

    it('Запрос в стейт открываемый заказ из ленты или истории успешный', () => {
        const action = {
            type: oneOrderActions.SUCCESS_ONE_ORDER,
            feed: oneOrderMock
        }
        const result = oneOrderReducer(oneOrderState, action)
        expect(result).toEqual({
            ...oneOrderState,
            requestOneOrder: false,
            oneOrder: action.feed,
        })
    })

    it('Запрос в стейт открываемый заказ из ленты или истории неуспешный', () => {
        const action = {
            type: oneOrderActions.FAILED_ONE_ORDER,
        }
        const result = oneOrderReducer(oneOrderState, action)
        expect(result).toEqual({
            ...oneOrderState,
            requestOneOrder: false,
            oneOrder: null,
            failedOneOrder: true,
        })
    })
})
