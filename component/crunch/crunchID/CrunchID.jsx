import Image from "next/image";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { styles } from ".";
import { Views } from "@component/home";
import { shortNumber } from "@utils/clientFunctions";
import { Footer, NavContainer } from "@component/layout";

const CrunchID = ({ crunchViews, crunchDetails: { title, about, picture, date, totalFollowers, lastPublished } }) => (
  <Grid container style={{ maxWidth: "1200px", margin: "auto" }}>
    <NavContainer>
      <div className={styles.nav}>
        <Typography variant="h4">{title}</Typography>
        <hr />
      </div>
    </NavContainer>

    <Grid item xs={12} sm={12} md={8}>
      <div className={styles.crunch}>
        <Paper className={styles.crunchDescription}>
          <div>
            <Image src={picture} alt={title} layout="fill" />
          </div>
          <Paper>
            <Typography component="h2">{title}</Typography>
            <Typography variant="body1">{about}</Typography>
            <Typography color="burlywood" fontSize={13}>
              {`
            Created ${date} ● 
            ${shortNumber(totalFollowers)} Follower${totalFollowers > 1 ? "s" : ""} ●
            Last View Published ${lastPublished}
            `}
            </Typography>
          </Paper>
        </Paper>
        <Views {...crunchViews} />
      </div>
      <Footer />
    </Grid>
  </Grid>
);

export default CrunchID;
