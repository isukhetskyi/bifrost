import * as React from "react";
import { IBaseProps } from "../shared/IBaseProps";
import { IBaseState } from "../shared/IBaseState";

export interface ICustomSelectProps extends IBaseProps {
    selectId: string;
    options: Array<[string, string]>;
    selectTitle: string;
    handleDropdownChange: any;
}

export interface ICustomSelectState extends IBaseState {

}

export class CustomSelect extends React.Component<ICustomSelectProps, ICustomSelectState>{
    constructor(props: ICustomSelectProps) {
        super(props);
        this.state = {}
    }

    renderSelect(options: Array<[string, string]>){
        let elements: any;

        elements = options.map((item: [string,string], index: number) =>
                    <option key={index} value={item["0"]}>{item["1"]}</option>
                );
        return elements;
    }

    render() {
        return <div className={this.props.classes} id={this.props.id}>
            <label htmlFor={this.props.selectId}>{this.props.selectTitle}:</label>
            <select className="form-control"
                onChange={e => { this.props.handleDropdownChange(e) }}
                id={this.props.selectId}>
                {this.renderSelect.call(this, this.props.options)}
            </select>
        </div>;
    }
}