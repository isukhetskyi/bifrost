import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as axios from "axios";
import { CustomFormInput } from "./shared/CustomFormInput";
import { CustomForm } from "./shared/CustomForm";
import { CustomSelect } from "./shared/CustomSelect";

interface RegisterState {
    Email?: string;
    EmailError?: boolean;
    Password?: string;
    PasswordError?: boolean;
    ConfirmPassword?: string;
    ConfirmPasswordError?: boolean;
    Role?: number;
    FormError?: boolean;
    isDone?: boolean;
}

export class Register extends React.Component<RouteComponentProps<{}>, RegisterState> {
    constructor(props: any) {
        super(props);

        this.state = {
            Email: "",
            EmailError: false,
            Password: "",
            PasswordError: false,
            ConfirmPassword: "",
            ConfirmPasswordError: false,
            Role: -1,
            FormError: false,
            isDone: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDropdownChange = this.handleDropdownChange.bind(this);
    }

    handleSubmit(e: any) {
        e.preventDefault();

        if (this.isFormValid()) {
            this.setState({ FormError: false });
            let thisContext = this;
            axios.default.post(
                "/adminarea/CreateUserAsync",
                this.state,
                {
                    headers: {"Content-Type": "application/json"}
                }).then(function(response){
                    console.log(response);
                    thisContext.setState({ isDone: true })
                }).catch(function(error){
                    console.error(error);
                    alert(error);
                })

        } else {
            this.setState({ FormError: true });
        }
    }

    isFormValid() {
        return (!this.state.EmailError
            && !this.state.PasswordError
            && !this.state.ConfirmPasswordError)
    }

    validate(e: any) {
        // e.preventDefault();

        // let result = false;
        // let inputType = e.target.attributes.getNamedItem('datatype').value;
        // if (inputType as string === "general-info-text") {
        //     let pattern = e.target.attributes.getNamedItem("data-regex").value;
        //     let regex = new RegExp(pattern);

        //     return regex.test((e.target.value as string).trim());
        // }
        // return result;
        return true;
    }

    handleInputChange(e: any) {
        e.preventDefault();

        if (this.validate(e)) {
            this.setState({ [(e.target.attributes.id.value as string)]: e.target.value as string })
            this.setState({ [(e.target.attributes.id.value as string) + "Error"]: false })
            this.setState({ FormError: false })
        } else {
            this.setState({ [(e.target.attributes.id.value as string) + "Error"]: true })
        }
    }

    handleDropdownChange(e: any){
        if(e.target.value as number >= 0){
            this.setState({Role: (e.target.value as number)});
        }
    }

    public render() {
        if (!this.state.isDone) {
            return <div style={{ width: "100%" }}>
                <h2 className="text-center">Register</h2>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <CustomForm classes=""
                            id="RegistrationForm"
                            submitButtonText="Sign Up"
                            submitButtonStyle="btn-default"
                            errorMessage="You can't submit form which contains errors"
                            onSubmit={this.handleSubmit}
                        >
                            <CustomFormInput
                                classes="form-group"
                                id="Email"
                                title="Email"
                                type="text"
                                regex="\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w{2,5}"
                                errorMessage="Invalid email address"
                                required={true}
                                onChange={this.handleInputChange}
                            />
                            <CustomFormInput
                                classes="form-group"
                                id="Password"
                                title="Password"
                                type="text"
                                regex="(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,100}"
                                errorMessage="Password must be at least 8 and at max 100"
                                required={true}
                                onChange={this.handleInputChange}
                            />
                            <CustomFormInput
                                classes="form-group"
                                id="ConfirmPassword"
                                title="Confirm Password"
                                type="text"
                                regex="(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,100}"
                                errorMessage="Password must be at least 8 and at max 100"
                                required={true}
                                onChange={this.handleInputChange}
                            />
                            <CustomSelect
                                classes="form-group"
                                id="RoleSelectControl"
                                selectId="RoleSelect"
                                handleDropdownChange={this.handleDropdownChange}
                                selectTitle="Roles select"
                                options={[["0", "Admin"]
                                          ,["1", "Developer"]
                                          ,["2", "HR Manager"]
                                          ,["3", "Project Manager"]
                                          ,["4", "Sales Manager"]]}
                            />
                        </CustomForm>
                        {/* <form onSubmit={this.handleSubmit}>

                            <div className="form-group">
                                <label htmlFor="roleselect">Select list:</label>
                                <select className="form-control"
                                onChange={e => {this.handleDropdownChange(e)}}
                                id="roleselect">
                                    <option value={0}>Admin</option>
                                    <option value={1}>Developer</option>
                                    <option value={2}>HR Manager</option>
                                    <option value={3}>Project Manager</option>
                                    <option value={4}>Sales Manager</option>
                                </select>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <button type="submit" disabled={this.state.FormError} className="btn btn-primary">Register</button>
                                </div>
                            </div>
                            <div className="row" id="FormError" style={{ display: this.state.FormError ? "block" : "none" }}>
                                <div className="col-md-12 btn-wrapper">
                                    <label className="text-danger" style={{ marginTop: "50px" }}>You can's submit form while it contains errors</label>
                                </div>
                            </div>
                        </form> */}
                    </div>
                    <div className="col-md-4"></div>

                </div>
            </div>;
        } else {
            return <div className="container content-center" style={{textAlign: "center"}}>
                <h1>Success!</h1>
            </div>;
        }
    }
}
