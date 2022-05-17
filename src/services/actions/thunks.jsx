import {
    GET_ALLINGREDIENTS_REQUEST,
    GET_FEED_FAILED,
    GET_FEED_SUCCESS
} from "./all-ingredients-actions";
import {ADD_INGREDIENT, INCREASE_COUNT, REPLACE_BUN} from "./constructor-actions";
import {GET_ORDER_FAILED, GET_ORDER_SUCCESS, POST_ORDER} from "./order-actions";
import {baseUrl} from "../../utils/burger-api";
import {getIngredientsApi} from "../../utils/ingredients-api";

export function addIngredient(item, array) {
    return async function (dispatch) {
        if (item.type !== 'bun') {
            await dispatch({
                type: ADD_INGREDIENT,
                payload: {...item}
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
        dispatch({
            type: GET_ALLINGREDIENTS_REQUEST
        })
        return getIngredientsApi
            .then(async res => {
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
        dispatch({
            type: POST_ORDER
        })
        return fetch(`${baseUrl}orders`, {
            method: 'POST',
            body: JSON.stringify({ingredients: arrId}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(async res => {
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


