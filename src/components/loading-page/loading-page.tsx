import React from "react";
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import loadingStyle from "./loading-page.module.css"


const LoadingPage = () => {
    return (
        <>
            <div className={loadingStyle.wrapper}>
                <h1 className="text text_type_main-large">Loading...</h1>
                <Logo/>
            </div>
        </>
    )
}
export default LoadingPage;
