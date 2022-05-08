import React, {useEffect, useRef, useState} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import {useSelector} from "react-redux";

const BurgerIngredients = (props) => {
    const [current, setCurrent] = useState('Булки');
    const {feedIngredientsRequest, feedIngredientsFailed, feedIngredients} =
        useSelector((state)  => state.allIngredientsReducer);

    const buns = feedIngredients.data.filter(ingredient => ingredient.type === 'bun');
    const sauces = feedIngredients.data.filter(ingredient => ingredient.type === 'sauce')
    const mains = feedIngredients.data.filter(ingredient => ingredient.type === 'main');

    const tabSauceRef = useRef();
    const tabBunRef = useRef();
    const tabMainRef = useRef();
    const menuRef = useRef();

    const scrollHandler = () => {
        const menuHeight = menuRef.current.getBoundingClientRect().top;
        const sauceHeight = Math.abs(tabSauceRef.current.getBoundingClientRect().top - menuHeight);
        const bunHeight = Math.abs(tabBunRef.current.getBoundingClientRect().top - menuHeight);
        const mainHeight = Math.abs(tabMainRef.current.getBoundingClientRect().top - menuHeight);
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

    return (
        <div>
            <div ref={menuRef} className={burgerIngredientsStyles.wrapperTab}>
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
                    <h2 ref={tabBunRef} className="text text_type_main-medium title"
                        id="bun">
                        Булки
                    </h2>
                </div>
                <div className={burgerIngredientsStyles.category}>
                    {buns.map((burger) => (
                        <IngredientCard key={burger._id} data={burger} />
                    ))}
                </div>
                <h2 ref={tabSauceRef} className="text text_type_main-medium"
                    id="sauce"
                >Соусы
                </h2>
                <div className={burgerIngredientsStyles.category}>
                    {sauces.map((burger) => (
                        <IngredientCard key={burger._id} data={burger} />
                    ))}
                </div>
                <h2 ref={tabMainRef} className="text text_type_main-medium"
                    id="main">
                    Начинки
                </h2>
                <div className={burgerIngredientsStyles.category}>
                    {mains.map((burger) => (
                        <IngredientCard key={burger._id} data={burger} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BurgerIngredients;
