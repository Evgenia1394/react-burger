import React, {useState} from 'react';
import ingredientCardStyles from './ingredient-card.module.css';
import PropTypes from "prop-types";
import {CloseIcon, Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {burgerItem} from '../burgerItem';
import Modal from "../Modal/Modal";
import ModalOverlay from "../modalIverlay/modal-overlay";
import IngredientDetails from "../ingredient-details/ingredient-details";

const IngredientCard = (props) => {
    const [visible, setVisible] = useState(false);

    const handleOpenModal = () => {
        setVisible(true);
    }

    const handleCloseModal = () => {
        setVisible(false);
    }

    document.addEventListener('keydown', function(event) {
        if (event.code == 'Escape') {
            setVisible(false);
        }
    });

    const modal =
        <IngredientDetails
            handleCloseModal={handleCloseModal}
            src={props.data.image}
            name={props.data.name}
            calories={props.data.calories}
            proteins={props.data.proteins}
            fat={props.data.fat}
            carbohydrates={props.data.carbohydrates}
        />

    return(
        <>
        <div className={ingredientCardStyles.wrapper} onClick={handleOpenModal}>
            <img src={props.data.image} alt={props.data.name}/>
            <div className={ingredientCardStyles.price}>
            <p className="text text_type_digits-default">{props.data.price}
             </p>
             <CurrencyIcon  type="primary" /><Counter count={1} size="default" />
            </div>
            <p className="text text_type_main-default">{props.data.name}</p>
        </div>
            {visible && modal}
        </>
    )
}

IngredientCard.propTypes = burgerItem;

export default IngredientCard;
