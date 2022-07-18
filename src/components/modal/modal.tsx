import React, {FC, useEffect} from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import orderDetailsStyles from "../order-details/order-details.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {keyboardKey} from "@testing-library/user-event";
import {CLEAR_ORDER, orderActions} from "../../services/actions/order-actions";
import {CLEAR_INGREDIENT, ingredientActions} from "../../services/actions/ingredient-actions";
import {CLOSE_MODAL, modalActions} from "../../services/actions/modal-actions";
import {Redirect, useHistory, useLocation} from "react-router-dom";
import {useMyDispatch} from "../../services/store";

const modalRoot: HTMLElement | null = document.getElementById("modal-root");

const Modal: FC<IModalProps> = (props) => {
    const { children } = props;
    const dispatch = useMyDispatch();
    const history = useHistory();
    const location = useLocation()

    useEffect(() => {
        const onEsc = (e: keyboardKey) => {
            if (e.key === 'Escape') {
                handleCloseModal();
            }
        }
        document.addEventListener('keydown', onEsc);
        return () => document.removeEventListener('keydown', onEsc);
    }, []);

    const handleCloseModal = () => {
        dispatch({
            type: orderActions.CLEAR_ORDER
        })
        dispatch({
            type: ingredientActions.CLEAR_INGREDIENT
        })
        dispatch({
            type: modalActions.CLOSE_MODAL
        })

        history.goBack()
    }

    return ReactDOM.createPortal(
        <>
            <div className={modalStyles.main} style={props.isIngredientDetail ? {height: '538px', top: 'calc(50vh - 269px)'} :  {height: '718px'}}>
                <h2 className={orderDetailsStyles.header}>
                    <CloseIcon onClick={handleCloseModal} type="primary"/>
                </h2>
                <div className={modalStyles.content}>
                    {children}
                </div>
            </div>
            <ModalOverlay handleCloseModal={handleCloseModal}/>
        </>
        ,
        modalRoot as HTMLElement
    );
}

export interface IModalProps {
    closeEsc?: Function,
    handleCloseModal?: () => void,
    isIngredientDetail?: boolean
}

export default Modal;
