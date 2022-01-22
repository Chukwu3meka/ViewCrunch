import { styles } from ".";
import Link from "next/link";
import { LineText } from "@component/others";
import { Paper, Typography } from "@material-ui/core";
import { dateCalculator } from "@utils/clientFunctions";
import { useEffect } from "react";
import { fetcher } from "@utils/clientFunctions";

const NewsFlash = ({ newsFlash }) => {
  useEffect(() => {
    const { status, followStat } = await fetcher("/api/crunch/unfollowViewscape", JSON.stringify({ id, token, follow }));
  }, []);

  return (
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
};
export default NewsFlash;
