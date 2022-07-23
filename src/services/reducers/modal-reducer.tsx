import {CLOSE_MODAL, OPEN_MODAL, TModalActions} from "../actions/modal-actions";

export type TModalState = {
        isShowModal: boolean,
};

export const defaultModalState = {
        isShowModal: false,
};

export const modalReducer = (state: TModalState = defaultModalState, action: TModalActions): TModalState => {
    switch (action.type) {
        case OPEN_MODAL: {
            return {
                isShowModal: true,
            };
        }
        case CLOSE_MODAL: {
            return {
                isShowModal: false,
            };
        }
        default: {
            return state
        }
    }
}
