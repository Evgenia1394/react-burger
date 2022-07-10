import React from 'react';
import ingredientCardStyles from './ingredient-card.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag} from "react-dnd";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {IBurgerItem} from "../../types";
import {useMySelector} from "../../services/store";

const IngredientCard = (props: IIngredientCard) => {
    const {data} = props;
    const {image, name, price, _id, type} = props.data;

    const {constructorIngredient} = useMySelector((state) => state.draggableConstructorReducer);

    const count = constructorIngredient.filter((ingredient: IBurgerItem) => (ingredient._id === _id))
            .filter((ingredient: IBurgerItem) => ingredient.type !== 'bun')[0] ?
            constructorIngredient.filter((ingredient: IBurgerItem) => ingredient._id === _id)[0].count : 0;

    const bunCount = constructorIngredient.filter((ingredient: IBurgerItem) => (ingredient._id === _id))
        .filter((ingredient: IBurgerItem) => ingredient.type === 'bun')[0] ? 1 : 0;

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

export interface IIngredientCard {
    data: IBurgerItem
}

export default IngredientCard;
