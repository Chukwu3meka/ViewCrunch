import { ErrorPage } from "@component/page";
import { PublishContainer } from "@component/crunch";

const BlogPost = ({ error, viewToBeModified }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return <PublishContainer viewToBeModified={viewToBeModified} />;
};

export default BlogPost;

export const getServerSideProps = async (ctx) => {
  const { fetchViewForRetouch } = require("@utils/firestoreFetch");
  const { extractHandle, errorProp, convertContentToArray } = require("@utils/serverFunctions");

  if (!ctx.query.ref) return errorProp(404, "View not found");

  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");
  if (!myHandle) return errorProp(401, "User not logged in");

  const { view, error } = await fetchViewForRetouch({ ref: ctx.query.ref, myHandle });

  if (error) return errorProp(404, error);

  console.log(myHandle, view);
  return errorProp(404, "View does exist");

  const viewToBeModified = {};

  const { contentArray, formerImagesUrl } = await convertContentToArray(view.content);
  viewToBeModified.content = contentArray;
  viewToBeModified.title = view.title;
  viewToBeModified.description = view.description;
  viewToBeModified.keywords = view.keywords;
  viewToBeModified.formerImagesUrl = formerImagesUrl;

  return {
    props: { viewToBeModified },
  };
};
