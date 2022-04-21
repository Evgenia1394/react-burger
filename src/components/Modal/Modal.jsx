import React from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import PropTypes from "prop-types";
import orderDetailsStyles from "../order-details/order-details.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const modalRoot = document.getElementById("modal-root");

const Modal = (props) => {

    return ReactDOM.createPortal(
        <>
            <div className={modalStyles.main}>
                <header className={orderDetailsStyles.header}>
                    <CloseIcon onClick={props.handleCloseModal} type="primary"/>
                </header>
                <div className={modalStyles.content}>
                    {props.children}
                </div>
            </div>
        </>
        ,
        modalRoot
    );
}

Modal.propTypes = {
    children: PropTypes.node,
}

export default Modal;
