import { useState, useEffect } from "react";
import { store } from "src/store/index";
import { makeStyles } from "@material-ui/core/styles";
import { getInfo } from "src/store/actions/index";
import { useAppDispatch } from "src/store/hooks";
import { useParams } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  Box,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
const useStyles = makeStyles({
  root: {
    Width: 275,
  },
  image: {
    height: 300,
    borderBlock: "1px solid #e1e1e1",
  },
  text: {
    color: "#878787",
  },
  keyword: {
    fontWeight: "bold",
  },
  domain: {
    color: "#878787",
    fontSize: 14,
  },
  Content: {
    height: 150,
  },
  title: {
    fontSize: 18,
    maxHeight: 60,
    overflow: "hidden",
    textOverflow: "ellipsis",
    boxOrient: "vertical",
    lineClamp: 2,
  },
  publishedTime: {
    fontSize: 18,
    color: "#878787",
  },
  price: {
    margin: "10px 0",
    color: "#878787",
  },
  date: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  },
  rect: {
    marginBottom: 10,
  },
});
interface props {
  id: string;
}
let Results = () => {
  let [loading, setloading] = useState(true);
  const dispatch = useAppDispatch();
  let { id } = useParams<props>();
  console.log(id, "id");

  let {
    search: { productInfo },
  } = store.getState();

  console.log(productInfo);
  useEffect(() => {
    getInfo(dispatch, id).then((res: any) => {
      setloading(!!productInfo);
    });
  }, []);
  const classes = useStyles();
  return (
    <>
      <Container className="Container">
        <Grid item xs={12}>
          <Box component="h3">
            Related new products published in last 7 days
          </Box>
        </Grid>
        {loading ? (
          <Grid container spacing={3}>
            {[0, 1, 2, 3].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <Skeleton
                  variant="rect"
                  height={300}
                  className={classes.rect}
                />
                <Skeleton variant="rect" height={130} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            66
          </Grid>
        )}
      </Container>
    </>
  );
};
export default Results;
