import NewsContainer from "@component/news";
import { ErrorPage, SeoHead } from "@component/page";

const Index = ({ error, newsFlash }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;

  return (
    <>
      <SeoHead
        {...{
          seo_quote: newsFlash.flash?.split("@@@")[0],
          seo_hashtag: `#ViewCrunch NEWS ~ ${newsFlash.date}`,
          seo_keywords: "news, breaking news, headline, viewcrunch",
          seo_image: "https://www.viewcrunch.com/images/ViewCrunch.webp",
          seo_description: newsFlash.flash?.split("@@@").map((x, i) => `${i}. ${x}`),
          seo_title: `ViewCrunch NEWS for ${newsFlash.date} ~ ${newsFlash.flash?.split("@@@")[0]}`,
        }}
      />
      <NewsContainer newsFlash={newsFlash} today={true} />
    </>
  );
};
export default Index;

export const getServerSideProps = async (ctx) => {
  const { fetchNews } = require("@utils/firestoreFetch");

  return {
    props: {
      newsFlash: (await fetchNews()) || {
        flash: "Today's NEWS not in yet ~ ViewCrunch is preparing something big for you",
        date: new Date().toDateString(),
      },
    },
  };
};
