import React, {useEffect, useState} from 'react';
import '../../App.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from './app.module.css';
import ErrorPage from '../error-page/error-page';
import LoadingPage from "../loading-page/loading-page";
import {addIngredient, getFeed} from "../../services/thunks/thunks";
import {useDispatch, useSelector} from "react-redux";
import {defaultAllIngredientsState, defaultConstructorState} from "../../services/reducers/rootReducer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {ADD_INGREDIENT, INCREASE_COUNT} from "../../services/actions/allActions";

export const baseUrl = 'https://norma.nomoreparties.space/api/';

export async function checkResponse(res: Response) {
    if (!res.ok) {
        throw new Error(`status: ${res.status}`);
    }
    return await res.json();
}

function App() {
    const [isLoading, setIsLoading] = useState(true);

    const {feedIngredientsRequest, feedIngredientsFailed, feedIngredients} =
        useSelector((state: typeof defaultAllIngredientsState) => state.allIngredientsReducer);
    // @ts-ignore
    const {constructorIngredient} = useSelector((state)  => state.draggableConstructorReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFeed() as any);
    }, [])

    useEffect(() => {
        if (feedIngredients) {
            setIsLoading(false)
        }
    }, [feedIngredientsRequest])

    if (isLoading) {
        return <LoadingPage />;
    }

    const onDropHandler = async (item: any) => {
        dispatch(addIngredient(item, constructorIngredient) as any)
    };

    return (
        <>
            {!isLoading &&
        <>
            {feedIngredientsFailed &&
            <ErrorPage/>
            }
            {feedIngredientsRequest &&
            <LoadingPage/>
            }
            {!feedIngredientsRequest && !feedIngredientsFailed &&
            <>
                <DndProvider backend={HTML5Backend}>
                    <div className={appStyles.wrapperHeader}>
                        <AppHeader/>
                    </div>
                    <h1 id="1" className={appStyles.titleMargin}>
                        Соберите бургер
                    </h1>
                    <div className={appStyles.wrapper}>
                        <BurgerIngredients />
                        <BurgerConstructor onDropHandler={onDropHandler}/>
                    </div>
                </DndProvider>
            </>
            }
        </>
            }
        </>
    );
};

export default App;


