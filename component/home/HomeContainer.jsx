import Grid from "@mui/material/Grid";

import { Footer } from "@component/layout";
import { NavBar, Intro, Trending, NewsContainer, ViewsContainer, viewsStyles } from ".";

const HomePage = ({ trending, crunches }) => (
  <div>
    <Intro />
    {/* <Trending trending={trending} /> */}

    <Grid container style={{ maxWidth: "1200px", margin: "auto" }}>
      <NavBar crunches={crunches} />
      <Grid item xs={12} sm={12} md={8}>
        {/* <NewsContainer /> */}
        {/* <ViewsContainer /> */}
        <Footer />
      </Grid>
    </Grid>
  </div>
);

export default HomePage;
