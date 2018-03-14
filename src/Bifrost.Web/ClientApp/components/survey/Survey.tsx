import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as axios from "axios";
import { KeyboardEvent } from 'react';
import { CustomForm } from '../shared/CustomForm';
import { CustomFormInput } from "../shared/CustomFormInput";
import { Panel } from "../shared/Panel";
import { IBaseProps } from "../shared/IBaseProps";
import { IBaseState } from "../shared/IBaseState";

export interface ISurveyProps extends IBaseProps {

}

export interface ISurveyState extends IBaseState {
    isDone?: boolean;
}

export class Survey extends React.Component<RouteComponentProps<ISurveyProps>, ISurveyState>{
    constructor(props: RouteComponentProps<ISurveyProps>) {
        super(props);

        this.state = {
            isDone: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(){

    }

    handleInputChange(){

    }


    public render() {
        if (!this.state.isDone) {
            return <div style={{width: "100%"}}>
                <h2>Take a survey</h2>
                <CustomForm classes=""
                    id="SurveyForm"
                    onSubmit={this.handleSubmit}
                    errorMessage="You can't submit form which contains errors"
                    submitButtonText="Submit"
                    submitButtonStyle="btn-default"
                >
                    <Panel classes="panel-default"
                           id="PersonalInfo"
                           panelHeader="Personal information">
                        <div className="row">
                            <CustomFormInput classes="col-md-4 form-group"
                                            id="FirstName"
                                            errorMessage="First Name can contain only alphabetical data wiht spaces"
                                            onChange={this.handleInputChange}
                                            regex="^[a-zA-Z ]+$"
                                            title="First Name"
                                            type="text"
                                            required={true}>
                            </CustomFormInput>
                            <CustomFormInput classes="col-md-4 form-group"
                                            id="LastName"
                                            errorMessage="Last Name can contain only alphabetical data wiht spaces"
                                            onChange={this.handleInputChange}
                                            regex="^[a-zA-Z ]+$"
                                            title="Last Name"
                                            type="text"
                                            required={true}>
                            </CustomFormInput>
                            <CustomFormInput classes="col-md-4 form-group"
                                            id="Age"
                                            errorMessage="Age must be number between 18 and 99"
                                            onChange={this.handleInputChange}
                                            regex="^[a-zA-Z ]+$"
                                            title="Age"
                                            type="number"
                                            minNumber={18}
                                            maxNumber={99}
                                            required={true}>
                            </CustomFormInput>
                        </div>
                    </Panel>
                </CustomForm>
            </div>;
        } else {
            return <div className="container content-center" style={{ textAlign: "center" }}>
                <h1>Success!</h1>
            </div>;
        }
    }
}

