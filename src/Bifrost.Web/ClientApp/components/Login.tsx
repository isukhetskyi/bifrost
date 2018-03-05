import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as axios from "axios";
import { CustomFormInput } from "./shared/CustomFormInput";
import { CustomForm } from "./shared/CustomForm";

interface LoginState {
    Email?: string;
    EmailError?: boolean;
    Password?: string;
    PasswordError?: boolean;
    FormError?: boolean;
    RememberMe?: boolean;
    isDone?: boolean;
}

export class Login extends React.Component<RouteComponentProps<{}>, LoginState> {
    constructor(props: any) {
        super(props);

        this.state = {
            Email: "",
            EmailError: false,
            Password: "",
            PasswordError: false,
            FormError: false,
            RememberMe: false,
            isDone: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validate = this.validate.bind(this);
    }

    handleSubmit(e: any) {
        e.preventDefault();

        if (this.isFormValid()) {
            this.setState({ FormError: false });
            let thisContext = this;
            axios.default.post("/account/login",
                this.state,
                { headers: { "Content-Type": "application/json" } })
                .then(function (response) {
                    thisContext.setState({ isDone: true })
                }).catch(function (error) {
                    console.error(error);
                    alert(error);
                })
        } else {
            this.setState({ FormError: true });
        }
    }

    isFormValid() {
        return (!this.state.EmailError
            && !this.state.PasswordError)
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

        return true;
    }

    handleInputChange(e: any) {
        //e.preventDefault();

        if (this.validate(e)) {
            this.setState({ [(e.target.attributes.id.value as string)]: e.target.value as string })
            this.setState({ [(e.target.attributes.id.value as string) + "Error"]: false })
            this.setState({ FormError: false })
        } else {
            this.setState({ [(e.target.attributes.id.value as string) + "Error"]: true })
        }
    }

    public render() {
        if (!this.state.isDone) {
            return <div style={{ width: "100%" }}>
                <h2 className="text-center">Login</h2>
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <CustomForm
                            classes=""
                            id="LoginForm"
                            onSubmit={this.handleSubmit}
                            errorMessage="You can't submit form if it contains errors"
                            submitButtonStyle="btn-default"
                            submitButtonText="Login"
                        >
                            <CustomFormInput
                                id="Email"
                                classes="form-group"
                                title="Email"
                                type="text"
                                regex="\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w{2,5}"
                                errorMessage="Incorrect email"
                                onChange={this.handleInputChange}
                            />
                            <CustomFormInput
                                id="Password"
                                classes="form-group"
                                title="Password"
                                type="password"
                                regex="(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^\\da-zA-Z]).{8,100}"
                                errorMessage="Password is incorrect"
                                onChange={this.handleInputChange}
                            />
                        </CustomForm>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        } else {
            return <div className="container content-center" style={{ textAlign: "center" }}>
                <h1>Success!</h1>
            </div>;
        }
    }
}
