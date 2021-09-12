import React, { useState, useEffect } from "react";
import { store } from "../../store/index";
import { makeStyles } from "@material-ui/core/styles";
import { getdata } from "../../store/actions/index";
import { useAppDispatch } from "../../store/hooks";
import { useParams } from "react-router-dom";
import ReactECharts from "echarts-for-react";
import {
  Typography,
  Card,
  CardActions,
  CardContent,
  Grid,
  Container,
  Box,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
interface props {
  id: string;
}
const Page = ({ data }: any) => {
  let xAxis = data.search_msv.map((item: any) => item.date);
  let seriesData = data.search_msv.map((item: any) => item.sv);
  console.log(xAxis);

  const options = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxis,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: seriesData,
        type: "line",
        areaStyle: {},
      },
    ],
  };
  return <ReactECharts option={options} />;
};
let Results = () => {
  let [loading, setloading] = useState(true);
  let { id } = useParams<props>();
  const dispatch = useAppDispatch();
  let {
    counter: { data },
  } = store.getState();

  useEffect(() => {
    getdata(dispatch, id).then((res) => {
      setloading(!!data.length);
    });
  }, []);
  const classes = useStyles();
  return (
    <>
      <Container className="Container">
        <Grid item xs={12}>
          <Box component="h3">Related product trends</Box>
        </Grid>
        {loading ? (
          <Grid container spacing={3}>
            <Grid item lg={3} xs={8} sm={12}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton variant="rect" height={200} />
            </Grid>
            <Grid item lg={3} xs={8} sm={12}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton variant="rect" height={200} />
            </Grid>
            <Grid item lg={3} xs={8} sm={12}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton variant="rect" height={200} />
            </Grid>
            <Grid item lg={3} xs={8} sm={12}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton variant="rect" height={200} />
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {data.map((item: any, index: number) => (
              <Grid item lg={3} xs={8} sm={12} key={index}>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                      Growth {item.yoy}%
                    </Typography>
                    <Typography variant="body2" component="div">
                      <Page data={item} />
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {item.created_at}~{item.updated_at}
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};
export default Results;
