import Link from "next/link";

import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TimelineIcon from "@mui/icons-material/Timeline";

import { styles } from ".";

const Trending = ({ trending }) => (
  <Grid container className={styles.trending}>
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <TimelineIcon fontSize="small" />
      <Typography variant="h5" component="h2">
        Trending on ViewCrunch
      </Typography>
    </Grid>
    {trending.map(({ profileLink, displayName, crunchLink, crunch, title, viewLink, date }, i) => (
      <Grid item xs={12} sm={6} md={4} lg={4} key={viewLink}>
        <span>{`0${i + 1}`}</span>
        <div>
          <Typography variant="body2">
            <Link href={profileLink}>{displayName}</Link> in <Link href={crunchLink}>{crunch}</Link>
          </Typography>
          <Typography variant="h5" component="h2">
            <Link href={viewLink}>{title}</Link>
          </Typography>
          <Typography variant="body2" component="span">{`Published ${date}`}</Typography>
        </div>
      </Grid>
    ))}
  </Grid>
);

export default Trending;
