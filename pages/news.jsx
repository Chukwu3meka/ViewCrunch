import NewsContainer from "@component/news";
import SeoHead from "@component/others/SeoHead";

const Index = ({ news }) => (
  <>
    <SeoHead
      {...{
        seo_title: "ViewCrunch NEWS Page",
        seo_description: "ViewsCrunch NEWS page is updated daily at 12:00am, with the latest headline in the country",
        seo_hashtag: "#ViewCrunch NEWS",
        seo_keywords: "nigerian news, viewcrunch news, news, breaking news, headline",
      }}
    />
    <NewsContainer news={news} />
  </>
);

export default Index;

export const getServerSideProps = async () => {
  const { fetcher } = require("@utils/clientFunctions");
  const news = await fetcher(`${process.env.SERVER_URL}/api/news/newsApi`);

  return { props: { news } };
};
