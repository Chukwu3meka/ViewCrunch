import { styles } from ".";
import { Footer, NavContainer } from "@component/layout";
import { Grid, Typography } from "@mui/material";

const Publish = ({ crunches }) => (
  <Grid container>
    {/* style={{ maxWidth: "1200px", margin: "auto" }} */}
    <NavContainer>
      <div className={styles.nav}>
        <Typography variant="h4">Publish</Typography>
        <hr />
        <Typography fontSize={15}>Share your views with the world in any crunch, and get real responses once its approved.</Typography>
      </div>
    </NavContainer>
    <Grid item xs={12} sm={12} md={8}>
      <div className={styles.publish}>
        <TextField
          fullWidth
          autoFocus
          // error={title.length && !!titleHandler(title) ? true : false}
          label="Title"
          placeholder="Title of view"
          // value={title}
          // onChange={(e) => titleHandler(e.target.value.trimStart().replace(/\s+/g, " "))}
        />
      </div>
    </Grid>
  </Grid>
);

export default Publish;
