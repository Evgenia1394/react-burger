import ModalOverlay from "../modalIverlay/modal-overlay";
import Modal from "../Modal/Modal";
import ingredientDetailsStyles from './ingredient-details.module.css'
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";

const IngredientDetails = (props) => {
    return (
        <>
            {/*<ModalOverlay>*/}
                <Modal handleCloseModal={props.handleCloseModal}>
                    <ModalOverlay>
                    </ModalOverlay>
                    <header className={ingredientDetailsStyles.header}>
                    <p className="text text_type_main-large">
                        Детали ингредиента
                    </p>
                    </header>
                    <img src={props.src} alt={props.name}/>
                    <p className="text text_type_main-medium">
                        {props.name}
                    </p>
                    <div className={ingredientDetailsStyles.composition}>
                    <div className={ingredientDetailsStyles.compositionItem}>
                        <p className="text text_type_main-default text_color_inactive">
                            Калории, ккал
                        </p>
                        <p className="text text_type_main-default text_color_inactive text text_type_digits-default">
                            {props.calories}
                        </p>
                    </div>
                    <div>
                        <p className="text text_type_main-default text_color_inactive">
                            Белки, г
                        </p>
                        <p className="text text_type_main-default text_color_inactive text text_type_digits-default">
                            {props.proteins}
                        </p>
                    </div>
                    <div>
                        <p className="text text_type_main-default text_color_inactive">
                            Жиры, г
                        </p>
                        <p className="text text_type_main-default text_color_inactive text text_type_digits-default">
                            {props.fat}
                        </p>
                    </div>
                    <div>
                        <p className="text text_type_main-default text_color_inactive">
                            Углеводы, г
                        </p>
                        <p className="text text_type_main-default text_color_inactive text text_type_digits-default">
                            {props.carbohydrates}
                        </p>
                    </div>
                    </div>

                </Modal>
            {/*</ModalOverlay>*/}
        </>
    )
}

ModalOverlay.propTypes = {
    handleCloseModal: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    calories: PropTypes.string.isRequired,
    proteins: PropTypes.string.isRequired,
    fat: PropTypes.string.isRequired,
    carbohydrates: PropTypes.string.isRequired,
}

export default IngredientDetails;
