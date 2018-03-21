import * as React from 'react';
import * as PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
    ExpansionPanelDetails,
    ExpansionPanelSummary,
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import * as classes from "classnames"
import { ResolveOptions } from 'dns';
import { IBaseProps } from '../shared/IBaseProps';
import { IBaseState } from '../shared/IBaseState';
import RespondentModel from '../models/RespondentModel';
import { RouteComponentProps } from 'react-router';
import { WithStyles } from 'material-ui';
import * as compose from 'recompose'

const styles = (theme: any) => ({
    root: {
        flexGrow: 1,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
});

export interface IRespondentProps extends IBaseProps {
}

export interface IRespondentState extends IBaseState {
    respondent: RespondentModel;
    expanded: string | null;
}

export class Respondent extends React.Component<IRespondentProps & RouteComponentProps<{}> & WithStyles<'root' | 'heading' | 'secondaryHeading'>, IRespondentState> {
    //static propTypes: { classes: PropTypes.Validator<any>; };

    constructor(props: any){
        super(props);

        this.state = {
            expanded: null,
            respondent: new RespondentModel(),
        };
    }



    handleChange = (panel: any) => (event: any, expanded: boolean) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    render() {
        const  {classes}  = this.props;
        const { expanded } = this.state;

        return (
            <div className={classes.root}>
                <ExpansionPanel expanded={expanded === 'panel1'} onChange={this.handleChange('panel1')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>General settings</Typography>
                        <Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                            maximus est, id dignissim quam.
            </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel2'} onChange={this.handleChange('panel2')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Users</Typography>
                        <Typography className={classes.secondaryHeading}>
                            You are currently not an owner
            </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar
                            diam eros in elit. Pellentesque convallis laoreet laoreet.
            </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <ExpansionPanel expanded={expanded === 'panel3'} onChange={this.handleChange('panel3')}>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Advanced settings</Typography>
                        <Typography className={classes.secondaryHeading}>
                            Filtering has been entirely disabled for whole web server
            </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <Typography>
                            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit amet egestas
                            eros, vitae egestas augue. Duis vel est augue.
            </Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    }
}

export default withStyles(styles)(Respondent)