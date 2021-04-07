import { ErrorPage, SeoHead } from "@component/page";
import { SpaceContainer } from "@component/space";
import { fetchViewscape } from "@utils/firestoreFetch";

const Index = ({ spaceDetails, views, space, error }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;

  return (
    <>
      <SeoHead />
      <SpaceContainer {...{ spaceDetails, views, space }} />
    </>
  );
};

export default Index;

export const getServerSideProps = async ({
  query: { "@space": space },
  req: {
    headers: { cookie },
  },
}) => {
  const { extractHandle, errorProp, connected } = require("@utils/serverFunctions");
  // // const noNetwork = !(await connected);
  // // if (noNetwork) return errorProp(400, "Network connectivity issue");
  // // const { myAuthorID } = await extractHandle("cookiePedroView", cookie);
  // // if (!myAuthorID) return errorProp(400, "User not logged in");

  const { spaceDetails, views, error } = await fetchViewscape(space);

  if (error) return errorProp(400, "Unable to fetch data now");

  return {
    props: { space, spaceDetails, views },
  };
};
