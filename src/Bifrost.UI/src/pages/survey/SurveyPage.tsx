import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import {
    withStyles,
    WithStyles,
    StyleRulesCallback,
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails,
    FormControl,
    InputLabel,
    Input,
    FormHelperText,
    Select,
    Checkbox,
    FormGroup,
    FormControlLabel,
    FormLabel,
    Button,
    Grid
} from 'material-ui';
import { connect } from 'react-redux';
import { RootState } from '../../reducers';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import * as axios from 'axios';
import { AppConfigration } from '../../config/config';
import { debounce } from 'lodash';

export namespace SurveyPage {
    export interface Props extends RouteComponentProps<void> {

    }

    export interface State {
        FirstName: string;
        FirstNameError: boolean;
        LastName: string;
        LastNameError: boolean;
        Age?: string;
        AgeError: boolean;
        Address: string;
        AddressError: boolean;
        IsEmployed: boolean;
        CurrentPosition: string;
        CurrentPositionError: boolean;
        Phone?: string;
        PhoneError: boolean;
        Email?: string;
        EmailError: boolean;
        Skype?: string;
        SkypeError: boolean;
        PlaceOfStudying?: string;
        PlaceOfStudyingError: boolean;
        Speciality?: string;
        SpecialityError: boolean;
        Other?: string;
        OtherError: boolean;
        // work experience
        ProgrammingLanguagesCheckboxes: Array<object>;
        FrameworksCheckboxes: Array<object>;
        DatabasesCheckboxes: Array<object>;
        Technologies?: Array<number>;
        isValid: boolean;
        isDone: boolean;
        isNotEmpty: boolean;
    }
}

class SurveyPage extends React.Component<WithStyles & SurveyPage.Props, SurveyPage.State> {

    cosntructor(props: WithStyles & SurveyPage.Props) {
        this.validate = debounce(this.validate, 500);
    }

    state = {
        FirstName: '',
        FirstNameError: false,
        LastName: '',
        LastNameError: false,
        Age: '-1',
        AgeError: false,
        Address: 'Ivano-Frankivsk',
        AddressError: false,
        IsEmployed: false,
        CurrentPosition: '',
        CurrentPositionError: false,
        Phone: '380',
        PhoneError: false,
        Email: '',
        EmailError: false,
        Skype: '',
        SkypeError: false,
        PlaceOfStudying: '',
        PlaceOfStudyingError: false,
        Speciality: '',
        SpecialityError: false,
        Other: '',
        OtherError: false,
        ProgrammingLanguagesCheckboxes: Array(),
        FrameworksCheckboxes: Array(),
        DatabasesCheckboxes: Array(),
        Technologies: new Array<number>(),
        isValid: false,
        isDone: false,
        isNotEmpty: false,
    };

    validation = {
        FirstName: '^[a-zA-ZA-Яа-яіЇїєЄь -]{2,100}$',
        LastName: '^[a-zA-ZA-Яа-яіЇїєЄь -]{2,100}$',
        Age: '^(?:\\b|-)([1-9]{1,2}[0]?|99)\\b$',
        Address: '^[a-zA-Z-A-Яа-яіЇїєЄь ,.0-9]{2,200}$',
        CurrentPosition: '^([a-zA-Z0-9-A-Яа-яіЇїєЄь \\.,\\-_ ]){2,100}$',
        Phone: '^\\+?[0-9]{10,12}$',
        Email: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$',
        Skype: '^[a-zA-Z0-9\\.,\\-_]{6,100}$',
        PlaceOfStudying: '^[a-zA-Z-A-Яа-яіЇїєЄь ,.\'-]{2,100}$',
        Speciality: '^[a-zA-Z-A-Яа-яіЇїєЄь ,.\'-]{2,100}$',
        Other: '^[\\S\\s+]{2,1000}$'
    };

    componentDidMount() {
        let thisContext = this;

        axios.default.get(AppConfigration.BASE_API_URL + '/api/survey/gettechnologies', {
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': AppConfigration.CORS,
            'Accept': 'text/html,application/xhtml+xml,application/xml,text/csv;q=0.9,image/webp,image/apng,*/*;q=0.8'
        }})
            .then(function (response: any) {
                thisContext.setState({ ProgrammingLanguagesCheckboxes: response.data.technologies.languages });
                thisContext.setState({ FrameworksCheckboxes: response.data.technologies.frameworks });
                thisContext.setState({ DatabasesCheckboxes: response.data.technologies.databases });
            })
            .catch(function (error: any) {
                console.log(error);
                alert(error);
            });
    }

    validate(event: any): boolean {
        this.checkIfNotEmpty();
        let regex = new RegExp(this.validation[event.target.id]);
        let value = event.target.value;
        if ( value.length === 0) {
            this.setState({ [(event.target.id + 'Error') as any]: false });
            return true;
        }

        if (regex.test(value)) {
            if (event.target.id === 'Age' && ((event.target.value as number) < 6 || (event.target.value as number) > 80)) {
                this.setState({ [(event.target.id + 'Error') as any]: true });
                return false;
            }

            this.setState({ [(event.target.id + 'Error') as any]: false });
            this.validateForm();
            return true;
        } else {
            this.setState({ [(event.target.id + 'Error') as any]: true });
            this.validateForm();
            return false;
        }
    }

    checkIfNotEmpty(): boolean {
        let result = false;
        
        result = this.state.FirstName.trim().length > 0
              && this.state.LastName.trim().length > 0
              && this.state.Address.trim().length > 0
              && this.state.Email.trim().length > 0 
              && (this.state.Phone.trim().length > 0
                  || this.state.Skype.trim().length > 0);
        if (this.state.IsEmployed) {            
            result = result && this.state.CurrentPosition.trim().length > 0;
        }

        this.setState({isNotEmpty: result});
        return result;
    }

    validateForm(): boolean {
        let isFormValid = (!this.state.AddressError
            && !this.state.AgeError
            && !this.state.CurrentPositionError
            && !this.state.EmailError
            && !this.state.FirstNameError
            && !this.state.LastNameError
            && !this.state.OtherError
            && !this.state.PhoneError
            && !this.state.PlaceOfStudyingError
            && !this.state.SkypeError
            && !this.state.SpecialityError);

        this.setState({ isValid: isFormValid });
        return isFormValid;
    }

    handleChange = (event: any) => {
        if (this.validate(event)) {
            this.setState({ [event.target.id]: event.target.value });
        }
    };

    handleChackboxChange(e: any) {
        if (e.target.checked) {
            let newArray = this.state.Technologies;
            if (!newArray) {
                newArray = new Array<number>();
            }

            newArray.push(e.target.value);
            this.setState({ Technologies: newArray });
        } else {
            if (!!this.state.Technologies) {
                let newArray = this.state.Technologies;
                let index = this.state.Technologies.indexOf(e.target.value, 0);
                if (index > -1) {
                    newArray.splice(index, 1);
                }
                this.setState({ Technologies: newArray });
            }
        }
    }

    renderCheckboxes(type: string) {
        let elements: any;

        let collection: any;
        let datatype = 'checkbox-';
        if (type === 'ProgrammingLanguagesCheckboxes') {
            collection = this.state.ProgrammingLanguagesCheckboxes;
            datatype += 'programminglanguage';
        }
        if (type === 'FrameworksCheckboxes') {
            collection = this.state.FrameworksCheckboxes;
            datatype += 'framework';
        }
        if (type === 'DatabasesCheckboxes') {
            collection = this.state.DatabasesCheckboxes;
            datatype += 'database';
        }

        if (!collection) {
            collection = {};
        }

        elements = collection.map((item: any, index: number) => {
            // tslint:disable-next-line:jsx-wrap-multiline
            return <FormControlLabel
                key={index}
                control={
                    <Checkbox
                        value={item.id.toString()}
                        datatype={datatype}
                        onChange={e => this.handleChackboxChange(e)}
                    />
                }
                label={item.technologyName}
            />;
        });

        return elements;
    }

    handleSubmit() {
        let thisContext = this;
        if (this.checkIfNotEmpty()) {
        axios.default.post(AppConfigration.BASE_API_URL + '/api/survey/survey',
            this.state,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': AppConfigration.CORS,
                    'Accept': 'text/html,application/xhtml+xml,application/xml,text/csv;q=0.9,image/webp,image/apng,*/*;q=0.8'
                }
            })
            .then(function (response: any) {
                thisContext.setState({ isDone: true });
            })
            .catch(function (error: any) {
                // tslint:disable-next-line:no-console
                console.error(error);
            });
        }
    }

    handleKeyPress(e: any) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    }

    clearForm() {
        this.setState({
            FirstName: '',
            FirstNameError: false,
            LastName: '',
            LastNameError: false,
            Age: '-1',
            AgeError: false,
            Address: '',
            AddressError: false,
            IsEmployed: false,
            CurrentPosition: '',
            CurrentPositionError: false,
            Phone: '',
            PhoneError: false,
            Email: '',
            EmailError: false,
            Skype: '',
            SkypeError: false,
            PlaceOfStudying: '',
            PlaceOfStudyingError: false,
            Speciality: '',
            SpecialityError: false,
            Other: '',
            OtherError: false,
            Technologies: new Array<number>(),
            isValid: false,
            isDone: false,
            isNotEmpty: false});
    }

    render() {
        if (!this.state.isDone) {
            // tslint:disable-next-line:jsx-wrap-multiline
            return <Grid  container spacing={0}>
                <form className={this.props.classes.fullwidth} onSubmit={e => this.handleSubmit()} onKeyPress={e => this.handleKeyPress(e)}>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Personal Info (all fields with asterics <b>*</b> are required)</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                                <Grid container>
                                    <Grid item xs={12} md={4}>
                                        <FormControl
                                            fullWidth
                                            required
                                            className={this.props.classes.formControl}
                                            error={this.state.FirstNameError}
                                            aria-describedby="FirstName-error-text"
                                        >
                                            <InputLabel htmlFor="FirstName">First Name</InputLabel>
                                            <Input
                                                id="FirstName"
                                                datatype={'text'}
                                                onChange={e => this.handleChange(e)}
                                                onBlur={e => this.validate(e)}                                                
                                            />
                                            <FormHelperText
                                                id="FirstName-error-text"
                                                className={this.state.FirstNameError ? '' : this.props.classes.none}
                                            >
                                                Required! Only lower/uppser case letters with length between 2 and 100 characters
                                            </FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl
                                            fullWidth
                                            required
                                            className={this.props.classes.formControl}
                                            error={this.state.LastNameError}
                                            aria-describedby="LastName-error-text"
                                        >
                                            <InputLabel htmlFor="LastName">Last Name</InputLabel>
                                            <Input
                                                id="LastName"
                                                datatype={'text'}
                                                onChange={e => this.handleChange(e)}
                                                onBlur={e => this.validate(e)}
                                            />
                                            <FormHelperText
                                                id="LastName-error-text"
                                                className={this.state.LastNameError ? '' : this.props.classes.none}
                                            >
                                                Required! Only lower/uppser case letters with length between 2 and 100 characters
                                            </FormHelperText>
                                        </FormControl>
                                    </Grid >
                                    <Grid item xs={12} md={4}>
                                        <FormControl
                                            fullWidth
                                            className={this.props.classes.formControl}
                                            error={this.state.AgeError}
                                            aria-describedby="Age-error-text"
                                        >
                                            <InputLabel htmlFor="Age">Age</InputLabel>
                                            <Input
                                                id="Age"
                                                datatype={'number'}
                                                onChange={e => this.handleChange(e)}
                                                onBlur={e => this.validate(e)}
                                            />
                                            <FormHelperText
                                                id="Age-error-text"
                                                className={this.state.AgeError ? '' : this.props.classes.none}
                                            >
                                                Error! Must be number between 6 and 99
                                            </FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <FormControl
                                            fullWidth
                                            required
                                            className={this.props.classes.formControl}
                                            error={this.state.AddressError}
                                            aria-describedby="Address-error-text"
                                        >
                                            <InputLabel htmlFor="Address">Address</InputLabel>
                                            <Input
                                                id="Address"
                                                datatype={'text'}
                                                defaultValue={'Ivano-Frankivsk'}
                                                onChange={e => this.handleChange(e)}
                                                onBlur={e => this.validate(e)}
                                            />
                                            <FormHelperText
                                                id="Address-error-text"
                                                className={this.state.AddressError ? '' : this.props.classes.none}
                                            >
                                                Only lower/uppser case letters and punctuation signs with length between 2 and 200 characters
                                            </FormHelperText>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Typography>
                                            {'Are you currently employed?'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={2}>
                                        <FormControl fullWidth>
                                            <Select
                                                native={true}
                                                id={'IsEmployed'}
                                                className={this.props.classes.select}
                                                defaultValue={'No'}
                                                onChange={() => { this.setState({ IsEmployed: !this.state.IsEmployed }); }}
                                            >
                                                <option value={'Yes'}>Yes</option>
                                                <option value={'No'}>No</option>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={8} md={10}>
                                        <FormControl
                                            fullWidth
                                            required={this.state.IsEmployed}
                                            className={this.props.classes.formControl}
                                            error={this.state.CurrentPositionError}
                                            aria-describedby="CurrentPosition-error-text"
                                        >
                                            <InputLabel htmlFor="CurrentPosition">Current position</InputLabel>
                                            <Input
                                                id="CurrentPosition"
                                                datatype={'text'}
                                                disabled={!this.state.IsEmployed}
                                                onChange={e => this.handleChange(e)}
                                                onBlur={e => this.validate(e)}
                                            />
                                            <FormHelperText
                                                id="CurrentPosition-error-text"
                                                className={this.state.CurrentPositionError ? '' : this.props.classes.none}
                                            >
                                                Required! Only lower/uppser case letters and punctuation signs with length between 2 and 100 characters
                                            </FormHelperText>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Work Experience</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container>
                                <Grid item xs={12} sm={6}  md={4}>
                                    <FormGroup>
                                        <FormLabel>
                                            Languages
                                            </FormLabel>
                                        {this.renderCheckboxes('ProgrammingLanguagesCheckboxes')}
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FormGroup>
                                        <FormLabel>
                                            Frameworks
                                            </FormLabel>
                                        {this.renderCheckboxes('FrameworksCheckboxes')}
                                    </FormGroup>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <FormGroup>
                                        <FormLabel>
                                            Databases
                                            </FormLabel>
                                        {this.renderCheckboxes('DatabasesCheckboxes')}
                                    </FormGroup>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Contact info</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container>
                                <Grid item xs={12} md={4}>
                                    <FormControl
                                        fullWidth
                                        className={this.props.classes.formControl}
                                        error={this.state.PhoneError}
                                        aria-describedby="Phone-error-text"
                                    >
                                        <InputLabel htmlFor="Phone">{'+380123456789'}</InputLabel>
                                        <Input
                                            id="Phone"
                                            defaultValue={'+380'}
                                            datatype={'text'}
                                            onChange={e => this.handleChange(e)}
                                            onBlur={e => this.validate(e)}
                                        />
                                        <FormHelperText
                                            id="Phone-error-text"
                                            className={this.state.LastNameError ? '' : this.props.classes.none}
                                        >
                                                Must match with pattern in placeholder
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl
                                        fullWidth
                                        className={this.props.classes.formControl}
                                        error={this.state.EmailError}
                                        aria-describedby="Email-error-text"
                                    >
                                        <InputLabel htmlFor="Email">{'mail@domain.com*'}</InputLabel>
                                        <Input
                                            id="Email"
                                            datatype={'text'}
                                            onChange={e => this.handleChange(e)}
                                            onBlur={e => this.validate(e)}
                                        />
                                        <FormHelperText
                                            id="Email-error-text"
                                            className={this.state.EmailError ? '' : this.props.classes.none}
                                        >
                                            Enter a valid email address
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <FormControl
                                        fullWidth
                                        className={this.props.classes.formControl}
                                        error={this.state.SkypeError}
                                        aria-describedby="Skype-error-text"
                                    >
                                        <InputLabel htmlFor="Skype">Skype name</InputLabel>
                                        <Input
                                            id="Skype"
                                            datatype={'number'}
                                            onChange={e => this.handleChange(e)}
                                            onBlur={e => this.validate(e)}
                                        />
                                        <FormHelperText
                                            id="Skype-error-text"
                                            className={this.state.SkypeError ? '' : this.props.classes.none}
                                        >
                                            Enter a valid skype name
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Education Info</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container>
                                <Grid item xs={12} md={6}>
                                    <FormControl
                                        fullWidth
                                        className={this.props.classes.formControl}
                                        error={this.state.PlaceOfStudyingError}
                                        aria-describedby="PlaceOfStudying-error-text"
                                    >
                                        <InputLabel htmlFor="PlaceOfStudying">Place of studying</InputLabel>
                                        <Input
                                            id="PlaceOfStudying"
                                            datatype={'text'}
                                            onChange={e => this.handleChange(e)}
                                            onBlur={e => this.validate(e)}
                                        />
                                        <FormHelperText
                                            id="PlaceOfStudying-error-text"
                                            className={this.state.PlaceOfStudyingError ? '' : this.props.classes.none}
                                        >
                                            Only lower/uppser case letters with length between 2 and 100 characters
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <FormControl
                                        fullWidth
                                        className={this.props.classes.formControl}
                                        error={this.state.SpecialityError}
                                        aria-describedby="Speciality-error-text"
                                    >
                                        <InputLabel htmlFor="Speciality">Speciality</InputLabel>
                                        <Input
                                            id="Speciality"
                                            datatype={'text'}
                                            onChange={e => this.handleChange(e)}
                                            onBlur={e => this.validate(e)}
                                        />
                                        <FormHelperText
                                            id="Speciality-error-text"
                                            className={this.state.SpecialityError ? '' : this.props.classes.none}
                                        >
                                            Only lower/uppser case letters with length between 2 and 100 characters
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel defaultExpanded>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={this.props.classes.heading}>Other</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container>
                                <Grid item xs={12} md={12}>
                                    <FormControl
                                        fullWidth
                                        className={this.props.classes.formControl}
                                        error={this.state.OtherError}
                                        aria-describedby="Other-error-text"
                                    >
                                        <InputLabel htmlFor="Other">Tell us something about yourself</InputLabel>
                                        <Input
                                            id="Other"
                                            datatype={'text'}
                                            onChange={e => this.handleChange(e)}
                                            onBlur={e => this.validate(e)}
                                        />
                                        <FormHelperText
                                            id="Other-error-text"
                                            className={this.state.OtherError ? '' : this.props.classes.none}
                                        >
                                            Error
                                        </FormHelperText>
                                    </FormControl>
                                </Grid>
                            </Grid>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <Button
                        fullWidth
                        className={this.props.classes.submitButton}
                        disabled={!this.state.isValid || !this.state.isNotEmpty}
                        onClick={e => this.handleSubmit()}
                    >
                        Submit
                    </Button>
                </form>
            </Grid>;
        } else {
            // tslint:disable-next-line:jsx-wrap-multiline
            return <div>
                <Typography variant="display1" style={{textAlign: 'center', marginTop: '100px'}} gutterBottom>
                Thanks for patience {this.state.FirstName + ' ' + this.state.LastName}!
                </Typography>
                <Button     
                        className={this.props.classes.centerButton}                   
                        onClick={e => this.clearForm()}
                >
                        Next respondent
                </Button>
            </div>;        
        }

    }
}

const styles: StyleRulesCallback = theme => ({
    root: {
        flexGrow: 1,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing.unit,
    },
    none: {
        display: 'none'
    },
    select: {
        'margin-top': '24px',
    },
    fullwidth: {
        width: '100%',
    },
    submitButton: {
        position: 'fixed',
        bottom: '0px',
        background: '#39a3dc',
    },
    centerButton: {
        display: 'block',
        marginRight: 'auto',
        marginLeft: 'auto'
    }
});

function mapStateToProps(state: RootState) {
    return {

    };
}

function mapDispatchToProps(dispatch: any) {
    return {

    };
}

export default (withStyles(styles)<{}>(connect(mapStateToProps, mapDispatchToProps)(SurveyPage)));