import SpaceContainer from "@component/space";
import { ErrorPage, SeoHead } from "@component/page";

const Index = ({ spaces, myFollowing, error }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return (
    <>
      <SeoHead />
      <SpaceContainer spaces={spaces} myFollowing={myFollowing} />
    </>
  );
};

export default Index;

export const getServerSideProps = async (ctx) => {
  const { fetchSpaces } = require("@utils/firestoreFetch");
  const { extractHandle, errorProp } = require("@utils/serverFunctions");

  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");
  if (!myHandle) return errorProp(401, "User not logged in");

  const { spaces, myFollowing, error } = await fetchSpaces(myHandle);
  if (!spaces?.length || error) return errorProp(400, "Unable to fetch spaces");

  return {
    props: {
      spaces,
      myFollowing,
    },
  };
};
