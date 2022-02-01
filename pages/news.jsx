import NewsContainer from "@component/news";

const Index = ({ news }) => <NewsContainer news={news} />;

export default Index;

export const getServerSideProps = async () => {
  const { fetcher } = require("@utils/clientFunctions");
  const news = await fetcher(`${process.env.SERVER_URL}/api/externalApi/newsApi`);

  return { props: { news } };
};
