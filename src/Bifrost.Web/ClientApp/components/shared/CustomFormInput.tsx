import * as React from "react";
import {IBaseProps} from "../shared/IBaseProps";
import {IBaseState} from "../shared/IBaseState";

export interface ICustomFormInputProps extends IBaseProps{
    title: string;
    type: string;
    errorMessage: string;
    datatype?: string;
    regex?: string;
    onChange?: any;
}

export interface ICustomFormInputState extends IBaseState{
    text: string;
    isError: boolean;
}

export class CustomFormInput extends React.Component<ICustomFormInputProps, ICustomFormInputState>{
    constructor(props: ICustomFormInputProps){
        super(props);
        this.state = {
            text: "",
            isError: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(e: any){
        this.props.onChange(e);
    }

    public render(){
        return <div className={this.props.classes}>
                    <div className="row">
                        <div className="col-md-12">
                            <label htmlFor={this.props.id}>{this.props.title}</label>
                            <input id={this.props.id}
                                className="form-control"
                                onChange={e => this.handleInputChange(e)}
                                onBlur={e => this.handleInputChange(e)}
                                type={this.props.type}
                                datatype={this.props.datatype}
                                pattern={this.props.regex}
                            />
                        </div>
                    </div>
                    <div className="row" id={this.props.id+"Error"} style={{ display: this.state.isError ? "block" : "none" }}>
                        <div className="col-md-12">
                            <label className="text-danger">{this.props.errorMessage}</label>
                        </div>
                    </div>
               </div>;
    }
}