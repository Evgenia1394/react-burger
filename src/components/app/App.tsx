import React, {useEffect, useState} from 'react';
import '../../App.css';
import AppHeader from "../app-header/app-header";
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import appStyles from './app.module.css';
import ErrorPage from '../error-page/error-page';
import LoadingPage from "../loading-page/loading-page";
import {addIngredient, getFeed} from "../../services/actions/thunks";
import {useDispatch, useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {defaultAllIngredientsState} from "../../services/reducers/all-ingredients-reducer";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Login} from "../../pages/login";
import {ForgotPassword} from "../../pages/forgot-password";
import {Registration} from "../../pages/registration";
import {ResetPassword} from "../../pages/reset-password";
import {Profile} from "../../pages/profile";
import {ProtectedRoute} from "../protected-route";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {SingleModalIngredient} from "../single-ingredient/single-ingredient";

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
    const {constructorIngredient} = useSelector((state) => state.draggableConstructorReducer);

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
        return <LoadingPage/>;
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
                    <Router>
                        <div className={appStyles.wrapperHeader}>
                            <AppHeader/>
                        </div>
                        <Switch>
                            <Route path="/" exact={true}>
                                <DndProvider backend={HTML5Backend}>

                                    <h1 id="1" className={appStyles.titleMargin}>
                                        Соберите бургер
                                    </h1>
                                    <div className={appStyles.wrapper}>
                                        <BurgerIngredients/>
                                        <BurgerConstructor onDropHandler={onDropHandler}/>
                                    </div>
                                </DndProvider>
                            </Route>
                            <Route path="/login" exact={true}>
                                <Login/>
                            </Route>

                            <Route path="/forgot-password" exact={true}>
                                <ForgotPassword/>
                            </Route>

                            <Route path="/register" exact={true}>
                                <Registration/>
                            </Route>

                            <Route path="/reset-password" exact={true}>
                                <ResetPassword/>
                            </Route>

                            <ProtectedRoute path="/profile" exact={true}>
                                <Profile/>
                            </ProtectedRoute>

                            <Route path="/ingredients/:id">
                                <SingleModalIngredient />
                            </Route>
                        </Switch>
                    </Router>
                </>
                }
            </>
            }
        </>
    );
}

export default App;


