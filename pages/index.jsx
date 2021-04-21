import { ErrorPage, SeoHead } from "@component/page";
import HomePage, { SecBodyContainer } from "@component/homePage";

const Index = ({ error, articles, highlight, newsFlash, primaryArticles, propsLastVisible, propsArticlesRead }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;

  return (
    <>
      <SeoHead />
      <div style={{ padding: "0 10px 0" }}>
        <HomePage {...{ highlight, newsFlash, primaryArticles }} />
        <SecBodyContainer {...{ articles, propsLastVisible, propsArticlesRead }} />
      </div>
    </>
  );
};
export default Index;

export const getServerSideProps = async (ctx) => {
  const { extractHandle, errorProp } = require("@utils/serverFunctions");
  const { fetchArticles, fetchProfile, fetchHomeData } = require("@utils/firestoreFetch");

  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");

  const homeData = await fetchHomeData();
  const profileData = await fetchArticles({ limit: 10 });
  if (profileData.error || homeData.error) return errorProp(400, "Difficulty fetching data");

  return {
    props: {
      articles: profileData.articles,
      highlight: homeData.highlight,
      newsFlash: homeData.newsFlash,
      primaryArticles: homeData.primaryArticles,
      propsLastVisible: profileData.propsLastVisible,
      propsArticlesRead: [],
    },
  };
};
