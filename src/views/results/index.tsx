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

  const options = {
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: xAxis,
    },
    yAxis: {
      type: "value",
    },
    grid: {
      containLabel: true,
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
            {[0, 1, 2, 3, 4, 5].map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item}>
                <Skeleton />
                <Skeleton animation="wave" />
                <Skeleton variant="rect" height={200} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {data.map((item: any, index: number) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
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
