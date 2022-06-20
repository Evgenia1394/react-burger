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
import { Route, Switch, useHistory, useLocation} from 'react-router-dom';
import {Login} from "../../pages/login";
import {ForgotPassword} from "../../pages/forgot-password";
import {Registration} from "../../pages/registration";
import {ResetPassword} from "../../pages/reset-password";
import {Profile} from "../../pages/profile";
import ProtectedAuthRoute from "../protected-auth-route";
import IngredientDetails from "../ingredient-details/ingredient-details";
import Modal from "../modal/modal";
import {HistoryOrders} from "../../pages/history-orders";
import {IBurgerItem} from "../../types";

function App() {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const location = useLocation();

    const {feedIngredientsRequest, feedIngredientsFailed, feedIngredients} =
        useSelector((state: typeof defaultAllIngredientsState) => state.allIngredientsReducer);

    // @ts-ignore
    const {image, name, calories, proteins, fat, carbohydrates} = useSelector((state) => state.ingredientReducer.detailsIngredient);
    // @ts-ignore
    const {ingredientReady} = useSelector((state) => state.ingredientReducer)
    // @ts-ignore
    const {isShowModal} = useSelector((state) => state.modalReducer);

    // @ts-ignore
    const {constructorIngredient} = useSelector((state) => state.draggableConstructorReducer);

    const dispatch = useDispatch();
    // @ts-ignore
    const background = location.state && location.state.background;

    useEffect(() => {
        dispatch(getFeed() as any);
    }, [])

    useEffect(() => {
        if (feedIngredients) {
            setIsLoading(false)
        }
    }, [feedIngredientsRequest])

    const onDropHandler = (item: IBurgerItem) => {
        // @ts-ignore
        dispatch(addIngredient(item, constructorIngredient))
    };

    if (isLoading) {
        return <LoadingPage/>;
    }

    const renderNoModalIngredient = () => {
        const idNoModalIngredient = location.pathname.split('/')[2];
        // @ts-ignore
        const item: {name: string, calories: number, image: string, proteins: number, fat: number, carbohydrates: number}
        // @ts-ignore
        = feedIngredients.data.find((item) => item._id === idNoModalIngredient);

        return (
            <>
            {!isLoading &&
                <IngredientDetails
                    src={item.image}
                    name={item.name}
                    calories={item.calories}
                    proteins={item.proteins}
                    fat={item.fat}
                    carbohydrates={item.carbohydrates}
                    single={true}
                />
        }</>
    )
    }

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
                        <div className={appStyles.wrapperHeader}>
                            <AppHeader/>
                        </div>

                        {isShowModal && ingredientReady && background &&
                        <Route path="/ingredients/:id">
                            <Modal
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
                        </Route>
                        }

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

                            <ProtectedAuthRoute onlyUnAuth={true} path="/login" exact={true}>
                                <Login/>
                            </ProtectedAuthRoute>

                            <ProtectedAuthRoute onlyUnAuth={true} path="/forgot-password" exact={true}>
                                <ForgotPassword/>
                            </ProtectedAuthRoute>

                            <ProtectedAuthRoute onlyUnAuth={true} path="/register" exact={true}>
                                <Registration/>
                            </ProtectedAuthRoute>

                            <ProtectedAuthRoute onlyUnAuth={true} path="/reset-password" exact={true}>
                                <ResetPassword/>
                            </ProtectedAuthRoute>

                            <ProtectedAuthRoute path="/profile" exact={true}>
                                <Profile/>
                            </ProtectedAuthRoute>

                            <ProtectedAuthRoute path="/profile/orders" exact={true}>
                                <HistoryOrders />
                            </ProtectedAuthRoute>

                            {!isShowModal &&
                                <Route path="/ingredients/:id" exact={true}>
                                    {renderNoModalIngredient}
                                </Route>
                            }
                        </Switch>
                </>
                }
            </>
            }
        </>
    );
};

export default App;

