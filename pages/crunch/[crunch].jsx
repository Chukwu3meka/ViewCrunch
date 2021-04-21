import { ErrorPage, SeoHead } from "@component/page";
import { CrunchContainer } from "@component/crunch";
import { fetchViewscape } from "@utils/firestoreFetch";

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

export const getServerSideProps = async ({
  query: { crunch },
  req: {
    headers: { cookie },
  },
}) => {
  const { extractHandle, errorProp, connected } = require("@utils/serverFunctions");
  // // const noNetwork = !(await connected);
  // // if (noNetwork) return errorProp(400, "Network connectivity issue");
  // // const { myAuthorID } = await extractHandle("cookiePedroView", cookie);
  // // if (!myAuthorID) return errorProp(400, "User not logged in");

  const { crunchDetails, views, error } = await fetchViewscape(crunch);

  if (error) return errorProp(400, "Unable to fetch data now");

  return {
    props: { crunch, crunchDetails, views },
  };
};
