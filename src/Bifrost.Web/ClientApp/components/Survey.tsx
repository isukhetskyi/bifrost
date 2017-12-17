import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Survey extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return <div className="container">
        <h2 className="text-center">Take a Survey</h2>
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
                    <input className="form-control" type="text" id="address"/>
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
                                    value="yes"/> Yes
                            </label>
                        </div>
                        <div className="com-md-6 form-check form-check-inline">
                            <label className="form-check-label">
                                <input className="radio-inline"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id="inlineRadio2"
                                    value="no"/> No
                            </label>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 form-group">
                    <label>Current position</label>
                    <input className="form-control" type="text" id="currentPosition"/>
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
            //TODO
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
      </div>;
    }
}
