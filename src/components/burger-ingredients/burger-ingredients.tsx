import React, {LegacyRef, useEffect, useRef, useState} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import {ingredientActions, OPEN_INGREDIENT} from "../../services/actions/ingredient-actions";
import {modalActions, OPEN_MODAL} from "../../services/actions/modal-actions";
import {IBurgerItem} from "../../types";
import {useMyDispatch, useMySelector} from "../../services/store";

const BurgerIngredients = () => {
    const dispatch = useMyDispatch()

    const [current, setCurrent] = useState('Булки');

    const allIngredients = useMySelector((state) => state.allIngredientsReducer);
    let feedIngredients = allIngredients.feedIngredients;

    const buns = feedIngredients?.data?.filter((ingredient: IBurgerItem) => ingredient.type === 'bun');
    const sauces = feedIngredients?.data?.filter((ingredient: IBurgerItem) => ingredient.type === 'sauce')
    const mains = feedIngredients?.data?.filter((ingredient: IBurgerItem) => ingredient.type === 'main');

    const tabSauceRef = useRef<HTMLDivElement>();
    const tabBunRef = useRef<HTMLDivElement>();
    const tabMainRef = useRef<HTMLDivElement>();
    const menuRef = useRef<HTMLDivElement>();

    const scrollHandler = () => {
        if (!menuRef.current) return;
        const menuHeight = menuRef.current.getBoundingClientRect().top;
        if (!tabSauceRef.current) return;
        const sauceHeight = Math.abs(tabSauceRef.current.getBoundingClientRect().top - menuHeight)
        if (!tabBunRef.current) return;
        const bunHeight = Math.abs(tabBunRef.current.getBoundingClientRect().top - menuHeight)
        if (!tabMainRef.current) return;
        const mainHeight = Math.abs(tabMainRef.current.getBoundingClientRect().top - menuHeight)
        const minHeight = Math.min(sauceHeight, bunHeight, mainHeight)

        if (minHeight === sauceHeight) {
            setCurrent('Соусы')
        } else if (minHeight === mainHeight) {
            setCurrent('Начинки')
        } else {
            setCurrent('Булки')
        }

    };
    useEffect(() => {
        window.addEventListener("scroll", scrollHandler, true);
        return () => {
            window.removeEventListener("scroll", scrollHandler, true);
        };
    }, []);

    const handleOpenModal = (_id: string) => {
        const currentProduct = feedIngredients?.data?.find((item: IBurgerItem) => item._id === _id);

            // @ts-ignore
        dispatch({
                type: ingredientActions.OPEN_INGREDIENT,
                payload: currentProduct
            })
            dispatch({
                type: modalActions.OPEN_MODAL,
            });
        }
    return (
        <div>
            <div ref={menuRef as LegacyRef<HTMLDivElement> | undefined} className={burgerIngredientsStyles.wrapperTab}>
                <a href="#bun">
                    <Tab value="Булки" active={current === 'Булки'} onClick={setCurrent}>
                        Булки
                    </Tab>
                </a>
                <a href="#sauce">
                    <Tab value="Соусы" active={current === 'Соусы'} onClick={setCurrent}>
                        Соусы
                    </Tab>
                </a>
                <a href="#main">
                    <Tab value="Начинки" active={current === 'Начинки'} onClick={setCurrent}>
                        Начинки
                    </Tab>
                </a>
            </div>
            <div className={burgerIngredientsStyles.content}>
                <div className={burgerIngredientsStyles.title}>
                    <h2 ref={tabBunRef as LegacyRef<HTMLDivElement> | undefined} className="text text_type_main-medium title"
                        id="bun">
                        Булки
                    </h2>
                </div>
                {buns &&
                    <div className={burgerIngredientsStyles.category}>
                        {buns.map((burger: IBurgerItem) => (
                            <div  key={burger._id} onClick={()=>handleOpenModal(burger._id)} >
                                <IngredientCard data={burger} />
                            </div>

                        ))}
                </div>
                }
                <h2 ref={tabSauceRef as LegacyRef<HTMLDivElement> | undefined} className="text text_type_main-medium"
                    id="sauce"
                >Соусы
                </h2>
                {sauces &&
                    <div className={burgerIngredientsStyles.category}>
                    {sauces.map((burger: IBurgerItem) => (
                        <div key={burger._id} onClick={()=>handleOpenModal(burger._id)} >
                            <IngredientCard  data={burger} />
                        </div>
                    ))}
                </div>
                }
                <h2 ref={tabMainRef as LegacyRef<HTMLDivElement> | undefined} className="text text_type_main-medium"
                    id="main">
                    Начинки
                </h2>
                {mains &&
                    <div className={burgerIngredientsStyles.category}>
                    {mains.map((burger: IBurgerItem) => (
                        <div  key={burger._id} onClick={()=>handleOpenModal(burger._id)} >
                            <IngredientCard data={burger} />
                        </div>
                    ))}
                </div>
                }
            </div>
        </div>
    )
}

export default BurgerIngredients;
