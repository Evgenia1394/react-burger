export interface SyntheticEvent {
    bubbles: boolean;
    cancelable: boolean;
    currentTarget: EventTarget;
    defaultPrevented: boolean;
    eventPhase: number;
    isTrusted: boolean;
    nativeEvent: Event;
    preventDefault(): void;
    stopPropagation(): void;
    target: {
        value: string,
        name: string
    };
    timeStamp: Date;
    type: string;
}

export interface IBurgerItem {
    name: string,
    price: number,
    image: string,
    _id: string,
    type: string,
    calories: number,
    proteins: number,
    fat: number,
    carbohydrates: number,
    count?: number,
    key?: number,
    image_mobile?: string,
}

export interface IUser {
    name?: string,
    email?: string,
    password?: string;
}

export interface IForm {
    [name: string]: string | number | boolean;
}

export interface IUserForm {
    [name: string]: string | undefined;
}

export type ActionTypeCreatorFeed<Type, Payload> = {
    readonly type: Type;
    readonly feed?: Payload;
}

export type ActionTypeCreatorPayload<Type, Payload> = {
    readonly type: Type;
    readonly payload?: Payload;
}

export type ActionTypeCreatorId<Type, Payload> = {
    readonly type: Type;
    readonly id?: Payload;
}


export type TOrderProps = {
    _id: string,
    ingredients: Array<string>
    status: string,
    name: string,
    createdAt: string,
    updatedAt: string,
    number: number,
    isHistory?: boolean,
    single?: boolean
}

export interface IAllOrdersProps {
    messages?: Array<{
        orders:
            Array<{
                _id: string,
                ingredients: Array<string>
                status: string,
                name: string,
                createdAt: string,
                updatedAt: string,
                number: number
            }>,
        total: string, totalToday: string}>;
}

export interface IOneOrderResponse {
    orders:
        Array<{
            _id: string,
            ingredients: Array<string>
            status: string,
            name: string,
            createdAt: string,
            updatedAt: string,
            number: number
        }>,
    success: boolean
}


