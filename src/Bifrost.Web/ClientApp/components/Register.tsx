import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as fetch from 'node-fetch';

interface RegisterState {
    Email?: string;
    EmailError?: boolean;
    Password?: string;
    PasswordError?: boolean;
    ConfirmPassword?: string;
    ConfirmPasswordError?: boolean;
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
            FormError: false,
            isDone: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleSubmit(e: any) {
        if (this.isFormValid()) {
            this.setState({ FormError: false });
            let body = JSON.stringify(this.state);
            console.log(body)

            const request = fetch.default("http://localhost:5000/account/register",
                {
                    method: "POST", body: JSON.stringify(this.state),
                    headers: { "Content-Type": "application/json" }
                })
                .then(res => console.log(res.body));
            this.setState({ isDone: true })
        } else {
            this.setState({ FormError: true });
        }

        e.preventDefault();
    }

    isFormValid() {
        return (!this.state.EmailError
            && !this.state.PasswordError
            && !this.state.ConfirmPasswordError)
    }

    validate(e: any) {
        let result = false;
        let inputType = e.target.attributes.getNamedItem('datatype').value;
        if (inputType as string === "general-info-text") {
            let pattern = e.target.attributes.getNamedItem("data-regex").value;
            let regex = new RegExp(pattern);

            return regex.test((e.target.value as string).trim());
        }

        e.preventDefault();
        return result;
    }

    handleInputChange(e: any) {
        if (this.validate(e)) {
            this.setState({ [(e.target.attributes.id.value as string)]: e.target.value as string })
            this.setState({ [(e.target.attributes.id.value as string) + "Error"]: false })
            this.setState({ FormError: false })
        } else {
            this.setState({ [(e.target.attributes.id.value as string) + "Error"]: true })
        }

        e.preventDefault();
    }

    public render() {
        if (!this.state.isDone) {
            return <div className="container" style={{ width: "100%" }}>
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
                                            type="password"
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
                                            type="password"
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