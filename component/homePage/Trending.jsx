import { trendingStyles } from ".";
import TimelineIcon from "@material-ui/icons/Timeline";
import Link from "next/link";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const Trending = ({ trending }) => (
  <Grid container className={trendingStyles.trending} spacing={1}>
    <Grid item xs={12} sm={12} md={12} lg={12}>
      <TimelineIcon fontSize="small" />
      <Typography variant="h5" component="h2">
        Trending on ViewCrunch
      </Typography>
    </Grid>
    {trending.map(({ authorLink, author, crunchLink, crunch, title, link, date }, i) => (
      <Grid item xs={12} sm={6} md={4} lg={4} key={link}>
        <span>{`0${i + 1}`}</span>
        <div>
          <Typography variant="body2">
            <Link href={authorLink}>{author}</Link> in <Link href={crunchLink}>{crunch}</Link>
          </Typography>
          <Typography variant="h5" component="h2">
            <Link href={link}>{title}</Link>
          </Typography>
          <Typography variant="body2" component="span">{`Published ${date}`}</Typography>
        </div>
      </Grid>
    ))}
  </Grid>
);

export default Trending;
