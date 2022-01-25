const axios = require("axios").default;
import firebaseAdmin from "@utils/firebaseServer";

const handler = async () => {
  return await firebaseAdmin
    .firestore()
    .collection("news")
    .doc("today")
    .get()
    .then(async (snapshot) => {
      const { date, data } = snapshot.data();

      // (new Date() - new Date(date)) / (1000 * 60 * 60 * 24) - 1;
      const dateDiff = Math.round(new Date(new Date().toDateString()) - new Date(date)) / (1000 * 60 * 60 * 24);

      if (dateDiff > 0) {
        const articles = await axios
          .request({
            method: "GET",
            url: "https://google-news1.p.rapidapi.com/top-headlines",
            params: { country: "NG", lang: "en", limit: "50" },
            headers: {
              "x-rapidapi-host": "google-news1.p.rapidapi.com",
              "x-rapidapi-key": process.env.NEXT_PUBLIC_NEWS_API,
            },
          })
          .then((response) => response.data.articles.map(({ title, link }) => ({ title, link })))
          .catch(function (error) {
            throw error;
          });

        await firebaseAdmin.firestore().collection("news").doc("today").update({
          data: articles,
          date: new Date().toDateString(),
        });

        return articles;
      } else {
        return data;
      }
    })
    .catch((err) => {
      throw err;
    });
};

export default async (req, res) => {
  try {
    const articles = await handler();
    return res.status(200).json(articles);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
