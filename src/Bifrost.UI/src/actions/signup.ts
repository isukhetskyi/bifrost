import { Action, ActionType, Register } from '../model/model';

export function singUp(user: Register): Action<Register> {
    return {
        type: ActionType.REGISTER,
        payload: user
    };
}