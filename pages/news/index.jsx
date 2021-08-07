import { ErrorPage } from "@component/page";
import NewsContainer from "@component/news";

const Index = ({ error, newsFlash }) => {
  if (error) return <ErrorPage statusCode={error.code} title={error.title} />;
  return <NewsContainer newsFlash={newsFlash} today={true} />;
};

export default Index;

export const getServerSideProps = async () => {
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
