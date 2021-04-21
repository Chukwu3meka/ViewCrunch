import { ErrorPage } from "@component/page";
import { PublishContainer } from "@component/crunch";

const Publish = ({ crunch, error }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return <PublishContainer crunch={crunch} />;
};
export default Publish;

export const getServerSideProps = async (ctx) => {
  const { extractHandle, errorProp } = require("@utils/serverFunctions");

  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");
  if (!myHandle) return errorProp(401, "User not logged in");

  return {
    props: { crunch: ctx.query.id },
  };
};
