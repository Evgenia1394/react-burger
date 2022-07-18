import {baseUrl} from "./burger-api";

export const getIngredientsApi: Promise<Response> = fetch(`${baseUrl}ingredients`)
