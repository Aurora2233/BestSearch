import { useState, useEffect } from "react";
import { store } from "src/store/index";
import { makeStyles } from "@material-ui/core/styles";
import { getdata } from "src/store/actions/index";
import { useAppDispatch } from "src/store/hooks";
import { useParams } from "react-router-dom";
import ReactECharts from "echarts-for-react";
import {
  Typography,
  Card,
  CardContent,
  Grid,
  Container,
  Box,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
const useStyles = makeStyles({
  root: {
    Width: 275,
  },
  ratio: {
    marginTop: "20px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  date: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10px",
  },
});
const chartsStyles = makeStyles({
  chart: {
    height: "150px",
  },
});
interface props {
  id: string;
}
const Page = ({ data }: any) => {
  let xAxis = data.search_msv.map((item: any) => item.date);
  let seriesData = data.search_msv.map((item: any) => item.sv);
  let classes = chartsStyles();
  const options = {
    xAxis: {
      show: false,
      type: "category",
      boundaryGap: false,
      data: xAxis,
    },
    yAxis: {
      show: false,
      type: "value",
    },
    axisLine: {
      show: false,
    },
    grid: {
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
    },
    series: [
      {
        data: seriesData,
        type: "line",
        areaStyle: {},
      },
    ],
  };
  return <ReactECharts className={classes.chart} option={options} />;
};
let Results = () => {
  let [loading, setloading] = useState(true);
  let { id } = useParams<props>();
  const dispatch = useAppDispatch();
  let {
    search: { data },
  } = store.getState();

  useEffect(() => {
    getdata(dispatch, id).then((res: any) => {
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
            {[0, 1, 2, 3].map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton variant="rect" height={200} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {data.map((item: any, index: number) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card className={classes.root}>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {item.name}
                    </Typography>
                    <Typography className={classes.ratio} color="textSecondary">
                      Growth {item.yoy}%
                    </Typography>
                    <Typography component="div">
                      <Page data={item} />
                    </Typography>
                    <Typography className={classes.date} component="span">
                      {item.created_at} - {item.updated_at}
                    </Typography>
                  </CardContent>
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
