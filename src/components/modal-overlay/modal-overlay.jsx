import React, {useEffect} from 'react';
import modalOverlayStyles from './modal-overlay.module.css'
import PropTypes from "prop-types";

const ModalOverlay = (props) => {

    return (
       <div className={modalOverlayStyles.main}
            onClick={props.handleCloseModal}
       >
           <div className={modalOverlayStyles.content}>
               {props.children}
           </div>
       </div>
    );
}

ModalOverlay.propTypes = {
    children: PropTypes.func,
    handleOverlayModal: PropTypes.func
}

export default ModalOverlay;
