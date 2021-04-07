import { ErrorPage } from "@component/page";
import { PublishContainer } from "@component/space";

const Publish = ({ space, error }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return <PublishContainer space={space} />;
};
export default Publish;

export const getServerSideProps = async (ctx) => {
  const { fetchProfileData } = require("@utils/firestoreFetch");
  const { extractHandle, errorProp } = require("@utils/serverFunctions");

  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");
  if (!myHandle) return errorProp(401, "User not logged in");

  return {
    props: { space: ctx.query.id },
  };
};
