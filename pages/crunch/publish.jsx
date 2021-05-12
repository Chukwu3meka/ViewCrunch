import { ErrorPage } from "@component/page";
import { PublishContainer } from "@component/crunch";

const Publish = ({ crunch, published, error }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return <PublishContainer crunch={crunch} published={published} />;
};
export default Publish;

export const getServerSideProps = async (ctx) => {
  const { fetchProfile } = require("@utils/firestoreFetch");
  const { extractHandle, errorProp } = require("@utils/serverFunctions");

  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");
  if (!myHandle) return errorProp(401, "User not logged in");

  const { published: publishedArray } = await fetchProfile(myHandle);
  const published = !publishedArray.length ? [] : publishedArray.map((x) => x.title);

  return {
    props: { crunch: ctx.query.id, published },
  };
};
