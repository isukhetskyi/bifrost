import { createMuiTheme } from "material-ui";
import * as muiColors from "material-ui/colors";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        error: muiColors.red
    }    
});

export default theme;