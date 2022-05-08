import React, {useState} from 'react';
import ingredientCardStyles from './ingredient-card.module.css';
import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {burgerItem} from '../burgerItem';
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {useDrag} from "react-dnd";
import {useDispatch} from "react-redux";
import {OPEN_INGREDIENT} from "../../services/actions/allActions";

const IngredientCard = (props) => {
    const [visible, setVisible] = useState(false);

    const dispatch = useDispatch()

    const item = props.data;
    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredients',
        item: item,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    })


    const handleOpenModal = () => {
        dispatch({
            type: OPEN_INGREDIENT,
            payload: props.data
        })
        setVisible(true);
    }

    const modal =
        <Modal
            setVisible={setVisible}
        >
            <IngredientDetails
                src={props.data.image}
                name={props.data.name}
                calories={props.data.calories}
                proteins={props.data.proteins}
                fat={props.data.fat}
                carbohydrates={props.data.carbohydrates}
            />
        </Modal>

    return (
        <> {!isDrag &&
            <div className={ingredientCardStyles.wrapper}
                 ref={dragRef}
                 draggable
                 onClick={handleOpenModal}>
                <img src={props.data.image} alt={props.data.name}/>
                <div className={ingredientCardStyles.price}>
                    <p className="text text_type_digits-default">{props.data.price}
                    </p>
                    <CurrencyIcon type="primary"/><Counter count={1} size="default"/>
                </div>
                <p className="text text_type_main-default">{props.data.name}</p>
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
