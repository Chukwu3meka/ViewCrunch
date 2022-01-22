import { useEffect, useState } from "react";
import { Paper, Typography } from "@material-ui/core";

import { newsStyles } from ".";
import { fetcher } from "@utils/clientFunctions";

const NewsFlash = ({ newsFlash }) => {
  const [news, setNews] = useState([]);
  useEffect(() => {
    const getNEWS = async () => {
      const articles = await fetcher("/api/externalApi/newsApi");
      setNews(articles);
    };
    getNEWS();
  }, []);

  return news?.length ? (
    <div className={newsStyles.news}>
      <Typography variant="h2">Top Headlines</Typography>
      {news.map(({ title, link, source }) => (
        <Paper key={link}>
          <a href={link}>{title}</a>
          <Typography variant="body2" color="secondary">
            {source}
          </Typography>
        </Paper>
      ))}
    </div>
  ) : null;
};

export default NewsFlash;
