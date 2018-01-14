import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as fetch from 'node-fetch';
import { join } from 'path';

interface SurveyProps {

}

interface SurveyState {
    // general info
    FirstName?: string;
    LastName?: string;
    Age?: number;
    Address?: string;
    IsEmployed?: boolean;
    CurrentPosition?: string;
    Phone?: string;
    Skype?: string;
    Email?: string;

    //education
    PlaceOfStudying?: string;
    Speciality?: string;

    //work experience
    ProgrammingLanguagesCheckboxes?: Array<object>;
    FrameworksCheckboxes?: Array<object>;
    DatabasesCheckboxes?: Array<object>;

    ProgrammingLanguages?: Array<number>;
    Databases?: Array<number>;
    Frameworks?: Array<number>;

    //other info
    OtherInfo?: string;
}



export class Survey extends React.Component<RouteComponentProps<SurveyProps>, SurveyState> {
    constructor(props: any) {
        super(props);

        this.state = {
            FirstName: "",
            LastName: "",
            Age: 0,
            Address: "",
            IsEmployed: false,
            CurrentPosition: "",
            Phone: "",
            Email: "",
            Skype: "",
            PlaceOfStudying: "",
            Speciality: "",
            ProgrammingLanguagesCheckboxes: [],
            FrameworksCheckboxes: [],
            DatabasesCheckboxes: [],
            ProgrammingLanguages: [],
            Databases: [],
            Frameworks: [],

            OtherInfo: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
        this.renderCheckboxes = this.renderCheckboxes.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    componentWillMount(){
        let data: any;
        let thisContext = this;
        const request = fetch.default("http://localhost:5000/Survey/GetTechnologies")
            .then(function(res){return res.json()})
            .then(function(json){
                data = json.data;
                thisContext.setState({ProgrammingLanguagesCheckboxes: data.languages})
                thisContext.setState({FrameworksCheckboxes: data.frameworks})
                thisContext.setState({DatabasesCheckboxes: data.databases})
            });
    }

    renderCheckboxes(collectionName: string) {
        let elements: any;
        let collection: Array<object>|undefined;
        let datatype = "checkbox-"
        if (collectionName === "ProgrammingLanguagesCheckboxes") {
            collection = this.state.ProgrammingLanguagesCheckboxes;
            datatype += "programminglanguage"
        }
        if (collectionName === "FrameworksCheckboxes") {
            collection = this.state.FrameworksCheckboxes;
            datatype += "framework"
        }
        if (collectionName === "DatabasesCheckboxes") {
            collection = this.state.DatabasesCheckboxes;
            datatype += "database"
        }

        if(collection == undefined){
            collection = new Array<[number, string]>();
        }
        console.log(collection)
        elements = collection.map((checkbox: any, index: number) =>
            <div className="custom-control custom-checkbox">
                <input type="checkbox"
                    className="custom-control-input"
                    id={checkbox.id}
                    value={checkbox.value}
                    datatype={datatype}
                    onChange={e => this.handleCheckboxChange(e)}
                />
                <label className="custom-control-label" htmlFor="customCheck1">{checkbox.value}</label>
            </div>);
        return elements;
    }

    handleSubmit(event: any) {
        let body = JSON.stringify(this.state);
        console.log(body)

        const request = fetch.default("http://localhost:5000/Survey",
        {method: "POST", body: JSON.stringify(this.state), headers: {"Content-Type":"application/json"}})
            .then(res => console.log(res.body));
        event.preventDefault();
    }

    validate(e: any): boolean {
        // todo add here type retrievement to know which field we validating also add validation message;
        let result = false;
        let inputType = e.target.attributes.getNamedItem('datatype').value;
        if (inputType as string === "general-info-text") {
            let pattern = e.target.attributes.getNamedItem("data-regex").value;
            let regex = new RegExp(pattern);

            return regex.test(e.target.value as string);
        }
        else if (inputType as string === "general-info-number") {
            let pattern = e.target.attributes.getNamedItem("data-regex").value;
            let regex = new RegExp(pattern);
            return regex.test(e.target.value as string);
        }

        e.preventDefault();
        return result;
    }

    handleInputChange(e: any) {
        if (this.validate(e)) {
            this.setState({ [(e.target.attributes.id.value as string)]: e.target.value as string })
        }

        e.preventDefault();
        console.log(this.state);
    }

    handleRadioButtonChange(e: any) {
        if (e.target.id === "isEmployedYes") {
            this.setState({ IsEmployed: true });
        } else {
            this.setState({ IsEmployed: false });
        }

        e.preventDefault();
    }

    handleCheckboxChange(e: any) {
        let inputType = e.target.attributes.getNamedItem('datatype').value;
        if (inputType as string === "checkbox-programminglanguage") {
            if (e.target.checked) {
                let newArray = this.state.ProgrammingLanguages;
                if (newArray == undefined) {
                    newArray = new Array<number>();
                }

                newArray.push(e.target.value);
                this.setState({ ProgrammingLanguages: newArray });
            } else {

                if (this.state.ProgrammingLanguages != null) {
                    let newArray = this.state.ProgrammingLanguages;
                    let index = this.state.ProgrammingLanguages.indexOf(e.target.value, 0);
                    if (index > -1) {
                        newArray.splice(index, 1);
                    }
                    this.setState({ ProgrammingLanguages: newArray });
                }
            }
            console.log(this.state.ProgrammingLanguages)
        }
        if (inputType as string === "checkbox-database") {
            if (e.target.checked) {
                let newArray = this.state.Databases;
                if (newArray == undefined) {
                    newArray = new Array<number>();
                }

                newArray.push(e.target.value);
                this.setState({ Databases: newArray });
            } else {

                if (this.state.Databases != null) {
                    let newArray = this.state.Databases;
                    let index = this.state.Databases.indexOf(e.target.value, 0);
                    if (index > -1) {
                        newArray.splice(index, 1);
                    }
                    this.setState({ Databases: newArray });
                }
            }
            console.log(this.state.Databases)
        }
        if (inputType as string === "checkbox-framework") {
            if (e.target.checked) {
                let newArray = this.state.Frameworks;
                if (newArray == undefined) {
                    newArray = new Array<number>();
                }

                newArray.push(e.target.value);
                this.setState({ Frameworks: newArray });
            } else {

                if (this.state.Frameworks != null) {
                    let newArray = this.state.Frameworks;
                    let index = this.state.Frameworks.indexOf(e.target.value, 0);
                    if (index > -1) {
                        newArray.splice(index, 1);
                    }
                    this.setState({ Frameworks: newArray });
                }
            }
            console.log(this.state.Frameworks)
        }
    }

    public render() {
        return <div className="container">
            <h2 className="text-center">Take a Survey</h2>
            <form onSubmit={this.handleSubmit}>
                <div className="panel panel-default">
                    <div className="panel-heading">Personal info</div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <label>First Name</label>
                                <input className="form-control"
                                    onBlur={e => this.handleInputChange(e)}
                                    datatype="general-info-text"
                                    data-min-length="2"
                                    data-max-length="100"
                                    data-regex="[a-z ,.'-]{2,100}"
                                    type="text"
                                    value="Ivan"
                                    id="FirstName" />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>Last Name</label>
                                <input className="form-control"
                                    onBlur={e => this.handleInputChange(e)}
                                    datatype="general-info-text"
                                    data-min-length="2"
                                    data-max-length="100"
                                    data-regex="[a-z ,.'-]{2,100}"
                                    type="text"
                                    value="Sukhetskyi"
                                    id="LastName" />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>Age</label>
                                <input className="form-control"
                                    onBlur={e => this.handleInputChange(e)}
                                    datatype="general-info-number"
                                    data-min-value="18"
                                    data-max-value="90"
                                    data-regex="\\d{2}"
                                    type="number"
                                    value="33"
                                    id="Age" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 form-group">
                                <label>Address</label>
                                <input className="form-control"
                                    onBlur={e => this.handleInputChange(e)}
                                    datatype="general-info-text"
                                    data-min-length="2"
                                    data-max-length="100"
                                    data-regex="(\\w[a-zA-Z- ,.0-9]{1,})"
                                    type="text"
                                    value="Ivano-Frankivsk"
                                    id="Address" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <label>Are you currently employed?</label>
                                <div className="row">
                                    <div className="col-md-6 form-check form-check-inline">
                                        <label className="form-check-label">
                                            <input className="radio-inline"
                                                type="radio"
                                                name="inlineRadioOptions"
                                                id="isEmployedYes"
                                                value="on"
                                                onClick={e => this.handleRadioButtonChange(e)}
                                            /> Yes
                                </label>
                                    </div>
                                    <div className="com-md-6 form-check form-check-inline no-answer-radio-btn">
                                        <label className="form-check-label">
                                            <input className="radio-inline"
                                                type="radio"
                                                name="inlineRadioOptions"
                                                id="isEmployedNo"
                                                onClick={e => this.handleRadioButtonChange(e)}
                                            /> No
                                </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 form-group">
                                <label>Current position</label>
                                <input className="form-control"
                                    onBlur={e => this.handleInputChange(e)}
                                    datatype="general-info-text"
                                    disabled={!this.state.IsEmployed}

                                    data-min-length="2"
                                    data-max-length="100"
                                    data-regex="[a-zA-Z][a-zA-Z0-9\\.,\\-_]{5,31}"
                                    type="text"
                                    value="Developer"
                                    id="CurrentPosition" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <label>Skype</label>
                                <input className="form-control"
                                    onBlur={e => this.handleInputChange(e)}
                                    datatype="general-info-text"
                                    data-min-length="6"
                                    data-max-length="100"
                                    data-regex="[a-zA-Z][a-zA-Z0-9\\.,\\-_]{5,31}"
                                    type="text"
                                    value="syhestkiy"
                                    id="Skype" />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>Phone</label>
                                <input className="form-control"
                                    onBlur={e => this.handleInputChange(e)}
                                    datatype="general-info-text"
                                    data-regex="\\d{10,12}"
                                    type="number"
                                    value="0593456862"
                                    id="Phone" />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>Email</label>
                                <input className="form-control"
                                    onBlur={e => this.handleInputChange(e)}
                                    datatype="general-info-text"
                                    data-regex="\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w{2,5}"
                                    type="text"
                                    value="ivan.sukhetskyi@gmail.com"
                                    id="Email" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">Education</div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label>Place of studying</label>
                                <input className="form-control"
                                    onBlur={e => this.handleInputChange(e)}
                                    datatype="general-info-text"
                                    data-regex="[a-zA-Z ,.'-]{2,100}"
                                    type="text"
                                    value="IFNTUOG"
                                    id="PlaceOfStudying" />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Speciality</label>
                                <input className="form-control"
                                    onBlur={e => this.handleInputChange(e)}
                                    datatype="general-info-text"
                                    data-regex="[a-z ,.'-]{2,100}"
                                    type="text"
                                    value="Computer Systems and Networks"
                                    id="Speciality" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">Work experiance</div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-4">
                                <h4>
                                    Programming languages
                                </h4>
                                {this.renderCheckboxes.call(this, "ProgrammingLanguagesCheckboxes")}
                            </div>
                            <div className="col-md-4">
                                <h4>
                                    Databases
                                </h4>
                                {this.renderCheckboxes.call(this, "DatabasesCheckboxes")}
                            </div>
                            <div className="col-md-4">
                                <h4>
                                    Frameworks
                                </h4>
                                {this.renderCheckboxes.call(this, "FrameworksCheckboxes")}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">Other</div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-md-12 form-group">
                                <label>Tell me more :)</label>
                                <textarea className="form-control"
                                    onBlur={e => this.handleInputChange(e)}
                                    datatype="general-info-text"
                                    data-regex="[a-z0-9 ,.'-]{2,1000}"
                                    type="text"
                                    value="Somethisng reaally important"
                                    id="OtherInfo" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="btn-wrapper">
                    <button type="submit" className="btn btn-primary btn-custom">Submit</button>
                </div>
            </form>
        </div>;
    }
}
