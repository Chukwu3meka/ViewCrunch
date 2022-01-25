import Grid from "@material-ui/core/Grid";

import { NavContainer, Footer } from "@component/layout";
import { Intro, Trending, NewsContainer, ViewsContainer } from ".";

const HomePage = ({ trending }) => (
  <div>
    <Intro />
    <Trending trending={trending} />

    <Grid container style={{ maxWidth: "1200px", margin: "auto" }}>
      <NavContainer />
      <Grid item xs={12} sm={12} md={8}>
        <NewsContainer />
        <ViewsContainer />
        <Footer />
      </Grid>
    </Grid>
  </div>
);

export default HomePage;
