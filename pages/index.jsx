import { ErrorPage } from "@component/page";
import HomeContainer from "@component/home";

const Index = ({ error, trending, crunches }) =>
  error ? <ErrorPage statusCode={error?.code} title={error?.title} /> : <HomeContainer trending={trending} crunches={crunches} />;

export default Index;

export const getServerSideProps = async () => {
  const { fetchHomeData } = require("@utils/firestoreFetch");

  // console.log(fetchHomeData, "fetchHomeData");

  const { error = false, trending = [], crunches = [] } = await fetchHomeData();
  // const { error = false, trending = [], crunches = [] } = [];

  return { props: { error, trending, crunches } };
};
