import { News } from ".";
import Head from "next/head";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useRef } from "react";
import { SeoHead } from "@component/page";
import { setDisplayHeader } from "@store/actions";
import { fetchNews } from "@utils/firestoreFetch";

const NewsContainer = (props) => {
  const { newsFlash, setDisplayHeader, today } = props,
    scrollRef = useRef(null),
    { enqueueSnackbar } = useSnackbar(),
    [date, setDate] = useState(newsFlash?.date),
    [flash, setFlash] = useState(newsFlash?.flash),
    [prev, setPrev] = useState(newsFlash?.date === "Tue Jun 15 2021" ? false : "prev"),
    [next, setNext] = useState(newsFlash?.date === new Date().toDateString() ? false : "next");

  const newsFetcher = (sign) => async () => {
    const d = new Date(date);
    d.setDate(sign ? d.getDate() + 1 : d.getDate() - 1);
    const news = await fetchNews(d.toDateString());

    // console.log(news.date);
    if (news?.date) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
      // await setDisplayHeader("hidden");
      setDate(news.date);
      setFlash(news.flash);

      setPrev(news.date === "Tue Jun 15 2021" ? false : "prev");
      setNext(news.date === new Date().toDateString() ? false : "next");
    } else {
      enqueueSnackbar(`Unable to fetch news`, { variant: "error" });
    }
  };

  return (
    <>
      <Head>
        <link rel="canonical" href="https://www.viewcrunch.com/news" />
      </Head>
      <SeoHead
        {...{
          seo_quote: newsFlash.flash?.split("@@@")[2],
          seo_title: `ViewCrunch NEWS for ${newsFlash.date}`,
          seo_hashtag: `#ViewCrunch NEWS ~ ${newsFlash.date}`,
          seo_description: `1. ${newsFlash.flash?.split("@@@")[0]}\n 2.${newsFlash.flash?.split("@@@")[1]}`,
          seo_keywords: "news, breaking news, headline, viewcrunch, worldwide",
        }}
      />
      <News {...{ flash, date, prev, next, newsFetcher, scrollRef, today }} />
    </>
  );
};

const mapStateToProps = (state) => ({}),
  mapDispatchToProps = {
    setDisplayHeader,
  };

export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);
