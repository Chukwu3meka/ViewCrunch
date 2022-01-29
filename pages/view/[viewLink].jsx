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
      <ViewContainer view={view} author={author} />
    </>
  );
};

export default Index;

export const getServerSideProps = async (ctx) => {
  const { fetchView } = await require("@utils/firestoreFetch");

  const { pageData = {}, error = false } = await fetchView(ctx.query.viewLink);

  return { props: { error, ...pageData } };
};
