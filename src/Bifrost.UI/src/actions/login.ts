import { Action, ActionType, Login } from '../model/model';

export function login(user: Login): Action<Login> {
    
    return {
        type: ActionType.LOGIN,
        payload: user
    };
}