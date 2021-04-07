import { ErrorPage, SeoHead } from "@component/page";
import HomePage, { SecBodyContainer } from "@component/homePage";
import { fetchArticles, fetchAuthorData, fetchHomePageData } from "@utils/firestoreFetch";

const Index = ({ error, articles, highlight, newsFlash, quoteOfTheDay, primaryArticles, propsLastVisible, propsArticlesRead }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return (
    <>
      <SeoHead />
      <div style={{ padding: "10px" }}>
        <HomePage {...{ highlight, newsFlash, primaryArticles, quoteOfTheDay }} />
        <SecBodyContainer {...{ articles, propsLastVisible, propsArticlesRead }} />
      </div>
    </>
  );
};
export default Index;

export const getServerSideProps = async ({ ctx }) => {
  const { extractHandle, errorProp, connected } = require("@utils/serverFunctions");

  // if (!(await connected)) return errorProp(400, "Network connectivity issue");
  // const { myAuthorID } = await extractHandle("cookiePedroView", ctx?.req?.headers?.cookie);
  // const { articlesRead = [] } = myAuthorID ? await fetchAuthorData(myAuthorID) : [];
  // const { articles, propsLastVisible } = await fetchArticles({ limit: 10, articlesRead });
  const { articles, propsLastVisible } = await fetchArticles({ limit: 10 });

  const { highlight, newsFlash, primaryArticles, quoteOfTheDay } = await fetchHomePageData();
  // console.log(
  //   //
  //   highlight
  //   // , newsFlash
  //   // primaryArticles,
  //   // quoteOfTheDay
  // );

  // if (!articles.length || !primaryArticles.length) return errorProp(408, "Check your network connection, and try again.");

  return {
    props: {
      articles,
      highlight,
      newsFlash,
      // error: false,
      quoteOfTheDay,
      primaryArticles,
      propsLastVisible: 10,
      propsArticlesRead: [],
    },
  };
};
