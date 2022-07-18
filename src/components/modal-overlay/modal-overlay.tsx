import React, {FC, MouseEventHandler} from 'react';
import modalOverlayStyles from './modal-overlay.module.css';

const ModalOverlay: FC<IModalOverlayProps> = (props) => {
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

export interface IModalOverlayProps {
    handleCloseModal: MouseEventHandler<HTMLDivElement> | undefined;
}

export default ModalOverlay;
