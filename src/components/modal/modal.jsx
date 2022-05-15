import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import PropTypes from "prop-types";
import orderDetailsStyles from "../order-details/order-details.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import {useDispatch} from "react-redux";
import {CLEAR_ORDER} from "../../services/actions/order-actions";
import {CLEAR_INGREDIENT} from "../../services/actions/ingredient-actions";

const modalRoot = document.getElementById("modal-root");

const Modal = (props) => {
    const {setVisible, children} = props;
    const dispatch = useDispatch();
    useEffect(() => {
        const onEsc = (e) => {
            if (e.key === 'Escape') {
                handleCloseModal();
            }
        }
        document.addEventListener('keydown', onEsc);

        return () => document.removeEventListener('keydown', onEsc);
    }, [])

    const handleCloseModal = () => {
        setVisible(false);
        dispatch({
            type: CLEAR_ORDER
        })
        dispatch({
            type: CLEAR_INGREDIENT
        })
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
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.node,
    closeEsc: PropTypes.func,
    handleCloseModal: PropTypes.func,
    handleOverlayModal: PropTypes.func,
}

export default Modal;
