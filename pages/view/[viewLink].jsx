import ViewContainer from "@component/view";
import { ErrorPage, SeoHead } from "@component/page";

const Index = ({ error, view, author }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;

  return (
    <>
      <SeoHead
        {...{
          seo_title: view.title,
          seo_image: view.pryImage,
          seo_hashtag: `#${view.displayName}`,
          seo_keywords: `${view.keyword}, ${view.title}`,
          seo_quote: `${view.title} by ${view.displayName}`,
        }}
      />
      <ViewContainer view={view} authors={author} />
    </>
  );
};

export default Index;

export const getServerSideProps = async (ctx) => {
  const { fetchView } = require("@utils/firestoreFetch");
  const { extractHandle, errorProp } = require("@utils/serverFunctions");

  const myHandle = await extractHandle(ctx.req.headers.cookie);

  const { pageData, error } = await fetchView({
    myHandle,
    viewLink: `/view/${ctx.query.viewLink}`,
  });

  if (error) return errorProp(500, error);

  return { props: { ...pageData } };
};
