import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import IconButton from 'material-ui/IconButton';
import FirstPageIcon from 'material-ui-icons/FirstPage';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import LastPageIcon from 'material-ui-icons/LastPage';
import { StyleRulesCallback, WithStyles } from 'material-ui';
import { RouteComponentProps } from 'react-router';

export namespace TablePaginationActions {
    export interface Props extends RouteComponentProps<void> {
        actions: any;
        onChangePage: Function;
        page: number;
        count: number;
        rowsPerPage: number;
    }

    export interface State {

    }
}
class TablePaginationActions extends React.Component<WithStyles & TablePaginationActions.Props, TablePaginationActions.State> {
    state: {};

    handleFirstPageButtonClick = (event: any) => {
      this.props.onChangePage(event, 0);
    };

    handleBackButtonClick = (event: any) => {
      this.props.onChangePage(event, this.props.page - 1);
    };

    handleNextButtonClick = (event: any) => {
      this.props.onChangePage(event, this.props.page + 1);
    };

    handleLastPageButtonClick = (event: any) => {
      this.props.onChangePage(
        event,
        Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
      );
    };

    render() {

      return (
        <div className={this.props.classes.root}>
          <IconButton
            onClick={this.handleFirstPageButtonClick}
            disabled={this.props.page === 0}
            aria-label="First Page"
          >
            {<FirstPageIcon />}
          </IconButton>
          <IconButton
            onClick={this.handleBackButtonClick}
            disabled={this.props.page === 0}
            aria-label="Previous Page"
          >
            {<KeyboardArrowLeft />}
          </IconButton>
          <IconButton
            onClick={this.handleNextButtonClick}
            disabled={this.props.page >= Math.ceil(this.props.count / this.props.rowsPerPage) - 1}
            aria-label="Next Page"
          >
            {<KeyboardArrowRight />}
          </IconButton>
          <IconButton
            onClick={this.handleLastPageButtonClick}
            disabled={this.props.page >= Math.ceil(this.props.count / this.props.rowsPerPage) - 1}
            aria-label="Last Page"
          >
            {<LastPageIcon />}
          </IconButton>
        </div>
      );
    }
}

const styles: StyleRulesCallback = theme => ({
    root: {
        flexShrink: 0,
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing.unit * 2.5,
      },
});

export default (withStyles(styles)<{}>(TablePaginationActions));