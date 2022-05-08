import {
    ADD_INGREDIENT, DECREASE_COUNT,
    GET_ALLINGREDIENTS,
    GET_FEED_FAILED,
    GET_FEED_SUCCESS, GET_ORDER_FAILED, GET_ORDER_SUCCESS,
    INCREASE_COUNT, POST_ORDER, REPLACE_BUN
} from "../actions/allActions";
import {baseUrl} from '../../components/app/App'

export function addIngredient(item, array) {
    return async function (dispatch) {
        if (item.type !== 'bun') {
            await dispatch({
                type: ADD_INGREDIENT,
                payload: {... item, order: array.length}
            })
            await dispatch({
                type: INCREASE_COUNT,
                id: item._id
            })
            return;
        } else {
            const previousBun = await array.find(ingredient => (ingredient.type === 'bun'));
            if (previousBun === undefined) {
                await dispatch({
                    type: ADD_INGREDIENT,
                    payload: item
                })
            } else {
                const idPreviousBun = await previousBun._id;
                await dispatch({
                    type: REPLACE_BUN,
                })
                await dispatch({
                    type: ADD_INGREDIENT,
                    payload: item
                })
            }
        }
    }
}

export function getFeed() {
    return function (dispatch) {
        return fetch(`${baseUrl}ingredients`)
            .then(async res => {
                dispatch({
                    type: GET_ALLINGREDIENTS
                })

                if (res && res.ok) {
                    dispatch({
                        type: GET_FEED_SUCCESS,
                        feed: await res.json()
                    })
                } else {
                    dispatch({
                        type: GET_FEED_FAILED
                    })
                }
            }).catch(err => {
                dispatch({
                    type: GET_FEED_FAILED
                })
            })
    }
}

export function postOrder(arrId) {
    return function (dispatch) {
        return fetch(`${baseUrl}orders`, {
            method: 'POST',
            body: JSON.stringify({ingredients: arrId}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
                dispatch({
                    type: POST_ORDER
                })

                if (res && res.ok) {
                    dispatch({
                        type: GET_ORDER_SUCCESS,
                        feed: await res.json()
                    })
                } else {
                    dispatch({
                        type: GET_ORDER_FAILED
                    })
                }
            }).catch(err => {
                dispatch({
                    type: GET_ORDER_FAILED
                })
            })
    }
}


