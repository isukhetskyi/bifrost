
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

export class RespondentModel {
    id: number;
    firstName: string;
    lastName: string;
    age: number;
    address: string;
    isEmployed: boolean;
    currentPossition: string;
    phone: string;
    skype: string;
    email: string;
    placeOfStudying: string;
    speciality: string;
    technologies: string;
    otherInfo: string;
    createdDate: string;

    constructor() {
        this.id = -1;
        this.firstName = '';
        this.lastName = '';
        this.age = -1;
        this.address = '';
        this.isEmployed = false;
        this.currentPossition = '';
        this.phone = '';
        this.skype = '';
        this.email = '';
        this.placeOfStudying = '';
        this.speciality = '';
        this.technologies = '';
        this.otherInfo = '';
        this.createdDate = '';
    }
}

export interface Survey {

}

export interface Select {

}

export interface SignUp {

}

export enum ActionType {
    ADD_TODO,
    DELETE_TODO,
    COMPLETE_TODO,
    UNCOMPLETE_TODO,
    SURVEY,
    STATISTICS,
    GET_RESPONDENTS,
    GET_RESPONDENT,
    LOGIN,
    SIGNUP,
}

export interface Action<T> {
    type: ActionType;
    payload: T;
}