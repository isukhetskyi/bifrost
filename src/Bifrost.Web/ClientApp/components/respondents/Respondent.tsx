import * as React from "react";
import { IBaseProps } from "../shared/IBaseProps";
import { IBaseState } from "../shared/IBaseState";
import { RouteComponentProps } from "react-router";
import * as axios from "axios";

export interface IRespondentProps extends IBaseProps{
    RespondentId: number;
}

export interface IRespondentState extends IBaseState{

}

export class Respondent extends React.Component<IRespondentProps & RouteComponentProps<{}>, IRespondentState> {
    constructor(props: any){
        super(props);
    }

    render(){
        return <div style={{width:"100%"}}>
            "Hello Respondent"
        </div>
    }
}