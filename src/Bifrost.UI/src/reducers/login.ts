import createReducer from './createReducer';
import { Action, ActionType, Login } from '../model/model';
import * as axios from 'axios';

export const login = createReducer([], {
    [ActionType.LOGIN](state: Login, action: Action<Login>) {
        console.log(state);
        axios.default.post('/account/login',
                           state,
                           { headers: { 'Content-Type': 'application/json' } })
            .then(function (response: any) {
                // thisContext.setState({ isDone: true });
                console.log(response);
            }).catch(function (error: any) {
                // tslint:disable-next-line:no-console
                console.error(error);
                alert(error);
            });
        return {...state};
    }
});