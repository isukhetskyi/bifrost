import * as React from "react";
import { IBaseProps } from "../shared/IBaseProps";

export interface IHeaderProps extends IBaseProps{

}

export interface IHeaderState{

}

export class Header extends React.Component<IHeaderProps, IHeaderState>{
    constructor(props: IHeaderProps){
        super(props);
        this.state = {};
    }

    public render(){
        return <div className={this.props.classes} id={this.props.id}>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                            </div>
                        </div>
                    </div>
                </div>;
    }
}