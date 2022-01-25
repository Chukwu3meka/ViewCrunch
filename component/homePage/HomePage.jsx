import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Intro, Trending, PrimaryBody, News, ViewsContainer, homeStyles } from ".";
import { Box, Paper, Typography } from "@material-ui/core";
import { NavContainer } from "@component/layout";

const HomePage = ({ trending, highlight, newsFlash, primary, deviceWidth }) => (
  <div className={homeStyles.home}>
    <Intro />
    <Trending trending={trending} />

    {/* <NavContainer />
    <div style={{ minHeight: "2000px" }}>asdas</div> */}
    <Grid container style={{ maxWidth: "1200px", margin: "auto" }}>
      <NavContainer />
      <Grid item xs={12} sm={12} md={8}>
        <News />
        <ViewsContainer />
      </Grid>
    </Grid>
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
