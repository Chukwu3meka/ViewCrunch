import Link from "next/link";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { styles } from ".";
import { shortNumber } from "@utils/clientFunctions";
import { Footer, NavContainer } from "@component/layout";

const Crunches = ({ myCrunches, otherCrunches, followHandler }) => (
  <Grid container style={{ maxWidth: "1200px", margin: "auto" }}>
    <NavContainer>
      <div className={styles.nav}>
        <Typography variant="h4">Crunches</Typography>
        <hr />
        <Typography fontSize={15}>Here you find all Crunches you follow, and you can also search for specific crunches.</Typography>
      </div>
    </NavContainer>

    <Grid item xs={12} sm={12} md={8}>
      <>
        <Typography component="h1" className={styles.crunchesTitle}>
          Suggested crunches for you
        </Typography>

        <div className={styles.otherCrunchesContainer}>
          {otherCrunches.map(({ crunchID, about, picture, title, follower, totalFollowers }, index) => (
            <Paper key={index} elevation={2} className={styles.otherCrunches}>
              <Link href={`/crunch/${crunchID}`}>
                <a>
                  <div>
                    <Image src={picture} alt={title} layout="fill" />
                  </div>
                  <p>
                    <Typography component="h2">{title}</Typography>
                    <Typography color="burlywood" fontSize={13}>
                      &nbsp; ● {shortNumber(totalFollowers)} followers
                    </Typography>
                  </p>
                  <Typography component="summary" fontSize={13}>
                    {about}
                  </Typography>
                </a>
              </Link>
              <div>
                <Button
                  variant="outlined"
                  size="small"
                  color="secondary"
                  fullWidth
                  onClick={followHandler({ follower, id: crunchID, title })}>
                  {follower ? "Unfollow" : "follow"}
                </Button>
                {follower && (
                  <Link href={`/crunch/write?id=${crunchID}`}>
                    <Button variant="outlined" size="small" color="secondary" fullWidth>
                      Publish
                    </Button>
                  </Link>
                )}
              </div>
            </Paper>
          ))}
        </div>
      </>

      <hr />
      <Typography component="h1" className={styles.crunchesTitle}>
        Crunches you follow
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="flex-start" alignItems="flex-start" flexWrap="wrap">
        {myCrunches.map(({ crunchID, about, picture, title, follower, totalFollowers }, index) => (
          <Paper key={index} elevation={2} className={styles.crunches}>
            <Link href={`/crunch/${crunchID}`}>
              <a>
                <div>
                  <Image src={picture} alt={title} layout="fill" />
                </div>
                <div>
                  <p>
                    <Typography component="h2">{title}</Typography>
                    <Typography color="burlywood" fontSize={13}>
                      &nbsp; ● {shortNumber(totalFollowers)} followers
                    </Typography>
                  </p>
                  <Typography component="summary" fontSize={13}>
                    {about}
                  </Typography>
                </div>
              </a>
            </Link>
            <div>
              <Button variant="outlined" size="small" fullWidth onClick={followHandler({ follower, id: crunchID, title })}>
                {follower ? "Unfollow" : "follow"}
              </Button>
              {follower && (
                <Link href={`/crunch/write?id=${crunchID}`}>
                  <Button variant="outlined" size="small" fullWidth>
                    Publish
                  </Button>
                </Link>
              )}
            </div>
          </Paper>
        ))}
      </Stack>

      <Footer />
    </Grid>
  </Grid>
);

export default Crunches;
