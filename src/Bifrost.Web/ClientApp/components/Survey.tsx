import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import * as fetch from 'node-fetch';



export class Survey extends React.Component<RouteComponentProps<{}>, {}> {
    constructor(props: any) {
        super(props);

        this.state = { value: '' }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event: any) {
        const request = fetch.default("http://localhost:5000/api/Survey/Survey")
                        .then(res => console.log(res.body));
        event.preventDefault();
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
                                <input className="form-control" type="text" id="firstName" />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>Last Name</label>
                                <input className="form-control" type="text" id="lastName" />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>Age</label>
                                <input className="form-control" type="text" id="age" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 form-group">
                                <label>Address</label>
                                <input className="form-control" type="text" id="address" />
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
                                                id="inlineRadio1"
                                                value="yes" /> Yes
                                </label>
                                    </div>
                                    <div className="com-md-6 form-check form-check-inline no-answer-radio-btn">
                                        <label className="form-check-label">
                                            <input className="radio-inline"
                                                type="radio"
                                                name="inlineRadioOptions"
                                                id="inlineRadio2"
                                                value="no" /> No
                                </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8 form-group">
                                <label>Current position</label>
                                <input className="form-control" type="text" id="currentPosition" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <label>Skype</label>
                                <input className="form-control" type="text" id="skype" />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>Phone</label>
                                <input className="form-control" type="text" id="phone" />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>Email</label>
                                <input className="form-control" type="text" id="emailAddress" />
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
                                <input className="form-control" type="text" id="placeOfStudying" />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Speciality</label>
                                <input className="form-control" type="text" id="speciality" />
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
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                    <label className="custom-control-label" htmlFor="customCheck1">Check this custom checkbox</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck2" />
                                    <label className="custom-control-label" htmlFor="customCheck2">Check this custom checkbox</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck3" />
                                    <label className="custom-control-label" htmlFor="customCheck3">Check this custom checkbox</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck4" />
                                    <label className="custom-control-label" htmlFor="customCheck4">Check this custom checkbox</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck5" />
                                    <label className="custom-control-label" htmlFor="customCheck5">Check this custom checkbox</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h4>
                                    Databases
                        </h4>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck11" />
                                    <label className="custom-control-label" htmlFor="customCheck11">Check this custom checkbox</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck21" />
                                    <label className="custom-control-label" htmlFor="customCheck21">Check this custom checkbox</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck31" />
                                    <label className="custom-control-label" htmlFor="customCheck31">Check this custom checkbox</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck41" />
                                    <label className="custom-control-label" htmlFor="customCheck41">Check this custom checkbox</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck51" />
                                    <label className="custom-control-label" htmlFor="customCheck51">Check this custom checkbox</label>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <h4>
                                    Programming languages
                        </h4>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck12" />
                                    <label className="custom-control-label" htmlFor="customCheck12">Check this custom checkbox</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck22" />
                                    <label className="custom-control-label" htmlFor="customCheck22">Check this custom checkbox</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck32" />
                                    <label className="custom-control-label" htmlFor="customCheck32">Check this custom checkbox</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck42" />
                                    <label className="custom-control-label" htmlFor="customCheck42">Check this custom checkbox</label>
                                </div>
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck52" />
                                    <label className="custom-control-label" htmlFor="customCheck52">Check this custom checkbox</label>
                                </div>
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
                                <textarea className="form-control" id="placeOfStudying" />
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
