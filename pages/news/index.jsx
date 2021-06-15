import NewsContainer from "@component/news";
import { ErrorPage, SeoHead } from "@component/page";

const Index = ({ error, newsFlash }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;

  return (
    <>
      <SeoHead />
      <NewsContainer newsFlash={newsFlash} />
    </>
  );
};
export default Index;

export const getServerSideProps = async (ctx) => {
  const { fetchNews } = require("@utils/firestoreFetch"),
    { errorProp } = require("@utils/serverFunctions");

  const newsFlash = await fetchNews();
  if (!newsFlash) return errorProp(400, "No data found for this date");

  return { props: { newsFlash } };
};
