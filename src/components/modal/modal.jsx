import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import PropTypes from "prop-types";
import orderDetailsStyles from "../order-details/order-details.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("modal-root");

const Modal = (props) => {
    const { children } = props;

    return ReactDOM.createPortal(
        <>
            <div className={modalStyles.main} style={props.isIngredientDetail ? {height: '538px', top: 'calc(50vh - 269px)'} :  {height: '718px'}}>
                <h2 className={orderDetailsStyles.header}>
                    <CloseIcon onClick={props.handleCloseModal} type="primary"/>
                </h2>
                <div className={modalStyles.content}>
                    {children}
                </div>
            </div>
            <ModalOverlay handleCloseModal={props.handleCloseModal}/>
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
    isIngredientDetail: PropTypes.bool
}

export default Modal;
