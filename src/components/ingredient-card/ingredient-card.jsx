import React from 'react';
import ingredientCardStyles from './ingredient-card.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {burgerItem} from '../burgerItem';
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

const IngredientCard = (props) => {
    const {data} = props;
    const {image, name, calories, proteins, fat, carbohydrates, price, _id, type} = props.data;
    const {constructorIngredient} = useSelector((state) => state.draggableConstructorReducer);

    const count = constructorIngredient.filter(ingredient => (ingredient._id === _id))
            .filter(ingredient => ingredient.type !== 'bun')[0] ?
            constructorIngredient.filter(ingredient => ingredient._id === _id)[0].count : 0;

    const bunCount = constructorIngredient.filter(ingredient => (ingredient._id === _id))
        .filter(ingredient => ingredient.type === 'bun')[0] ? 1 : 0;

    const item = data;
    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredients',
        item: item,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        }),
    })

    return (
        <>{!isDrag &&

        <Link to={{pathname: `/ingredients/${_id}`, state: { background: "location" }}} >
        <div className={ingredientCardStyles.wrapper}
                 ref={dragRef}
                 draggable
            >
                <img src={image} alt={name}/>
                <div className={ingredientCardStyles.price}>
                    <p className="text text_type_digits-default">{price}
                    </p>
                    <CurrencyIcon type="primary"/>
                    {(type === 'bun' && bunCount) &&
                        <Counter count={bunCount} size="default"/>
                    }
                    {(type !== 'bun' && count) &&
                        <Counter count={count} size="default"/>}
                </div>
                <p className="text text_type_main-default">{name}</p>
            </div>
            </Link>
        }
        </>
        )
}

IngredientCard.propTypes = {
    data: burgerItem.isRequired,
}

export default IngredientCard;
