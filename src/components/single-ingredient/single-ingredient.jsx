import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import React, {useEffect, useState} from "react";
import {useHistory, useLocation, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import LoadingPage from "../loading-page/loading-page";
import ErrorPage from "../error-page/error-page";
import {OPEN_MODAL} from "../../services/actions/modal-actions";

export const SingleModalIngredient = () => {
    const dispatch = useDispatch();
    const history = useHistory()

    const {feedIngredientsRequest, feedIngredientsFailed, feedIngredients} =
        useSelector((state) => state.allIngredientsReducer);
    const {isShowModal} = useSelector((state) => state.modalReducer);

    const [loadIngredient, setLoadIngredient] = useState(true);
    const {id} = useParams();
    const [singleIngredient, setSingleIngredient] = useState([]);

    useEffect(() => {
          setSingleIngredient(feedIngredients.data.find(ingredient => ingredient._id === id));
          setLoadIngredient(false);
          dispatch({type: OPEN_MODAL})

    }, [feedIngredientsRequest]);


    if(!history?.location?.state?.fromMain) {
        return(
            <>
                {!loadIngredient && isShowModal &&
                <>
                    {feedIngredientsFailed &&
                    <ErrorPage/>
                    }
                    {feedIngredientsRequest &&
                    <LoadingPage/>
                    }
                    {
                        !feedIngredientsRequest && !feedIngredientsFailed &&
                            <IngredientDetails
                                src={singleIngredient.image}
                                name={singleIngredient.name}
                                calories={singleIngredient.calories}
                                proteins={singleIngredient.proteins}
                                fat={singleIngredient.fat}
                                carbohydrates={singleIngredient.carbohydrates}
                                single={!history?.location?.state?.fromMain ? true : false}
                            />
                    }</>
                }
            </>
        )
    }

    return (
        <>
            {!loadIngredient && isShowModal &&
            <>
                {feedIngredientsFailed &&
                <ErrorPage/>
                }
                {feedIngredientsRequest &&
                <LoadingPage/>
                }
                {
                    !feedIngredientsRequest && !feedIngredientsFailed &&
                    <Modal
                        isIngredientDetail={true}
                    >
                    <IngredientDetails
                        src={singleIngredient.image}
                        name={singleIngredient.name}
                        calories={singleIngredient.calories}
                        proteins={singleIngredient.proteins}
                        fat={singleIngredient.fat}
                        carbohydrates={singleIngredient.carbohydrates}
                    />
                    </Modal>
                }</>
            }
        </>
    )
}
