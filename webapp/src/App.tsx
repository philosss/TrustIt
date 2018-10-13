import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";
import {blue, pink} from "@material-ui/core/colors";
import "./App.css";
import NavigationPanel from "./navigation/NavigationPanel";
import {store} from "./store/Store";

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: pink
    }
});

class App extends React.Component {
    public render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <MuiThemeProvider theme={theme}>
                        <NavigationPanel/>
                    </MuiThemeProvider>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
