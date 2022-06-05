import React, {useEffect, useRef, useState} from 'react';
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredientsStyles from './burger-ingredients.module.css';
import IngredientCard from '../ingredient-card/ingredient-card';
import {useDispatch, useSelector} from "react-redux";
import {OPEN_INGREDIENT} from "../../services/actions/ingredient-actions";
import {OPEN_MODAL} from "../../services/actions/modal-actions";

const BurgerIngredients = () => {
    const dispatch = useDispatch()

    const [current, setCurrent] = useState('Булки');
    const {feedIngredientsRequest, feedIngredientsFailed, feedIngredients} =
        useSelector((state) => state.allIngredientsReducer);

    const buns = feedIngredients.data.filter(ingredient => ingredient.type === 'bun');
    const sauces = feedIngredients.data.filter(ingredient => ingredient.type === 'sauce')
    const mains = feedIngredients.data.filter(ingredient => ingredient.type === 'main');

    const tabSauceRef = useRef();
    const tabBunRef = useRef();
    const tabMainRef = useRef();
    const menuRef = useRef();

    const scrollHandler = () => {
        if(!menuRef.current) return;
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

    const handleOpenModal = (_id) => {
        const currentProduct = feedIngredients.data.find(item => item._id === _id);
            dispatch({
                type: OPEN_INGREDIENT,
                payload: currentProduct
            })
            dispatch({
                type: OPEN_MODAL,
            });
        }
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
                <div  className={burgerIngredientsStyles.category}>
                    {buns.map((burger) => (
                        <div  key={burger._id} onClick={()=>handleOpenModal(burger._id)} >
                            <IngredientCard data={burger} />
                        </div>

                    ))}
                </div>
                <h2 ref={tabSauceRef} className="text text_type_main-medium"
                    id="sauce"
                >Соусы
                </h2>
                <div className={burgerIngredientsStyles.category}>
                    {sauces.map((burger) => (
                        <div key={burger._id} onClick={()=>handleOpenModal(burger._id)} >
                            <IngredientCard  data={burger} />
                        </div>
                    ))}
                </div>
                <h2 ref={tabMainRef} className="text text_type_main-medium"
                    id="main">
                    Начинки
                </h2>
                <div className={burgerIngredientsStyles.category}>
                    {mains.map((burger) => (
                        <div  key={burger._id} onClick={()=>handleOpenModal(burger._id)} >
                            <IngredientCard data={burger} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BurgerIngredients;
