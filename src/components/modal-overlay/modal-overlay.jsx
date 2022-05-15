import React from 'react';
import modalOverlayStyles from './modal-overlay.module.css'
import PropTypes from "prop-types";

const ModalOverlay = (props) => {
    const {handleCloseModal, children} = props;
    return (
        <div className={modalOverlayStyles.main}
             onClick={handleCloseModal}
        >
            <div className={modalOverlayStyles.content}>
                {children}
            </div>
        </div>
    );
}

ModalOverlay.propTypes = {
    children: PropTypes.func,
    handleOverlayModal: PropTypes.func
}

export default ModalOverlay;
