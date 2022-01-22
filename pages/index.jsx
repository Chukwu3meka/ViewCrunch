import { ErrorPage, SeoHead } from "@component/page";
import HomePage, { SecBodyContainer } from "@component/homePage";

const Index = ({ error, trending }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;

  return <HomePage trending={trending} />;

  // {/* <SeoHead /> */}
  // {/* <div style={{ padding: "0 10px 0" }}> */}
  // <HomePage {...{ highlight, newsFlash, primary }} />
  // {/* <SecBodyContainer {...{ serverSecondary: secondary, serverLastVisible: lastVisible, crunch, serverBlacklist: blacklist }} /> */}
  // {/* </div> */}
};
export default Index;

export const getServerSideProps = async () => {
  const { errorProp } = require("@utils/serverFunctions"),
    { fetchTrending } = require("@utils/firestoreFetch");

  const { error, trending } = await fetchTrending();

  if (error) return errorProp(400, "Unable to fetch secondary data");

  return { props: { trending } };
};
