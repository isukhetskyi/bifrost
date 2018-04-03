
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

export interface Respondent {
    Id: number;
    FirstName: string;
    LastName: string;
    Age?: number;
    IsEmployed: boolean;
    Phone?: string;
    Skype?: string;
    Email?: string;
    Technologies?: string;
    CreatedShortDate?: string;
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
    GET_RESPONDENTS,
    LOGIN,
}

export interface Action<T> {
    type: ActionType;
    payload: T;
}