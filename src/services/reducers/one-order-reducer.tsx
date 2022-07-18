import {IOneOrderResponse} from "../../types";
import {oneOrderActions, TOneOrderActions} from "../actions/one-order-actions";


export type TOneOrderState = {
    requestOneOrder: boolean,
    oneOrder: IOneOrderResponse | null,
    failedOneOrder: boolean,
}

export const oneOrderState: TOneOrderState = {
    requestOneOrder: false,
    oneOrder: null,
    failedOneOrder: false,
};

export const oneOrderReducer = (state: TOneOrderState = oneOrderState, action: TOneOrderActions): TOneOrderState => {
    switch (action.type) {
        case oneOrderActions.REQUEST_ONE_ORDER: {
            return {
                ...state,
                requestOneOrder: true,
            };
        }
        case oneOrderActions.SUCCESS_ONE_ORDER: {
            return {
                ...state,
                requestOneOrder: false,
                oneOrder: action.feed,

            };
        }
        case oneOrderActions.FAILED_ONE_ORDER: {
            return {
                ...state,
                requestOneOrder: false,
                oneOrder: null,
                failedOneOrder: true,

            };
        }
        default: {
            return state
        }
    }
}
