import { useEffect, useState } from "react";

import { News } from ".";
import { fetcher } from "@utils/clientFunctions";

const NewsContainer = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNEWS = async () => {
      const articles = await fetcher("/api/externalApi/newsApi");
      setNews(articles);
    };
    getNEWS();
  }, []);

  return <News news={news} />;
};

export default NewsContainer;
