import { ErrorPage } from "@component/page";
import { PublishContainer } from "@component/space";
import { createMarkdownArray } from "@utils/clientFunctions";
import { fetchArticle, fetchProfileData } from "@utils/firestoreFetch";

const BlogPost = ({ error, titles, propsTitle, propsTag, propsContentArray, articleId }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return <PublishContainer {...{ titles, propsTitle, propsTag, propsContentArray, articleId }} />;
};

export default BlogPost;

export const getServerSideProps = async ({
  query: { articleId },
  req: {
    headers: { cookie },
  },
}) => {
  const { connected, errorProp, extractHandle } = require("@utils/serverFunctions");

  if (!articleId) return errorProp();
  if (!(await connected)) return errorProp(400, "It seems there's a network connectivity issue, try again later");

  const { content, error } = await fetchArticle({ articleId }),
    { myAuthorID } = await extractHandle("cookiePedroView", cookie),
    { articles, error: profileErr } = await fetchProfileData({ authorId: myAuthorID }),
    titles = articles?.map(({ title }) => title?.toLowerCase());

  if (!myAuthorID || myAuthorID !== content?.authorId || error || profileErr) return errorProp();
  const propsContentArray = await createMarkdownArray(content.markdown);

  return {
    props: { titles, propsTitle: content.title, propsTag: content.tag, propsContentArray, articleId },
  };
};
