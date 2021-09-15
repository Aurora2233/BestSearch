import { useState, useEffect } from "react";
import { store } from "src/store/index";
import { makeStyles } from "@material-ui/core/styles";
import { getInfo } from "src/store/actions/index";
import { useAppDispatch } from "src/store/hooks";
import Product from "src/views/product/index";
import { useParams, useLocation } from "react-router-dom";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  Box,
  CardActionArea,
  CardMedia,
  Link,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
const useStyles = makeStyles({
  Container: {
    marginTop: "5vh",
  },
  header: {
    width: "100%",
    display: "flex",
  },
  image: {
    width: 500,
    height: 500,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  price: {
    color: "#999",
  },
  time: {
    fontSize: 16,
  },
  link: {
    marginBottom: 10,
    textDecoration: "underline",
    color: "#999",
  },
});
interface props {
  productId: string;
}
interface Location {
  state: {
    param: string;
  };
  param: string;
}
let Info = () => {
  let [loading, setloading] = useState(true);
  let [Info, setInfo] = useState({});
  const dispatch = useAppDispatch();
  let { productId } = useParams<props>();

  let {
    search: {
      productInfo = {
        image: "",
        title: "",
        price: "",
        published: "",
        store_domain: "",
      },
    },
  } = store.getState();

  useEffect(() => {
    getInfo(dispatch, +productId).then((res: any) => {
      setloading(false);
      setInfo(productInfo);
    });
  }, [productId]);
  const classes = useStyles();
  return (
    <>
      <Container className={classes.Container}>
        {loading ? (
          <div>
            <Box display="flex" alignItems="center">
              <Box marginRight={10}>
                <Skeleton
                  variant="rect"
                  width="500px"
                  height="500px"
                ></Skeleton>
              </Box>
              <Box width="100%">
                <Skeleton height={200} width="100%"></Skeleton>
                <Skeleton width="20%"></Skeleton>
                <Skeleton width="100%"></Skeleton>
                <Skeleton width="100%"></Skeleton>
                <Skeleton width="80%"></Skeleton>
              </Box>
            </Box>
          </div>
        ) : (
          <div>
            <Box display="flex" alignItems="center">
              <Box marginRight={10}>
                <CardMedia
                  className={classes.image}
                  image={productInfo.image}
                  title="Contemplative Reptile"
                />
              </Box>
              <Box width="100%">
                <Typography component="p" className={classes.title}>
                  {productInfo.title}
                </Typography>
                <Typography component="p" className={classes.price}>
                  ${productInfo.price}
                </Typography>
                <Typography className={classes.time} component="p">
                  Published {productInfo.published} dats ago
                </Typography>
                <Link className={classes.link}>{productInfo.store_domain}</Link>
              </Box>
            </Box>
          </div>
        )}
        <Product />
      </Container>
    </>
  );
};
export default Info;
