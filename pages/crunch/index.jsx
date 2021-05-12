import CrunchContainer from "@component/crunch";
import { ErrorPage, SeoHead } from "@component/page";

const Index = ({ crunches, myFollowing, error }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return (
    <>
      <SeoHead />
      <CrunchContainer crunches={crunches} myFollowing={myFollowing} />
    </>
  );
};

export default Index;

export const getServerSideProps = async (ctx) => {
  const { fetchCrunches } = require("@utils/firestoreFetch");
  const { extractHandle, errorProp } = require("@utils/serverFunctions");

  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");
  if (!myHandle) return errorProp(401, "User not logged in");

  const { crunches, myFollowing, error } = await fetchCrunches(myHandle);
  if (error) return errorProp(400, "Unable to fetch crunches");

  return {
    props: {
      crunches,
      myFollowing,
    },
  };
};
