import Link from "next/link";
import { Paper } from "@material-ui/core/Paper";
import { dateCalculator } from "@utils/clientFunctions";
import { LineText, Typography } from "@component/others";

const NewsFlash = ({ newsFlash }) => (
  <div>
    <LineText title="Headline" />
    {newsFlash.length
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
