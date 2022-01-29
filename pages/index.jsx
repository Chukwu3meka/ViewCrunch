import { ErrorPage } from "@component/page";
import HomeContainer from "@component/home";

const Index = ({ error, trending, crunches }) =>
  error ? <ErrorPage statusCode={error?.code} title={error?.title} /> : <HomeContainer trending={trending} crunches={crunches} />;

export default Index;

export const getServerSideProps = async () => {
  const { fetchHomeData } = await require("@utils/firestoreFetch");

  const { error = false, trending = [], crunches = [] } = await fetchHomeData();

  return { props: { error, trending, crunches } };
};
