import React from 'react';
import ingredientCard from './ingredient-card.module.css';
import PropTypes from "prop-types";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {burgerItem} from '../burgerItem';

const IngredientCard = (props) => {
    return(
        <div className={ingredientCard.wrapper}>
            <img src={props.data.image} alt={props.data.name}/>
            <div className={ingredientCard.price}>
            <p className="text text_type_digits-default">{props.data.price}
             </p>
             <CurrencyIcon  type="primary" />
            </div>
            <p className="text text_type_main-default">{props.data.name}</p>
        </div>
    )
}

IngredientCard.propTypes = burgerItem;

export default IngredientCard;
