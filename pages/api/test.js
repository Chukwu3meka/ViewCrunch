import firebaseAdmin from "@utils/firebaseServer";

export default async (req, res) => {
  try {
    for (const [key, value] of Object.entries({
      "/@maduekwepedro@overcoming-sexual-sin": "@maduekwepedro/overcoming-sexual-sin",
      "/@maduekwepedro@waking-early:-my-transformation-from-a-night-owl-to-an-early-bird-in-three-weeks":
        "@maduekwepedro/waking-early:-my-transformation-from-a-night-owl-to-an-early-bird-in-three-weeks",
      "/@maduekwepedro@three-most-important-things-in-life": "@maduekwepedro/three-most-important-things-in-life",
      "/@maduekwepedro@improving-wealth-on-two-major-scales": "@maduekwepedro/improving-wealth-on-two-major-scales",
      "/@maduekwepedro@benefits-of-carrots": "@maduekwepedro/benefits-of-carrots",
      "/@maduekwepedro@animating-quotes-for-the-day": "@maduekwepedro/animating-quotes-for-the-day",
      "/@maduekwepedro@40-life-hacks": "@maduekwepedro/40-life-hacks",
      "/@maduekwepedro@what-lessons-have-you-learnt-from-your-little-actions-that-have-turned-into-event":
        "@maduekwepedro/what-lessons-have-you-learnt-from-your-little-actions-that-have-turned-into-event",
      "/@maduekwepedro@my-top-10-life-hacks-for-daily-personal-development":
        "@maduekwepedro/my-top-10-life-hacks-for-daily-personal-development",
    })) {
      await firebaseAdmin
        .firestore()
        .collection("view")
        .doc(key)
        .update({
          "title.path": value,
          "visible.status": true,
        })
        .catch((error) => {
          throw new TypeError(error);
        });
    }

    return res.status(200).json({});
  } catch (error) {
    console.log(error);
    return res.status(401).json({});
  }
};
