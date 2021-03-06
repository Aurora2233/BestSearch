import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Input from "src/components/Input";
import "./index.css";
const useStyles = makeStyles((theme) => ({
  SearchTitle: {
    fontSize: "60px",
    margin: "5vh 0",
    width: "100%",
    textAlign: "center",
  },
}));
let Home = () => {
  const classes = useStyles();
  return (
    <>
      <div className="Box">
        <Typography className={classes.SearchTitle}>Search Trends</Typography>
        <div className="SearchContent">
          <Input />
        </div>
      </div>
    </>
  );
};

export default Home;
