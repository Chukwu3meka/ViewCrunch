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

  const published = [],
    crunch = ctx.query.id,
    { published: publishedArray, roles, crunches } = await fetchProfile(myHandle);

  if (roles.suspended) return errorProp(401, "Account is suspended, Please, contact ViewCrunch");
  if (!crunches[crunch].publish) return errorProp(401, "Temporarily banned from publishing to this Crunch");
  if (Object.keys(publishedArray).length !== 0) {
    for (const x in publishedArray) {
      published.push(publishedArray[x].title);
    }
  }

  return {
    props: { crunch, published },
  };
};
