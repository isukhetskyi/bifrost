import * as React from "react";
import { IBaseProps } from "../shared/IBaseProps";
import { IBaseState } from "../shared/IBaseState";

export interface IPanelProps extends IBaseProps {
    panelHeader: string;
}

export interface IPanelState extends IBaseState {

}

export class Panel extends React.Component<IPanelProps, IPanelState>{
    constructor(props: IPanelProps) {
        super(props);
        this.state = {}
    }

    render() {
        return <div className={"panel " + this.props.classes} id={this.props.id}>
            <div className="panel-heading">
                <h3>{this.props.panelHeader}</h3>
            </div>
            <div className="panel-body">
                {this.props.children}
            </div>
        </div>
    }
}