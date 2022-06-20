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
    key?: number
}

export interface IForm {
    [name: string]: string | number | boolean;
}
