import { ErrorPage, SeoHead } from "@component/page";
import HomePage, { SecBodyContainer } from "@component/homePage";

const Index = ({ error, highlight, newsFlash, primary, secondary, lastVisible, crunch, blacklist }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;

  return (
    <>
      <SeoHead />
      <div style={{ padding: "0 10px 0" }}>
        <HomePage {...{ highlight, newsFlash, primary }} />
        <SecBodyContainer {...{ secondary, lastVisible, crunch, blacklist }} />
      </div>
    </>
  );
};
export default Index;

export const getServerSideProps = async (ctx) => {
  const { fetchHomeData, fetchViews } = require("@utils/firestoreFetch"),
    { extractHandle, errorProp } = require("@utils/serverFunctions");

  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");

  const { secondary, lastVisible, crunch, blacklist } = await fetchViews({ myHandle }),
    { highlight, newsFlash, primary } = await fetchHomeData({ crunch, blacklist });

  // console.log(secondary);

  if (!highlight && !newsFlash && !primary && !secondary && lastVisible && !crunch && !blacklist)
    return errorProp(400, "Unable to fetch");

  return {
    props: {
      highlight,
      newsFlash,
      primary,
      secondary,
      lastVisible,
      crunch,
      blacklist,
    },
  };
};
