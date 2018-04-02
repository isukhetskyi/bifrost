
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface Login {
    email: string;
    password: string;
    rememberMe: boolean;
}

export enum ActionType {
    ADD_TODO,
    DELETE_TODO,
    COMPLETE_TODO,
    UNCOMPLETE_TODO,

    LOGIN,
}

export interface Action<T> {
    type: ActionType;
    payload: T;
}