import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { PrimaryBody, NewsFlash, Highlight, styles } from "@component/homePage";

const HomePage = ({ highlight, newsFlash, primary, deviceWidth }) => (
  <Grid container alignItems="center" spacing={3}>
    <Grid item xs={12} lg={8} className={styles.primaryBody}>
      <PrimaryBody primary={primary} deviceWidth={deviceWidth} />
    </Grid>
    <Grid item xs={12} lg={4} className={styles.newsFlash}>
      <NewsFlash newsFlash={newsFlash} />
    </Grid>
    <Grid item xs={12} sm={12}>
      <Highlight highlight={highlight} styles={styles} />
    </Grid>
  </Grid>
);

const mapStateToProps = (state) => ({
    deviceWidth: state.device?.deviceWidth,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
