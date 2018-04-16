import { Action, ActionType, SignUp } from '../model/model';

export function singUp(user: SignUp): Action<SignUp> {
    return {
        type: ActionType.SIGNUP,
        payload: user
    };
}