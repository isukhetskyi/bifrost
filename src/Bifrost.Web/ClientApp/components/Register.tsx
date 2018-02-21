import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as axios from "axios";

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
        e.preventDefault();

        let result = false;
        let inputType = e.target.attributes.getNamedItem('datatype').value;
        if (inputType as string === "general-info-text") {
            let pattern = e.target.attributes.getNamedItem("data-regex").value;
            let regex = new RegExp(pattern);

            return regex.test((e.target.value as string).trim());
        }
        return result;
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
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="email">Email</label>
                                        <input id="Email"
                                            className="form-control"
                                            onChange={e => this.handleInputChange(e)}
                                            onBlur={e => this.handleInputChange(e)}
                                            datatype="general-info-text"
                                            data-regex="\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w{2,5}"
                                        />
                                    </div>
                                </div>
                                <div className="row" id="EmailError" style={{ display: this.state.EmailError ? "block" : "none" }}>
                                    <div className="col-md-12">
                                        <label className="text-danger">Invalid Email</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="Password">Password</label>
                                        <input id="Password"
                                            className="form-control"
                                            onChange={e => this.handleInputChange(e)}
                                            onBlur={e => this.handleInputChange(e)}
                                            type="text"
                                            datatype="general-info-text"
                                            data-regex="(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,100}"
                                        />
                                    </div>
                                </div>
                                <div className="row" id="PasswordError" style={{ display: this.state.PasswordError ? "block" : "none" }}>
                                    <div className="col-md-12">
                                        <label className="text-danger">Password must be at least 8 and at max 100 characters long and must
                            contain upper and lower case letters, numbers and special characters</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="ConfirmPassword">Confirm Password</label>
                                        <input id="ConfirmPassword"
                                            className="form-control"
                                            onChange={e => this.handleInputChange(e)}
                                            onBlur={e => this.handleInputChange(e)}
                                            type="text"
                                            datatype="general-info-text"
                                            data-regex="(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,100}"
                                        />
                                    </div>
                                </div>
                                <div className="row" id="ConfirmPasswordError" style={{ display: this.state.ConfirmPasswordError ? "block" : "none" }}>
                                    <div className="col-md-12">
                                        <label className="text-danger">
                                            Password must be at least 8 and at max 100 characters long and must
                                    contain upper and lower case letters, numbers and special characters
                                    and match with password
                            </label>
                                    </div>
                                </div>
                            </div>
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
                        </form>
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
