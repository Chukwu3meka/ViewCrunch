import { newsRef } from "@utils/firebaseServer";

const handler = async () => {
  return await newsRef
    .doc("today")
    .get()
    .then(async (snapshot) => {
      const { date, data } = snapshot.data();

      //check if news in firestore is older than 24hrs
      const dateDiff = Math.round(new Date(new Date().toDateString()) - new Date(date)) / (1000 * 60 * 60 * 24);

      if (dateDiff > 0) {
        const axios = require("axios").default;
        const articles = await axios
          .request({
            method: "GET",
            url: "https://google-news1.p.rapidapi.com/top-headlines",
            params: { country: "NG", lang: "en", limit: "50" },
            headers: {
              "x-rapidapi-host": "google-news1.p.rapidapi.com",
              "x-rapidapi-key": process.env.NEXT_PUBLIC_NEWS,
            },
          })
          .then((response) => response.data.articles.map(({ title, link }) => ({ title, link })))
          .catch(function (error) {
            throw error;
          });

        await newsRef.doc("today").update({
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
    return res.status(401).send(false);
  }
};
