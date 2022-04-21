import React from 'react';
import ReactDOM from 'react-dom';
import modalOverlayStyles from './modal-overlay.module.css'
import IngredientCard from "../ingredient-card/ingredient-card";
import PropTypes from "prop-types";

const modalOverlay = document.getElementById("overlay-root");


const ModalOverlay = (props) => {
    return ReactDOM.createPortal(
        <>
            <div className={modalOverlayStyles.main}>
                <div className={modalOverlayStyles.content}>
                </div>
            </div>
        </>
        ,
        modalOverlay
    );
}

export default ModalOverlay;
