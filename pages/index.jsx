import { ErrorPage, SeoHead } from "@component/page";
import HomePage, { SecBodyContainer } from "@component/homePage";

const Index = ({ error, articles, highlight, newsFlash, primary, propsLastVisible, propsArticlesRead }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;

  return (
    <>
      <SeoHead />
      <div style={{ padding: "0 10px 0" }}>
        <HomePage {...{ highlight, newsFlash, primary }} />
        {/* <SecBodyContainer {...{ articles, propsLastVisible, propsArticlesRead }} /> */}
      </div>
    </>
  );
};
export default Index;

export const getServerSideProps = async (ctx) => {
  const { fetchHomeData } = require("@utils/firestoreFetch"),
    { extractHandle, errorProp } = require("@utils/serverFunctions");

  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");

  const { highlight, newsFlash, primary } = await fetchHomeData(myHandle);

  if (!highlight && !newsFlash && !primary) return errorProp(400, "Unable to fetch");

  return {
    props: {
      highlight,
      newsFlash,
      primary,
      // articles: profileData.articles,
      // propsLastVisible: profileData.propsLastVisible,
      // propsArticlesRead: [],
    },
  };
};
