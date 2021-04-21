import { ErrorPage, SeoHead } from "@component/page";
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
          seo_keywords: view.keywords,
          seo_description: view.description,
        }}
      />
      <ViewContainer view={view} advert={advert} />
    </>
  );
};

export default Index;

export const getServerSideProps = async (ctx) => {
  const { fetchArticle } = require("@utils/firestoreFetch");
  const { extractHandle, errorProp } = require("@utils/serverFunctions");
  const myHandle = await extractHandle(ctx.req.headers.cookie);
  if (myHandle === "Network connectivity issue") return errorProp(408, "Network connectivity issue");

  const { view, advert, error } = await fetchArticle({
    author: ctx.query.handle,
    viewHref: ctx.query.viewHref,
    myHandle,
  });

  if (error) return errorProp();

  return {
    props: { view, advert },
  };
};
