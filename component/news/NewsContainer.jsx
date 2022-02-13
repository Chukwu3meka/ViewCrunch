import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";

import { News, styles } from ".";
import { fetcher } from "@utils/clientFunctions";
import { Footer, NavContainer } from "@component/layout";
import { Typography } from "@mui/material";

const NewsContainer = (props) => {
  const [news, setNews] = useState([]),
    [newsPage, setNewsPage] = useState(true);
  useEffect(() => {
    if (props.news) {
      setNews(props.news);
    } else {
      setNewsPage(false);
      const getNEWS = async () => {
        setNews(await fetcher("/api/news/newsApi"));
      };
      getNEWS();
    }
  }, []);

  return newsPage ? (
    <Grid container style={{ maxWidth: "1200px", margin: "auto" }}>
      <NavContainer>
        <div className={styles.nav}>
          <Typography variant="h4">NEWS Page</Typography>
          <Typography fontSize={15}>
            Our NEWS Page is powered by
            <a target="_blank" href="https://rapidapi.com/">
              RAPIDAPI
            </a>
            : The Next-Generation API Platform
            <hr />
            We update our NEWS page daily at 12:00AM with the latest headlines in the country
          </Typography>
        </div>
      </NavContainer>
      <Grid item xs={12} sm={12} md={8}>
        <News news={news} />
        <Footer />
      </Grid>
    </Grid>
  ) : (
    <News news={news} />
  );
};

export default NewsContainer;
