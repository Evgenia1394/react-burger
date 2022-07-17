import burgerStyles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {LegacyRef, useRef} from "react";
import {useDrag, useDrop} from "react-dnd";
import {constructorActions} from "../../services/actions/constructor-actions";
import {IBurgerItem} from "../../types";
import {useMyDispatch} from "../../services/store";

export const ConstructorIngredient = (props: IConstructorIngredient) => {

    const ref = useRef(null);
    const item = props.ingredient;
    const dispatch = useMyDispatch();

    const [, dragRef] = useDrag({
        type: "constructor",
        item: item,
    });

    const [, dropTarget] = useDrop({
        accept: "constructor",
        drop(dropItem: IBurgerItem) {
            dispatch({
                type: constructorActions.SORT_INGREDIENT,
                payload: {
                    dragIngredient: item,
                    dropIngredient: dropItem,
                }
            })
        }
    });
    (dragRef(dropTarget(ref)));

    const handleClose = (id: string) => {
        dispatch({
            type: constructorActions.DECREASE_COUNT,
            id: id
        })
    }


    return (
    <div className={burgerStyles.wrapperItem}
         key={props.key}
         ref={dragRef(dropTarget(ref)) as LegacyRef<HTMLDivElement> | undefined}
    >
        <div className={burgerStyles.dragIcon} >
            <DragIcon type="primary"/>
        </div>
        <div className={burgerStyles.product}>
            <ConstructorElement
                handleClose={() => handleClose(props.ingredient._id)}
                isLocked={props.ingredient.type === 'bun'}
                text={props.ingredient.name}
                price={props.ingredient.price}
                thumbnail={props.ingredient.image}
            />
        </div>
    </div>
    )
}

export interface IConstructorIngredient {
    ingredient: IBurgerItem,
    key?: string
}


