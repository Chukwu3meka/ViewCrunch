import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";

import { News } from ".";
import { fetcher } from "@utils/clientFunctions";
import { Footer, NavContainer } from "@component/layout";

const NewsContainer = (props) => {
  const [news, setNews] = useState([]),
    [newsPage, setNewsPage] = useState(true);
  useEffect(() => {
    if (props.news) {
      setNews(props.news);
    } else {
      setNewsPage(false);
      const getNEWS = async () => {
        setNews(await fetcher("/api/externalApi/newsApi"));
      };
      getNEWS();
    }
  }, []);

  return newsPage ? (
    <Grid container style={{ maxWidth: "1200px", margin: "auto" }}>
      <NavContainer>
        <div>NEWS Page: Updated daily at 12:00AM</div>
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
