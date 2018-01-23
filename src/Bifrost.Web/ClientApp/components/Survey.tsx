import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as axios from "axios";
import { KeyboardEvent } from 'react';

interface SurveyProps {

}

interface SurveyState {
    // general info
    FirstName?: string;
    FirstNameError?: boolean;
    LastName?: string;
    LastNameError?: boolean;
    Age?: number;
    AgeError?: boolean;
    Address?: string;
    AddressError?: boolean;
    IsEmployed?: boolean;
    CurrentPosition?: string;
    CurrentPositionError?: boolean;
    Phone?: string;
    PhoneError?: boolean;
    Skype?: string;
    SkypeError?: boolean;
    Email?: string;
    EmailError?: boolean;

    //education
    PlaceOfStudying?: string;
    PlaceOfStudyingError?: boolean;
    Speciality?: string;
    SpecialityError?: boolean;

    //work experience
    ProgrammingLanguagesCheckboxes?: Array<object>;
    FrameworksCheckboxes?: Array<object>;
    DatabasesCheckboxes?: Array<object>;

    ProgrammingLanguages?: Array<number>;
    Databases?: Array<number>;
    Frameworks?: Array<number>;

    //other info
    OtherInfo?: string;
    OtherInfoError?: boolean;

    selectedOption?: string;

    FormError?: boolean;
    isDone?: boolean;
}



export class Survey extends React.Component<RouteComponentProps<SurveyProps>, SurveyState> {
    constructor(props: any) {
        super(props);

        this.state = {
            FirstName: "",
            FirstNameError: false,
            LastName: "",
            LastNameError: false,
            Age: 0,
            AgeError: false,
            Address: "",
            AddressError: false,
            IsEmployed: false,
            CurrentPosition: "",
            CurrentPositionError: false,
            Phone: "",
            PhoneError: false,
            Email: "",
            EmailError: false,
            Skype: "",
            SkypeError: false,
            PlaceOfStudying: "",
            PlaceOfStudyingError: false,
            Speciality: "",
            SpecialityError: false,
            ProgrammingLanguagesCheckboxes: [],
            FrameworksCheckboxes: [],
            DatabasesCheckboxes: [],
            ProgrammingLanguages: [],
            Databases: [],
            Frameworks: [],

            OtherInfo: "",
            OtherInfoError: false,

            selectedOption: "no",

            FormError: false,
            isDone: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleRadioButtonChange = this.handleRadioButtonChange.bind(this);
        this.renderCheckboxes = this.renderCheckboxes.bind(this);
        this.componentWillMount = this.componentDidMount.bind(this);
        this.isFormValid = this.isFormValid.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        let thisContext = this;

        axios.default.get("/survey/gettechnologies")
        .then(function(response){
                thisContext.setState({ ProgrammingLanguagesCheckboxes: response.data.technologies.languages })
                thisContext.setState({ FrameworksCheckboxes: response.data.technologies.frameworks })
                thisContext.setState({ DatabasesCheckboxes: response.data.technologies.databases })
        })
        .catch(function(error){
            console.log(error);
            alert(error);
        })
    }

    renderCheckboxes(collectionName: string) {
        let elements: any;
        let collection: Array<object> | undefined;
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

        if (!collection) {
            collection = new Array<[number, string]>();
        }
        elements = collection.map((checkbox: any, index: number) =>
            <div key={index} className="custom-control checkbox">
                <label htmlFor={checkbox.id}>
                    <input type="checkbox"
                        className="custom-control-input"
                        id={checkbox.id}
                        value={checkbox.technologyName}
                        datatype={datatype}
                        onChange={e => this.handleCheckboxChange(e)}
                    />
                    {checkbox.technologyName}
                </label>
                {/* <label className="custom-control-label" htmlFor={checkbox.id}>{checkbox.technologyName}</label> */}
            </div>);

        return elements;
    }

    handleSubmit(event: any) {
        event.preventDefault();

        if(this.isFormValid())
        {
            this.setState({FormError: false});
            let thisContext = this;

            axios.default.post("/survey",
            this.state,
            {
                headers: {"Content-Type": "application/json"}
            })
            .then(function(response){
                console.log(response);
                thisContext.setState({isDone: true});
            })
            .catch(function(error){
                console.error(error);
                alert(error);
            })

        }else{
            this.setState({FormError: true});
        }
    }

    isFormValid(){
        return (!this.state.AddressError
            && !this.state.AgeError
            && !this.state.CurrentPositionError
            && !this.state.EmailError
            && !this.state.FirstNameError
            && !this.state.LastNameError
            && !this.state.OtherInfoError
            && !this.state.PhoneError
            && !this.state.PlaceOfStudyingError
            && !this.state.SkypeError
            && !this.state.SpecialityError)
    }

    validate(e: any): string {
        e.preventDefault();
        let result = "";
        let inputType = e.target.attributes.getNamedItem('datatype').value;
        if (inputType as string === "general-info-text") {
            result = (e.target.value as string).trim();
        }
        else if (inputType as string === "general-info-number") {
            let pattern = e.target.attributes.getNamedItem("pattern").value;
            let regex = new RegExp(pattern);
            //return regex.test(e.target.value as string);
            result = e.target.value as string;
        }

        return result;
    }

    handleInputChange(e: any) {
        e.preventDefault();
        var value = this.validate(e)
        if (value.length > 0) {
            this.setState({ [(e.target.attributes.id.value as string)]: e.target.value as string })
            this.setState({[(e.target.attributes.id.value as string) + "Error"]: false})
            this.setState({FormError: false})
        }else{
            this.setState({[(e.target.attributes.id.value as string) + "Error"]: true})
        }
    }

    handleRadioButtonChange(e: any) {
        console.log(e.target.value)
        if (e.target.id === "isEmployedYes") {
            this.setState({ IsEmployed: true });
            this.setState({ selectedOption: e.target.value })
        } else {
            this.setState({ IsEmployed: false });
            this.setState({ selectedOption: e.target.value })
        }
    }

    handleCheckboxChange(e: any) {
        let inputType = e.target.attributes.getNamedItem('datatype').value;
        if (inputType as string === "checkbox-programminglanguage") {
            if (e.target.checked) {
                let newArray = this.state.ProgrammingLanguages;
                if (!newArray) {
                    newArray = new Array();
                }

                newArray.push(e.target.id);
                this.setState({ ProgrammingLanguages: newArray });
            } else {

                if (!!this.state.ProgrammingLanguages) {
                    let newArray = this.state.ProgrammingLanguages;
                    let index = this.state.ProgrammingLanguages.indexOf(e.target.id, 0);
                    if (index > -1) {
                        newArray.splice(index, 1);
                    }
                    this.setState({ ProgrammingLanguages: newArray });
                }
            }
        }
        if (inputType as string === "checkbox-database") {
            if (e.target.checked) {
                let newArray = this.state.Databases;
                if (!newArray) {
                    newArray = new Array();
                }

                newArray.push(e.target.id);
                this.setState({ Databases: newArray });
            } else {

                if (!!this.state.Databases) {
                    let newArray = this.state.Databases;
                    let index = this.state.Databases.indexOf(e.target.id, 0);
                    if (index > -1) {
                        newArray.splice(index, 1);
                    }
                    this.setState({ Databases: newArray });
                }
            }
        }
        if (inputType as string === "checkbox-framework") {
            if (e.target.checked) {
                let newArray = this.state.Frameworks;
                if (!newArray) {
                    newArray = new Array<number>();
                }

                newArray.push(e.target.id);
                this.setState({ Frameworks: newArray });
            } else {

                if (!!this.state.Frameworks) {
                    let newArray = this.state.Frameworks;
                    let index = this.state.Frameworks.indexOf(e.target.id, 0);
                    if (index > -1) {
                        newArray.splice(index, 1);
                    }
                    this.setState({ Frameworks: newArray });
                }
            }
        }
    }

    handleKeyPress(e: KeyboardEvent<any>){
        if(e.key === "Enter"){
            e.preventDefault();
        }
    }

    public render() {
        if(!this.state.isDone)
        {
            return <div style={{width:"100%"}}>
                <h2 className="text-center">Take a Survey</h2>
                <form onSubmit={this.handleSubmit} onKeyPress={this.handleKeyPress}>
                    <div className="panel panel-default">
                        <div className="panel-heading"><h3>Personal info</h3></div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-4 form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>First Name</label>
                                            <input className="form-control"
                                                onChange={e => this.handleInputChange(e)}
                                                onBlur={e => this.handleInputChange(e)}
                                                datatype="general-info-text"
                                                minLength={2}
                                                maxLength={100}
                                                required
                                                pattern="^[a-zA-Z ]+$"
                                                type="text"
                                                id="FirstName" />
                                        </div>
                                    </div>
                                    <div className="row" id="FirstNameError" style={{ display: this.state.FirstNameError ? "block": "none"}}>
                                        <div className="col-md-12">
                                            <label className="text-danger">First name can contain only letters and be 2-100 chars long</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4 form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Last Name</label>
                                            <input className="form-control"
                                                onChange={e => this.handleInputChange(e)}
                                                onBlur={e => this.handleInputChange(e)}
                                                datatype="general-info-text"
                                                minLength={2}
                                                maxLength={100}
                                                required
                                                pattern="^[a-zA-Z ]+$"
                                                title="Can contain only letters dots, dashes, comas, and be from 2 to 100 characters"
                                                type="text"
                                                id="LastName" />
                                        </div>
                                        <div className="row" id="LastNameError" style={{ display: this.state.LastNameError ? "block" : "none" }}>
                                            <div className="col-md-12">
                                                <label className="text-danger">First name can contain only letters and be 2-100 chars long</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Age</label>
                                            <input className="form-control"
                                                onChange={e => this.handleInputChange(e)}
                                                onBlur={e => this.handleInputChange(e)}
                                                datatype="general-info-number"
                                                min={18}
                                                max={99}
                                                required
                                                type="number"
                                                id="Age" />
                                        </div>
                                    </div>
                                    <div className="row" id="AgeError" style={{ display: this.state.AgeError ? "block" : "none" }}>
                                        <div className="col-md-12">
                                            <label className="text-danger">Ivanlid age value, valid age is from 18 to 90</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12 form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Address</label>
                                            <input className="form-control"
                                                onChange={e => this.handleInputChange(e)}
                                                onBlur={e => this.handleInputChange(e)}
                                                datatype="general-info-text"
                                                required
                                                minLength={2}
                                                maxLength={200}
                                                pattern="^(\\w[a-zA-Z- ,.0-9]{2,})$"
                                                type="text"
                                                id="Address" />
                                        </div>
                                    </div>
                                    <div className="row" id="AddressError" style={{ display: this.state.AddressError ? "block" : "none" }}>
                                        <div className="col-md-12">
                                            <label className="text-danger">Invalid address</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 form-group">
                                    <label>Are you currently employed?</label>
                                    <div className="row">
                                        <div className="col-md-6 form-check form-check-inline">
                                            <label className="form-check-label" htmlFor="isEmployedYes">
                                                <input className="radio-inline"
                                                    type="radio"
                                                    name="inlineRadioOptions"
                                                    id="isEmployedYes"
                                                    value="yes"
                                                    checked={this.state.selectedOption === "yes"}
                                                    onClick={e => this.handleRadioButtonChange(e)}
                                                /> Yes
                                            </label>
                                        </div>
                                        <div className="com-md-6 form-check form-check-inline no-answer-radio-btn">
                                            <label className="form-check-label" htmlFor="isEmployedNo">
                                                <input className="radio-inline"
                                                    type="radio"
                                                    name="inlineRadioOptions"
                                                    id="isEmployedNo"
                                                    checked={this.state.selectedOption === "no"}
                                                    value="no"
                                                    onClick={e => this.handleRadioButtonChange(e)}
                                                /> No
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-8 form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Current position</label>
                                            <input className="form-control"
                                                onChange={e => this.handleInputChange(e)}
                                                onBlur={e => this.handleInputChange(e)}
                                                datatype="general-info-text"
                                                disabled={!this.state.IsEmployed}
                                                minLength={5}
                                                maxLength={100}
                                                pattern="^([a-zA-Z0-9\\.,\\-_ ]){2,}$"
                                                type="text"
                                                id="CurrentPosition" />
                                        </div>
                                    </div>
                                    <div className="row" id="CurrentPositionError" style={{ display: this.state.CurrentPositionError ? "block" : "none" }}>
                                        <div className="col-md-12">
                                            <label className="text-danger">Ivanlid value of position, it either to short or to long, or contains forbidden chars</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-4 form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Skype</label>
                                            <input className="form-control"
                                                onChange={e => this.handleInputChange(e)}
                                                onBlur={e => this.handleInputChange(e)}
                                                datatype="general-info-text"
                                                minLength={6}
                                                maxLength={100}
                                                pattern="[a-zA-Z][a-zA-Z0-9\\.,\\-_]{5,31}"
                                                type="text"
                                                id="Skype" />
                                        </div>
                                    </div>
                                    <div className="row" id="SkypeError" style={{ display: this.state.SkypeError ? "block" : "none" }}>
                                        <div className="col-md-12">
                                            <label className="text-danger">Ivanlid skype name</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Phone</label>
                                            <input className="form-control"
                                                onChange={e => this.handleInputChange(e)}
                                                onBlur={e => this.handleInputChange(e)}
                                                datatype="general-info-text"
                                                minLength={10}
                                                maxLength={12}
                                                pattern="^[0-9]{10,12}$"
                                                type="text"
                                                id="Phone" />
                                        </div>
                                    </div>
                                    <div className="row" id="PhoneError" style={{ display: this.state.PhoneError ? "block" : "none" }}>
                                        <div className="col-md-12">
                                            <label className="text-danger">Invalid phone value(Example: "0961234567")</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Email</label>
                                            <input className="form-control"
                                                onChange={e => this.handleInputChange(e)}
                                                onBlur={e => this.handleInputChange(e)}
                                                datatype="general-info-text"
                                                required
                                                pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                                                type="email"
                                                id="Email" />
                                        </div>
                                    </div>
                                    <div className="row" id="EmailError" style={{ display: this.state.EmailError ? "block" : "none" }}>
                                        <div className="col-md-12">
                                            <label className="text-danger">Invalid email</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3>
                                Education
                        </h3>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-6 form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Place of studying</label>
                                            <input className="form-control"
                                                onChange={e => this.handleInputChange(e)}
                                                onBlur={e => this.handleInputChange(e)}
                                                datatype="general-info-text"
                                                minLength={2}
                                                maxLength={100}
                                                pattern="[a-zA-Z ,.'-]{2,100}"
                                                type="text"
                                                id="PlaceOfStudying" />
                                        </div>
                                    </div>
                                    <div className="row" id="PlaceOfStudyingError" style={{ display: this.state.PlaceOfStudyingError ? "block" : "none" }}>
                                        <div className="col-md-12">
                                            <label className="text-danger">Must be at least 2 chars long and less than 100, and contains only letters</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6 form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Speciality</label>
                                            <input className="form-control"
                                                onChange={e => this.handleInputChange(e)}
                                                onBlur={e => this.handleInputChange(e)}
                                                datatype="general-info-text"
                                                minLength={2}
                                                maxLength={100}
                                                pattern="[a-zA-Z ,.'-]{2,100}"
                                                type="text"
                                                id="Speciality" />
                                        </div>
                                    </div>
                                    <div className="row" id="SpecialityError" style={{ display: this.state.SpecialityError ? "block" : "none" }}>
                                        <div className="col-md-12">
                                            <label className="text-danger">Must be at least 2 chars long and less than 100, and contains only letters</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <h3>
                                Work experiance
                            </h3>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-4 content-center">
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
                        <div className="panel-heading">
                            <h3>
                                Other
                            </h3>
                        </div>
                        <div className="panel-body">
                            <div className="row">
                                <div className="col-md-12 form-group">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label>Tell me more :)</label>
                                            <textarea className="form-control"
                                                onChange={e => this.handleInputChange(e)}
                                                onBlur={e => {this.handleInputChange(e)}}
                                                datatype="general-info-text"
                                                minLength={2}
                                                maxLength={1000}
                                                type="text"
                                                id="OtherInfo" />
                                        </div>
                                    </div>
                                    <div className="row" id="OtherInfoError" style={{ display: this.state.OtherInfoError ? "block" : "none" }}>
                                        <div className="col-md-12">
                                            <label className="text-danger">Must be at least 2 chars long and less than 1000</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="btn-wrapper">
                                <button type="submit" disabled={this.state.FormError} className="btn btn-primary btn-custom">Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="row" id="FormError" style={{ display: this.state.FormError ? "block" : "none" }}>
                        <div className="col-md-12 btn-wrapper">
                            <label className="text-danger" style={{marginTop: "50px"}}>You can's submit form while it contains errors</label>
                        </div>
                    </div>
                </form>
            </div>;
        }else{
            return <div className="container content-center" style={{textAlign: "center"}}>
                <h1>Success!</h1>
            </div>;
        }
    }
}
