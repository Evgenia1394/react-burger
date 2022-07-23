import {defaultModalState, modalReducer} from "./modal-reducer";
import {modalActions} from "../actions/modal-actions";

describe('modal-reducer', () => {
    it('Установка initialState', () => {
        const result = modalReducer(undefined, {})
        expect(result).toEqual(defaultModalState)
    })

    it('открыть модалку', () => {
        const action = {
            type: modalActions.OPEN_MODAL
        }
        const result = modalReducer(defaultModalState, action)
        expect(result).toEqual({
            isShowModal: true,
        })
    })

    it('закрыть модалку', () => {
        const action = {
            type: modalActions.CLOSE_MODAL
        }
        const result = modalReducer(defaultModalState, action)
        expect(result).toEqual({
            isShowModal: false,
        })
    })
})
