import React, {useEffect, useState} from 'react';
import '../../App.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from './app.module.css';
import ErrorPage from '../error-page/error-page';
import LoadingPage from "../loading-page/loading-page";
import {IngredientsContext} from '../../services/ingredientContext';
import {burgerItem} from '../burgerItem';

export const baseUrl = 'https://norma.nomoreparties.space/api/';

export async function checkResponse(res: Response) {
    if (!res.ok) {
        throw new Error(`status: ${res.status}`);
    }
    return await res.json();
}

function App() {

    const [state, setState] = useState({
        data: [] as Promise<[typeof burgerItem]> | [],
        loading: true,
        error: false
    })

    useEffect(() => {
        const dataUrl = async () => {
            setState({...state, loading: true})
            try {
                const res = await fetch(`${baseUrl}ingredients`)
                const ingredientsData = await checkResponse(res);
                setState({...state, data: ingredientsData?.data as Promise<[typeof burgerItem]>, loading: false})
            } catch (e) {
                setState({...state, loading: false, error: true})
            }
        }
        dataUrl()
    }, [])

    return (
        <>
            {state.error &&
            <ErrorPage/>
            }
            {state.loading &&
            <LoadingPage/>
            }
            {!state.loading && !state.error &&
            <>
                <div className={appStyles.wrapperHeader}>
                    <AppHeader/>
                </div>
                <h1 id="1" className={appStyles.titleMargin}>
                    Соберите бургер
                </h1>
                <div className={appStyles.wrapper}>
                    <IngredientsContext.Provider value={state.data}>
                        <BurgerIngredients/>
                        <BurgerConstructor/>
                    </IngredientsContext.Provider>
                </div>
            </>
            }
        </>
    );

};

export default App;
