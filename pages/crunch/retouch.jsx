import { ErrorPage } from "@component/page";
import { PublishContainer } from "@component/crunch";

const BlogPost = ({ error, viewToBeModified }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return <PublishContainer viewToBeModified={viewToBeModified} />;
};

export default BlogPost;

export const getServerSideProps = async (ctx) => {
  const { fetchView } = require("@utils/firestoreFetch");
  const { extractHandle, errorProp, convertContentToArray } = require("@utils/serverFunctions");

  if (!ctx.query.id) return errorProp(404, "View not found");

  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");
  if (!myHandle) return errorProp(401, "User not logged in");

  console.log(myHandle);
  return errorProp(404, "View does exist");

  const { view, error } = await fetchView({ author: myHandle, viewHref: `${ctx.query.id}`, myHandle });
  if (error || view.author !== myHandle) return errorProp(404, "View does not exist");

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
