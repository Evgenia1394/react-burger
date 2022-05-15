import React, {useState} from 'react';
import ingredientCardStyles from './ingredient-card.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {burgerItem} from '../burgerItem';
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {useDrag} from "react-dnd";
import {useDispatch, useSelector} from "react-redux";
import {OPEN_INGREDIENT} from "../../services/actions/ingredient-actions";

const IngredientCard = (props) => {
    const [visible, setVisible] = useState(false);
    const {data} = props;
    const {image, name, calories, proteins, fat, carbohydrates, price, _id, type} = props.data;
    const {constructorIngredient} = useSelector((state) => state.draggableConstructorReducer);

    const dispatch = useDispatch();

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

    const handleOpenModal = () => {
        dispatch({
            type: OPEN_INGREDIENT,
            payload: data
        })
        setVisible(true);
    }

    const modal =
        <Modal
            setVisible={setVisible}
            isIngredientDetail={true}
        >
            <IngredientDetails
                src={image}
                name={name}
                calories={calories}
                proteins={proteins}
                fat={fat}
                carbohydrates={carbohydrates}
            />
        </Modal>

    return (
        <> {!isDrag &&
            <div className={ingredientCardStyles.wrapper}
                 ref={dragRef}
                 draggable
                 onClick={handleOpenModal}
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
        }
        {visible && modal}
        </>
        )
}

IngredientCard.propTypes = {
    data: burgerItem.isRequired,
}

export default IngredientCard;
