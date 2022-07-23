import ingredientDetailsStyles from './ingredient-details.module.css'
import React from "react";

const IngredientDetails = (props: IIngredientDetails) => {
    const {src, name, calories, proteins, fat, carbohydrates, single} = props;

    return (
        <>
            <div className={ingredientDetailsStyles.wrapper}>
                <h2 className={single ? ingredientDetailsStyles.singleHeader : ingredientDetailsStyles.header}>
                    <p className="text text_type_main-large">
                        Детали ингредиента
                    </p>
                </h2>
                <div className={ingredientDetailsStyles.productImage}>
                    <img src={src} alt={name}/>
                </div>
                <p className={single ? ingredientDetailsStyles.singleIngredientName : ingredientDetailsStyles.ingredientName}>
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

export interface IIngredientDetails {
    name: string,
    src: string,
    calories: number,
    proteins: number,
    fat: number,
    carbohydrates: number,
    single?: boolean
}

export default IngredientDetails;
