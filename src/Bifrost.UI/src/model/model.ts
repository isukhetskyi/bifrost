
export interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

export interface Login {
    Email: string;
    Password: string;
    RememberMe: boolean;
}

export interface Survey {

}

export enum ActionType {
    ADD_TODO,
    DELETE_TODO,
    COMPLETE_TODO,
    UNCOMPLETE_TODO,
    SURVEY,
    STATISTICS,
    LOGIN,
}

export interface Action<T> {
    type: ActionType;
    payload: T;
}