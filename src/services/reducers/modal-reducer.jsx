import {CLOSE_MODAL, OPEN_MODAL} from "../actions/modal-actions";

export const defaultModalState = {
    modalReducer: {
        isShowModal: false,
    }
};

export const modalReducer = (state = defaultModalState, action) => {
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
