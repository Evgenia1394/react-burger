import ingredientDetailsStyles from './ingredient-details.module.css'
import React from "react";
import PropTypes from "prop-types";

const IngredientDetails = (props) => {
    const {src, name, calories, proteins, fat, carbohydrates} = props;
    return (
        <>
            <div className={ingredientDetailsStyles.wrapper}>
                <h2 className={ingredientDetailsStyles.header}>
                    <p className="text text_type_main-large">
                        Детали ингредиента
                    </p>
                </h2>
                <div className={ingredientDetailsStyles.productImage}>
                    <img src={src} alt={name}/>
                </div>
                <p className="text text_type_main-medium">
                    {name}
                </p>
                <div className={ingredientDetailsStyles.composition}>
                    <div className={ingredientDetailsStyles.compositionItem}>
                        <p className="text text_type_main-default text_color_inactive">
                            Калории, ккал
                        </p>
                        <p className="text text_type_main-default text_color_inactive text text_type_digits-default">
                            {calories}
                        </p>
                    </div>
                    <div>
                        <p className="text text_type_main-default text_color_inactive">
                            Белки, г
                        </p>
                        <p className="text text_type_main-default text_color_inactive text text_type_digits-default">
                            {proteins}
                        </p>
                    </div>
                    <div>
                        <p className="text text_type_main-default text_color_inactive">
                            Жиры, г
                        </p>
                        <p className="text text_type_main-default text_color_inactive text text_type_digits-default">
                            {fat}
                        </p>
                    </div>
                    <div>
                        <p className="text text_type_main-default text_color_inactive">
                            Углеводы, г
                        </p>
                        <p className="text text_type_main-default text_color_inactive text text_type_digits-default">
                            {carbohydrates}
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

IngredientDetails.propTypes = {
    name: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
    calories: PropTypes.number.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
}

export default IngredientDetails;
