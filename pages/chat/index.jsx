import { ErrorPage, SeoHead } from "@component/page";
import { fetchChat, fetchArticle, fetchArticles, fetchAuthorData } from "@utils/firestoreFetch";

import ChatContainer from "@component/chat";

const Index = ({ error, followers, following, blocked }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return <ChatContainer {...{ followers, following, blocked }} />;
};

export default Index;

export const getServerSideProps = async () => {
  // const { connected, errorProp } = require("@utils/serverFunctions");
  // const noNetwork = !(await connected);
  // const { viewsRead = [], hiddenViews = [] } = myAuthorID ? await fetchAuthorData(myAuthorID) : [];
  // const hiddenView = [...viewsRead, ...hiddenViews];

  // if (!author || !viewHref) return errorProp();
  // if (noNetwork) return errorProp(400, "It seems there's a network connectivity issue, try again later");

  const { followers, following, blocked, error } = await fetchChat({ handle: "@pedro" });
  if (error) return errorProp();

  return {
    props: { followers, following, blocked },
  };
};
