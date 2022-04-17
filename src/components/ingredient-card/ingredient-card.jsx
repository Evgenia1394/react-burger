import React from 'react';
import ingredientCard from './ingredient-card.module.css';
import substractSmallImage from '../../images/Subtract-small.svg'
import PropTypes from "prop-types";

const IngredientCard = (props) => {
    return(
        <div className={ingredientCard.wrapper}>
            <img src={props.data.image} alt="image"/>
            <div className={ingredientCard.price}>
            <p className="text text_type_digits-default">{props.data.price}
             </p>
             <img src={substractSmallImage} alt="substractSmallImage"/>
            </div>
            <p className="text text_type_main-default">{props.data.name}</p>
        </div>
    )
}

IngredientCard.propTypes = PropTypes.arrayOf({
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
});

export default IngredientCard;
