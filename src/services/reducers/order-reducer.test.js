import {defaultOrderState, orderReducer} from "./order-reducer";
import {orderActions} from "../actions/order-actions";

describe('order-reducer', () => {
    it('Установка initialState', () => {
        const result = orderReducer(undefined, {})
        expect(result).toEqual(defaultOrderState)
    })

    it('отправить заказ', () => {
        const action = {
            type: orderActions.POST_ORDER
        }
        const result = orderReducer(defaultOrderState, action)
        expect(result).toEqual({
            ...defaultOrderState,
            postOrderRequest: true,
            postOrderFailed: false
        })
    })

    it('Заказ отправлен успешно', () => {
        const action = {
            type: orderActions.GET_ORDER_SUCCESS,
            feed: {success: true, order: {number: '666'}}
        }
        const result = orderReducer(defaultOrderState, action)
        expect(result).toEqual({
            ...defaultOrderState,
            postOrderFeed: action.feed,
            postOrderRequest: false
        })
    })

    it('Заказ отправлен неуспешно', () => {
        const action = {
            type: orderActions.GET_ORDER_FAILED,
        }
        const result = orderReducer(defaultOrderState, action)
        expect(result).toEqual({
            ...defaultOrderState,
            postOrderFailed: true,
            postOrderRequest: false
        })
    })

    it('Заказ очистить', () => {
        const action = {
            type: orderActions.CLEAR_ORDER,
            feed: {success: false, order: {number: ''} }
        }
        const result = orderReducer(defaultOrderState, action)
        expect(result).toEqual({
            ...defaultOrderState,
            postOrderRequest: false,
            postOrderFailed: false,
            postOrderFeed: {success: false, order: {number: ''} },
        })
    })
})
