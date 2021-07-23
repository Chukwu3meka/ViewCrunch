import { styles } from ".";
import Link from "next/link";
import { LineText } from "@component/others";
import { Paper, Typography } from "@material-ui/core";
import { dateCalculator } from "@utils/clientFunctions";

const NewsFlash = ({ newsFlash }) => (
  <div className={styles.newsFlash}>
    <LineText title="Headline" />
    {newsFlash?.length
      ? newsFlash.map(({ flash, newsLink, date }) => (
          <Link href={`/news/${newsLink}`} key={newsLink}>
            <a>
              <Paper elevation={4}>
                <Typography variant="body1">{flash}</Typography>
                <Typography variant="caption" color="secondary">{`ViewCrunch | ${dateCalculator({ date })}`}</Typography>
              </Paper>
            </a>
          </Link>
        ))
      : ""}
  </div>
);

export default NewsFlash;
