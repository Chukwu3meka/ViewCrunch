import { ErrorPage, SeoHead } from "@component/page";
import { CrunchContainer } from "@component/crunch";

const Index = ({ crunchDetails, views, crunch, error }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;

  return (
    <>
      <SeoHead />
      <CrunchContainer {...{ crunchDetails, views, crunch }} />
    </>
  );
};

export default Index;

export const getServerSideProps = async (ctx) => {
  // const { fetchCrunches } = require("@utils/firestoreFetch");
  const { extractHandle, errorProp } = require("@utils/serverFunctions");

  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");
  if (!myHandle) return errorProp(401, "User not logged in");

  const crunch = ctx.query.crunch;

  return errorProp(500, "Temporal Server issue");

  // const { crunches, myFollowing, error } = await fetchCrunches(myHandle);
  // if (error) return errorProp(400, "Unable to fetch crunches");

  // const { extractHandle, errorProp, connected } = require("@utils/serverFunctions");
  // // // const noNetwork = !(await connected);
  // // // if (noNetwork) return errorProp(400, "Network connectivity issue");
  // // // const { myAuthorID } = await extractHandle("cookiePedroView", cookie);
  // // // if (!myAuthorID) return errorProp(400, "User not logged in");

  // const { crunchDetails, views, error } = await fetchViewscape(crunch);

  // if (error) return errorProp(400, "Unable to fetch data now");

  // return {
  //   props: { crunch, crunchDetails, views },
  // };
};
