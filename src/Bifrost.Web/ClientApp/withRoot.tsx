import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import * as colors from 'material-ui/colors';
import CssBaseline from 'material-ui/CssBaseline';

// A theme with custom primary and secondary color.
// It's optional.
const theme = createMuiTheme({
  palette: {
    primary: colors.lightBlue,
    secondary: colors.blueGrey,
  },
});

function withRoot(Component: React.ComponentType) {
  function WithRoot(props: object) {
    // MuiThemeProvider makes the theme available down the React tree
    // thanks to React context.
    return (
      <MuiThemeProvider theme={theme}>
        <div>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...props} />
        </div>
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;