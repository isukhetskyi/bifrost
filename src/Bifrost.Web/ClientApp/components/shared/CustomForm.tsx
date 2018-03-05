import * as React from "react";
import { IBaseProps } from "./IBaseProps";
import { IBaseState } from "./IBaseState";

export interface ICustomFormProps extends IBaseProps {
    onSubmit: any;
    submitButtonText: string;
    errorMessage: string;
    submitButtonStyle: "btn-default" | "btn-primary" | "btn-info" | "btn-success" | "btn-warning" | "btn-danger";
    onKeyPress?: any;
}

export interface ICustomFormState extends IBaseState {
    containsErrors: boolean;
}

export class CustomForm extends React.Component<ICustomFormProps, ICustomFormState>{
    constructor(props: ICustomFormProps) {
        super(props)
        this.state = {
            containsErrors: false,

        };
    }

    public render() {
        return <form className={this.props.classes}
            id={this.props.id}
            onSubmit={e => this.props.onSubmit(e)}
            onKeyPress={e => this.props.onKeyPress(e)}>
            {this.props.children}
            <div className="row">
                <div className="col-md-12">
                    <button type="submit"
                        disabled={this.state.containsErrors}
                        className={"btn " + this.props.submitButtonStyle}
                    >
                        {this.props.submitButtonText}
                    </button>
                </div>
            </div>
            <div className="row"
                id={this.props.id + "Error"}
                style={{ display: this.state.containsErrors ? "block" : "none" }}>
                <div className="col-md-12 btn-wrapper">
                    <label className="text-danger" style={{ marginTop: "50px" }}>{this.props.errorMessage}</label>
                </div>
            </div>
        </form>;
    }
}