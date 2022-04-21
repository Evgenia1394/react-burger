import React from "react";
import {Logo} from "@ya.praktikum/react-developer-burger-ui-components";
import errorStyle from "./error-page.module.css"


const ErrorPage = () => {
    return (
       <>
           <div className={errorStyle.wrapper}>
               <h1 className="text text_type_main-large">При запросе произошла ошибка</h1>
               <Logo/>
           </div>
       </>
    )
}
export default ErrorPage;
