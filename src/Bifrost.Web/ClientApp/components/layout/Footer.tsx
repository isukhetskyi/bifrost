import * as React from "react";
import { IBaseProps } from "../shared/IBaseProps";

export interface IFooterProps extends IBaseProps{

}

export interface IFooterState{

}

export class Footer extends React.Component<IFooterProps, IFooterState>{
    constructor(props: IFooterProps){
        super(props);
        this.state = {};
    }

    public render(){
        return  <div className={this.props.classes} id={this.props.id}>
                    <div className="row">
                        <div className="col-md-12 col-xs-12">
                            <div className="copyright" style={{ textAlign: "center" }}>
                                <p>
                                    {new Date().getFullYear()} <a href="http://netls.com.ua/" target="_blank">NetLS Software Development</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>;
    }
}