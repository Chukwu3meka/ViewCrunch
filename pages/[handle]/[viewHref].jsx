import { ErrorPage, SeoHead } from "@component/page";
import { fetchArticle, fetchArticles, fetchAuthorData } from "@utils/firestoreFetch";
import ViewContainer from "@component/view";

const Index = ({ error, view, advert }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return (
    <>
      <SeoHead
        {...{
          seo_title: view.title,
          seo_hashtag: `#${view.displayName}`,
          seo_quote: `${view.title} by ${view.displayName}`,
          seo_image: view.pryImage,
          seo_keyphrase: view.keyphrase,
          seo_keywords: view.keywords,
          seo_description: view.description,
        }}
      />
      <ViewContainer view={view} advert={advert} />
    </>
  );
};

export default Index;

export const getServerSideProps = async ({ query: { handle: author, viewHref } }) => {
  // const { connected, errorProp } = require("@utils/serverFunctions");
  // const noNetwork = !(await connected);
  // const { viewsRead = [], hiddenViews = [] } = myAuthorID ? await fetchAuthorData(myAuthorID) : [];
  // const hiddenView = [...viewsRead, ...hiddenViews];

  // if (!author || !viewHref) return errorProp();
  // if (noNetwork) return errorProp(400, "It seems there's a network connectivity issue, try again later");

  const { view, advert, error } = await fetchArticle({ author: author.substr(0, 13), viewHref });
  if (error) return errorProp();

  return {
    props: { view, advert },
  };
};
