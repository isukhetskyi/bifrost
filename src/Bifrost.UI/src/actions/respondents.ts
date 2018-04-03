import { Action, ActionType, Respondent } from '../model/model';

export function getStatistics(respondents: Respondent[]): Action<Respondent[]> {
    return {
        type: ActionType.GET_RESPONDENTS,
        payload: respondents
    };
}