import { ErrorPage } from "@component/page";
import NewsContainer from "@component/news";

const Index = ({ error, newsFlash }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return <NewsContainer newsFlash={newsFlash} />;
};

export default Index;

export const getServerSideProps = async (ctx) => {
  const { fetchNews } = require("@utils/firestoreFetch"),
    { errorProp } = require("@utils/serverFunctions");

  const newsFlash = await fetchNews(ctx.query.newsDate);
  if (!newsFlash) return errorProp(400, `No NEWS found for ${new Date(ctx.query.newsDate).toDateString()}`);

  return { props: { newsFlash } };
};
