import { Box, AppBar, Toolbar, Link } from "@material-ui/core";
import Input from "src/components/Input";
import "./index.css";

function withSubscription<T>(Component: React.ComponentType<T>, show: boolean) {
  return (props: T) => (
    <>
      <AppBar position="sticky" id="Bar" color="primary">
        <Toolbar className="bar">
          <Link href="/" underline="none">
            <Box component="span" fontWeight={600} className="Title">
              Best
            </Box>
            <Box component="span" className="Title">
              Search
            </Box>
          </Link>
          {show ? null : <Input />}
        </Toolbar>
      </AppBar>
      <div className="app-body">
        <Component {...props} />
      </div>
    </>
  );
}

export default withSubscription;
