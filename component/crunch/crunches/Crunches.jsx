import Link from "next/link";
import Image from "next/image";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { styles } from ".";
import { shortNumber } from "@utils/clientFunctions";
import { Footer, NavContainer } from "@component/layout";

const Crunches = ({ myCrunches }) => (
  <Grid container style={{ maxWidth: "1200px", margin: "auto" }}>
    <NavContainer>
      <div className={styles.nav}>
        <Typography variant="h4">Crunches</Typography>
        <hr />
        <Typography fontSize={15}>Here you find all Crunches you follow, and you can also search for specific crunches.</Typography>
      </div>
    </NavContainer>
    <Grid item xs={12} sm={12} md={8}>
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="flex-start" alignItems="flex-start" flexWrap="wrap">
        {myCrunches.map(({ crunchID, about, picture, title, stat: { totalFollowers } }, index) => (
          <Paper key={index} elevation={2} className={styles.crunches}>
            <Link href={`/crunch/${crunchID}`}>
              <a>
                <div>
                  <Image src={picture} alt={title} layout="fill" />
                </div>
                <div>
                  <p>
                    <Link href={`/crunch/${crunchID}`}>
                      <a>
                        <Typography component="h2">{title}</Typography>
                      </a>
                    </Link>
                    <Typography color="burlywood" fontSize={13}>
                      &nbsp;{shortNumber(totalFollowers)}
                    </Typography>
                  </p>
                  <Typography component="summary" fontSize={13}>
                    {about}
                  </Typography>
                </div>
              </a>
            </Link>
          </Paper>
        ))}
      </Stack>
      <Footer />
    </Grid>
  </Grid>
);

export default Crunches;
