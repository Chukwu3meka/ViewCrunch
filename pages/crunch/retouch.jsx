import { ErrorPage } from "@component/page";
import { PublishContainer } from "@component/crunch";

const BlogPost = ({ error, crunch, viewToBeModified, moderator }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return <PublishContainer crunch={crunch} viewToBeModified={viewToBeModified} moderator={moderator} published={[]} />;
};

export default BlogPost;

export const getServerSideProps = async (ctx) => {
  const { fetchViewForRetouch, fetchProfile } = require("@utils/firestoreFetch");
  const { extractHandle, errorProp, convertContentToArray } = require("@utils/serverFunctions");

  if (!ctx.query.ref) return errorProp(404, "View not found");

  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");
  if (!myHandle) return errorProp(401, "User not logged in");

  const { content, title, description, keywords, crunch, error } = await fetchViewForRetouch({ ref: ctx.query.ref, myHandle });
  if (error) return errorProp(404, error);

  const { roles, crunches } = await fetchProfile(myHandle);

  if (roles.suspended) return errorProp(401, "You're suspended from publishing, Please, contact ViewCrunch");
  if (!crunches[crunch]) return errorProp(401, "You're not subscribed to this Crunch");
  if (!crunches[crunch].publish) return errorProp(401, "Temporarily banned from publishing to this Crunch");

  // console.log(myHandle, view);

  // const viewToBeModified = {};

  // const { contentArray, formerImagesUrl } = await convertContentToArray(view.content);
  // viewToBeModified.formerImagesUrl = formerImagesUrl;

  return {
    props: { viewToBeModified: { title, description, keywords, content }, crunch, moderator: crunches[crunch].moderate },
  };
};
