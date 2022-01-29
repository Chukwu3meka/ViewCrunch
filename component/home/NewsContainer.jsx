import { useEffect, useState } from "react";

import { News } from ".";
import { fetcher } from "@utils/clientFunctions";

const NewsContainer = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNEWS = async () => {
      setNews(await fetcher("/api/externalApi/newsApi"));
    };
    getNEWS();
  }, []);

  return <News news={news} />;
};

export default NewsContainer;
