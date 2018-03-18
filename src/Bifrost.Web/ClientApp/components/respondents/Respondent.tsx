import * as React from "react";
import { IBaseProps } from "../shared/IBaseProps";
import { IBaseState } from "../shared/IBaseState";
import { RouteComponentProps, Route } from "react-router";
import * as axios from "axios";
import { RespondentModel } from "../models/RespondentModel";
import { Respondents } from "./Respondents";
import { Panel } from "../shared/Panel";

export interface IRespondentProps extends IBaseProps {
}

export interface IRespondentState extends IBaseState {
    respondent: RespondentModel;
}

export class Respondent extends React.Component<IRespondentProps & RouteComponentProps<{}>, IRespondentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            respondent: new RespondentModel()
        }

        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        let respondentId = (this.props.match.params as any).number;
        let context = this;
        let res: RespondentModel;
        axios.default.get("/respondents/respondent"
            , {
                params: {
                    respondentId: respondentId
                }
            })
            .then(function (response) {
                res = response.data.respondent;
                context.setState({ respondent: response.data.respondent as RespondentModel });
                console.log(response);
            })
            .catch(function (error) {
                debugger;
                console.error(error);
            })
    }

    render() {
        return <div style={{ width: "100%" }}>
            <button
            className="btn btn-default"
            style={{marginTop: 30, width:"100%", textAlign: "left"}}
            onClick={(e: any) => {this.props.history.goBack()}}>
                Back to list
            </button>
            <Panel id="personalInfo" classes="panel-default" panelHeader="Personal information">
                <div className="row">
                    <div className="col-md-2 content-center">
                        {"Name: "}
                    </div>
                    <div className="col-md-3">
                        {this.state.respondent.firstName + " " + this.state.respondent.lastName}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-2">
                        {"Age: "}
                    </div>
                    <div className="col-md-3">
                        {this.state.respondent.age + "year(s)"}
                    </div>
                </div>
            </Panel>
            <Panel id="Work experience" classes="panel-default" panelHeader="Work experiance">
                <div className="row">
                    <div className="col-md-2">
                        {"Is employed?"}
                    </div>
                    <div className="col-md-3">
                        {this.state.respondent.isEmployed ? "Yes" : "No"}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-2">
                        {"Current position"}
                    </div>
                    <div className="col-md-3">
                        {this.state.respondent.isEmployed ? this.state.respondent.currentPossition : "Unemployed"}
                    </div>
                </div>
                <hr/>
                <div className="row">
                    <div className="col-md-2">
                        {"Exerienced with"}
                    </div>
                    <div className="col-md-3">
                        {this.state.respondent.technologies}
                    </div>
                </div>
            </Panel>
            <Panel id="Contact info" classes="panel-default" panelHeader="Contact information">
                <div className="row">
                    <div className="col-md-2">
                        {"Address"}
                    </div>
                    <div className="col-md-3">
                        {this.state.respondent.address}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-2">
                        {"Phone"}
                    </div>
                    <div className="col-md-3">
                        {this.state.respondent.phone}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-2">
                        {"Skype"}
                    </div>
                    <div className="col-md-3">
                        {this.state.respondent.skype}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-2">
                        {"Email"}
                    </div>
                    <div className="col-md-3">
                        {this.state.respondent.email}
                    </div>
                </div>
            </Panel>
            <Panel id="educationInfo" classes="panel-default" panelHeader="Education information">
                <div className="row">
                    <div className="col-md-2">
                        {"Place of studying"}
                    </div>
                    <div className="col-md-3">
                        {this.state.respondent.placeOfStudying}
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className="col-md-2">
                        {"Speciality"}
                    </div>
                    <div className="col-md-3">
                        {this.state.respondent.speciality}
                    </div>
                </div>
            </Panel>
            <Panel id="otherInfo" classes="panel-default" panelHeader="Other info">
                <div className="row">
                    <div className="col-md-2">
                        {"Other Info"}
                    </div>
                    <div className="col-md-3">
                        {this.state.respondent.otherInfo}
                    </div>
                </div>
                <hr />
            </Panel>
        </div>
    }
}
