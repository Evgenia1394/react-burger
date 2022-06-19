import React, {FC} from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import orderDetailsStyles from "../order-details/order-details.module.css";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const modalRoot: HTMLElement | null = document.getElementById("modal-root");

const Modal: FC<IModalProps> = (props) => {
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
        modalRoot as HTMLElement
    );
}

export interface IModalProps {
    closeEsc?: Function,
    handleCloseModal: () => void,
    isIngredientDetail?: boolean
}

export default Modal;
