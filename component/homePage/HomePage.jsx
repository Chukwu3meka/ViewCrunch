import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import { Intro, Trending, News, ViewsContainer, homeStyles } from ".";
import { NavContainer, Footer } from "@component/layout";

const HomePage = ({ trending }) => (
  <div>
    <Intro />
    <Trending trending={trending} />

    <Grid container style={{ maxWidth: "1200px", margin: "auto" }}>
      <NavContainer />
      <Grid item xs={12} sm={12} md={8}>
        <News />
        <ViewsContainer />
        <Footer />
      </Grid>
    </Grid>
  </div>
);

const mapStateToProps = (state) => ({
    deviceWidth: state.device?.deviceWidth,
  }),
  mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
