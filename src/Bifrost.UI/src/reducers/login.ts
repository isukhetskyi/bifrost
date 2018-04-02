import createReducer from './createReducer';
import { Action, ActionType, Login } from '../model/model';

export const login = createReducer([], {
    [ActionType.LOGIN](state: Login, action: Action<Login>) {
        return {...state};
    }
});