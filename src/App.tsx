import { Route } from "react-router-dom";
import { createTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Home from "./views/home/index";
import Results from "./views/results/index";
import withSubscription from "./views/page/index";
import "./App.css";
import { store } from "./store/index";
import { Provider } from "react-redux";
const theme = createTheme({
  palette: {
    primary: {
      light: "#FAF7EE",
      main: "#FAF7EE",
      dark: "#002884",
      contrastText: "#fff",
    },
    secondary: {
      light: "#666",
      main: "#666",
      dark: "#666",
      contrastText: "#fff",
    },
  },
});
// let DEMO = Page(Home);
const Page = withSubscription(Home, true);
const Result = withSubscription(Results, false);
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Route exact path="/">
          <Page />
        </Route>
        <Route path="/:id">
          <Result />
        </Route>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
