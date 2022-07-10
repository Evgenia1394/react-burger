import feedStyles from "./feed-style.module.css";
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FC} from "react";
import {useMySelector} from "../../services/store";
import {IBurgerItem, TOrderProps} from "../../types";
import {Link} from "react-router-dom";

export const FeedCard: FC<TOrderProps> = (props) => {
    const idIngredients = props.ingredients;
    const allIngredients = useMySelector(state => state.allIngredientsReducer.feedIngredients.data);

    const completeIngredients: IBurgerItem[] = [];
    const maxIngredients = 6;
    let orderImages: string[] = [];
    let total = 0;

    idIngredients.forEach(elem => {
        const completeIngredient = allIngredients?.find(item => item._id === elem)
        if (completeIngredient) {
            completeIngredients.push(completeIngredient)
        }
    })

    completeIngredients.forEach(elem => {
        orderImages.push(elem.image!);
        total += elem.price
    })

    const ingredientsToShow = orderImages.slice(0, maxIngredients);
    const ingredientsToHidden = orderImages.length > maxIngredients ? orderImages.length - maxIngredients : null;

    return (
        <Link to={{pathname: props.isHistory ? `/profile/orders/${props._id}` : `/feed/${props._id}`, state: { background: "location" }}} >
        <div key={props._id}>
            <div className={feedStyles.card}>
                <div className={feedStyles.cardContent}>
                    <div>
                        <p className="text text_type_digits-default">{`#${props.number}`}</p>
                    </div>
                    <div>
                        <p className="text text_type_main-default text_color_inactive">
                            {props.createdAt}
                        </p>
                    </div>
                </div>
                <div>
                    <p className={props.name.length < 57 ? "text text_type_main-medium": "text text_type_main-small"}>
                        {props.name}
                    </p>
                    {props.isHistory &&
                    <p className="text text_type_main-default">
                        {props.status === 'done' ? 'Выполнен' : 'Готовится'}
                    </p>
                    }
                </div>
                <div className={feedStyles.cardContent}>
                    <div className={feedStyles.orderImages}>
                        {ingredientsToShow.map((src, index) => {
                            let zIndex = maxIngredients - index;
                            let left = 50*index;
                            return (
                                <div style={{ zIndex: zIndex, left: left }}
                                     className={feedStyles.orderImagesBackground}
                                     key={index}
                                >
                                    <img src={src} />
                                    {maxIngredients === index + 1 ? (
                                        <span className={feedStyles.hiddenIngredients}>
                                            {ingredientsToHidden && ingredientsToHidden > 0 ? `+${ingredientsToHidden}` : null}
                                        </span>
                                    ) : null }
                                </div>
                            )
                        })}
                    </div>
                    <div className={feedStyles.cardSum}>
                        <p className="text text_type_main-medium">{total}
                        </p><CurrencyIcon type="primary"/>
                    </div>
                </div>
            </div>
        </div>
        </Link>
    )
}


