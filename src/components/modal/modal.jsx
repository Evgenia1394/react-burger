import React, {useEffect} from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import PropTypes from "prop-types";
import orderDetailsStyles from "../order-details/order-details.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot = document.getElementById("modal-root");

const Modal = (props) => {
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
        props.setVisible(false);
    }

    return ReactDOM.createPortal(
        <>
            <div className={modalStyles.main}
            >
                <h2 className={orderDetailsStyles.header}>
                    <CloseIcon onClick={handleCloseModal} type="primary"/>
                </h2>
                <div className={modalStyles.content}>
                    {props.children}
                </div>
            </div>
            <ModalOverlay handleCloseModal={handleCloseModal}/>
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
