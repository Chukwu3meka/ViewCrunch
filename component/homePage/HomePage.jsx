import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Intro, Trending, PrimaryBody, NewsFlash, Highlight, homeStyles } from ".";
import { Paper, Typography } from "@material-ui/core";

const HomePage = ({ highlight, newsFlash, primary, deviceWidth }) => (
  <div className={homeStyles.home}>
    <Intro />
    <Trending />
    {/*  */}

    {/*  */}
  </div>

  // <Grid container alignItems="center" spacing={3}>
  //   <Grid item xs={12} lg={8} className={homeStyles.primaryBody}>
  //     <PrimaryBody primary={primary} deviceWidth={deviceWidth} />
  //   </Grid>
  //   <Grid item xs={12} lg={4}>
  //     <NewsFlash newsFlash={newsFlash} />
  //   </Grid>
  //   <Grid item xs={12} sm={12}>
  //     <Highlight highlight={highlight} />
  //   </Grid>
  // </Grid>
);

const mapStateToProps = (state) => ({
    deviceWidth: state.device?.deviceWidth,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
