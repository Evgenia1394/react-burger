import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import PropTypes from "prop-types";
import orderDetailsStyles from "../order-details/order-details.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modalIverlay/modal-overlay";

const modalRoot = document.getElementById("modal-root");

const Modal = (props) => {

    useEffect(() => {
        const onEsc = document.addEventListener('keydown', function (event) {
            if (event.code === 'Escape') {
                props.handleEscModal(false);
            }
        });
        return () => {
            window.removeEventListener('keydown', onEsc);
        };
    }, [])

    return ReactDOM.createPortal(
        <>
           <div className={modalStyles.main}
                onKeyPress={props.closeEsc}
           >
                <h2 className={orderDetailsStyles.header}>
                    <CloseIcon onClick={props.handleCloseModal} type="primary"/>
                </h2>
                <div className={modalStyles.content}>
                    {props.children}
                </div>
                </div>
            <ModalOverlay handleOverlayModal={props.handleOverlayModal}>
            </ModalOverlay>
        </>
        ,
        modalRoot
    );
};

Modal.propTypes = {
    children: PropTypes.node,
    closeEsc: PropTypes.func,
    handleCloseModal: PropTypes.func,
    handleOverlayModal: PropTypes.func,
}

export default Modal;
