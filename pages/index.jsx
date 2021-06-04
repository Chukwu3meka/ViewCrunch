import { ErrorPage, SeoHead } from "@component/page";
import HomePage, { SecBodyContainer } from "@component/homePage";

const Index = ({ error, highlight, newsFlash, primary, secondary, lastVisible, crunch, blacklist }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;

  return (
    <>
      <SeoHead />
      <div style={{ padding: "0 10px 0" }}>
        <HomePage {...{ highlight, newsFlash, primary }} />
        <SecBodyContainer {...{ serverSecondary: secondary, serverLastVisible: lastVisible, crunch, serverBlacklist: blacklist }} />
      </div>
    </>
  );
};
export default Index;

export const getServerSideProps = async (ctx) => {
  const { fetchViews } = require("@utils/firestoreFetch"),
    { extractHandle, errorProp } = require("@utils/serverFunctions");

  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");

  const { error, secondary, lastVisible, crunch, blacklist, highlight, newsFlash, primary } = await fetchViews({
    myHandle,
    lastVisible: "initial request",
  });
  if (error) return errorProp(400, "Unable to fetch secondary data");

  return {
    props: {
      crunch,
      primary,
      blacklist,
      highlight,
      secondary,
      newsFlash,
      lastVisible,
    },
  };
};
