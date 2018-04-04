import { Action, ActionType, Respondent } from '../model/model';

export function getRespondent(respondents: Respondent): Action<Respondent> {
    return {
        type: ActionType.GET_RESPONDENT,
        payload: respondents
    };
}