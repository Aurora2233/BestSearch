import { Box, AppBar, Toolbar, Link } from "@material-ui/core";
import Input from "../../components/Input";
import "./index.css";

function withSubscription<T>(Component: React.ComponentType<T>, show: boolean) {
  return (props: T) => (
    <>
      <header className="app-header">
        <AppBar position="sticky" color="primary">
          <Toolbar className="bar">
            <Link href="/" underline="none">
              <Box component="span" fontWeight={500} className="Title">
                Best
              </Box>
              <Box component="span" fontWeight={300} className="Title">
                Search
              </Box>
            </Link>
            {show ? null : <Input />}
          </Toolbar>
        </AppBar>
      </header>
      <div className="app-body">
        <Component {...props} />
      </div>
      {/* <footer className="app-footer">...</footer> */}
    </>
  );
}

export default withSubscription;
