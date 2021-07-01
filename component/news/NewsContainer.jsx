import { News } from ".";
import { connect } from "react-redux";
import { useSnackbar } from "notistack";
import { useState, useRef } from "react";
import { setDisplayHeader } from "@store/actions";
import { fetchNews } from "@utils/firestoreFetch";

const NewsContainer = (props) => {
  const { newsFlash, setDisplayHeader } = props,
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

  return <News {...{ flash, date, prev, next, newsFetcher, scrollRef }} />;
};

const mapStateToProps = (state) => ({}),
  mapDispatchToProps = {
    setDisplayHeader,
  };

export default connect(mapStateToProps, mapDispatchToProps)(NewsContainer);
