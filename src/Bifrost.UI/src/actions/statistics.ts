import { Action, ActionType } from '../model/model';

export function getStatistics(mock: any): Action<any> {
    return {
        type: ActionType.STATISTICS,
        payload: mock
    };
}