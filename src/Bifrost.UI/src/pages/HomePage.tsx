import * as React from 'react';
import Typography from 'material-ui/Typography';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';
import { RootState } from '../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Todo } from '../model/model';

export namespace HomePage {
  export interface Props extends RouteComponentProps<void> {
    todoList: Todo[];
  }
}

class HomePage extends React.Component<WithStyles & HomePage.Props> {

  render() {
    return (
          <div className={this.props.classes.root}>
            <Typography variant="display1" gutterBottom>
              NetLS Software Development welcomes you!
            </Typography>
            <img src={'/NetLSlogo.png'} className={this.props.classes.image} alt={'NetLS Logo'} />
          </div>
    );
  }
}

const styles: StyleRulesCallback = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
  image: {
    maxWidth: '100%',
    height: 'auto',
  }
});

function mapStateToProps(state: RootState) {
  return {
    todoList: state.todoList
  };
}

export default (withStyles(styles)<{}>(connect(mapStateToProps)(HomePage)));
