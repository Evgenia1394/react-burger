import burgerStyles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {useRef, useState} from "react";
import {useDrag, useDrop} from "react-dnd";
import {useDispatch} from "react-redux";
import {DECREASE_COUNT, SORT_INGREDIENT} from "../../services/actions/constructor-actions";

export const ConstructorIngredient = (props) => {

    const [dropItem, setDropItem] = useState(null);
    const ref = useRef(null);
    const item = props.ingredient;
    const dispatch = useDispatch();

    // const dropHandler = (e, dropIngredient) => {
    //     e.preventDefault();
    //     setDropItem(dropIngredient)
    // }
    const [, dragRef] = useDrag({
        type: "constructor",
        item: item,
    });

    const [, dropTarget] = useDrop({
        accept: "constructor",
        drop(dropItem) {
            dispatch({
                type: SORT_INGREDIENT,
                payload: {
                    dragIngredient: item,
                    dropIngredient: dropItem,
                }
            })
        }
    });
    dragRef(dropTarget(ref));

    const handleClose = (id) => {
        dispatch({
            type: DECREASE_COUNT,
            id: id
        })
    }

    return (
    <div className={burgerStyles.wrapperItem}
         key={props.key}
         ref={dragRef(dropTarget(ref))}
    >
        <div className={burgerStyles.dragIcon} >
            <DragIcon type="primary"/>
        </div>
        <div className={burgerStyles.product}>
            <ConstructorElement
                handleClose={e => handleClose(props.ingredient._id)}
                type={props.ingredient.type}
                isLocked={props.ingredient.type === 'bun'}
                text={props.ingredient.name}
                price={props.ingredient.price}
                thumbnail={props.ingredient.image}
                draggable={true}
                // onDrop={e => dropHandler(e, props.ingredient)}
            />
        </div>
    </div>
    )
}
