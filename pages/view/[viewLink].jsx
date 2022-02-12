import { useRouter } from "next/router";
import ViewContainer from "@component/view";
import { ErrorPage, SeoHead } from "@component/page";

const Index = ({ error, view, author, viewID }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;

  const router = useRouter();
  const { viewLink } = router.query;

  return (
    <>
      <SeoHead
        {...{
          seo_title: view.title,
          seo_image: view.pryImage,
          seo_description: view.description,
          seo_hashtag: `#${view.displayName}`,
          seo_keywords: `${view.keyword}, ${view.title}`,
          seo_quote: `${view.title} by ${view.displayName}`,
        }}
      />
      <ViewContainer view={view} author={author} url={`${process.env.SERVER_URL}/view${viewLink}`} viewID={viewID} />
    </>
  );
};

export default Index;

export const getServerSideProps = async (ctx) => {
  const { fetchView } = await require("@utils/firestoreFetch");

  const { pageData = {}, error = false } = await fetchView(ctx.query.viewLink);

  return { props: { error, ...pageData } };
};
