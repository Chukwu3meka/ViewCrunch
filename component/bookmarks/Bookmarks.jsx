import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

import { styles } from ".";
import { Views } from "@component/home";
import { Footer, NavContainer } from "@component/layout";

const Notification = ({ uiViews, mobile, bookmarkHandler, bookmarks }) => (
  <Grid container style={{ maxWidth: "1200px", margin: "auto" }}>
    <NavContainer>
      <div className={styles.nav}>
        <Typography variant="h4">Bookmarks</Typography>
        <hr />
        <Typography fontSize={15}>Here you get a list of views you have bookmarked.</Typography>
      </div>
    </NavContainer>
    <Grid item xs={12} sm={12} md={8}>
      <Views
        {...{
          label: "Bookmarks",
          views: uiViews,
          loading: false,
          fetchFailed: false,
          getViews: () => {},
          mobile,
          bookmarkHandler,
          bookmarks,
        }}
      />
      <Footer />
    </Grid>
  </Grid>
);

export default Notification;
