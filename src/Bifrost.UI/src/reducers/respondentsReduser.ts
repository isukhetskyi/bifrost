import createReducer from './createReducer';
import { ActionType, Respondent, Action } from '../model/model';
import * as axios from 'axios';

export const respondents = createReducer([], {
    [ActionType.GET_RESPONDENTS](action: Action<Respondent[]>) {
        axios.default.get('http://localhost:5000/api/respondents/all')
            .then(function (response: any) {
                // thisContext.setState({ isDone: true });
                console.log(response);
            }).catch(function (error: any) {
                // tslint:disable-next-line:no-console
                console.error(error);
                alert(error);
        });
    }
});