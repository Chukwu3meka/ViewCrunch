import { auth, firestore } from "@utils/firebaseServer";

const verifyRefresh = async (myRefresh) => {
  const { access_token: token } = await fetch(
    `https://securetoken.googleapis.com/v1/token?key=${JSON.parse(process.env.NEXT_PUBLIC_CLIENT).apiKey}`,
    {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/x-www-form-urlencoded" }),
      body: `grant_type=refresh_token&refresh_token=${myRefresh}`,
      credentials: "same-origin",
    }
  ).then((res) => res.json());

  if (!token) throw "invalid cookie";

  const uid = await auth
    .verifyIdToken(token)
    .then(({ uid }) => uid)
    .catch((err) => {
      throw err;
    });

  const profile = await firestore
    .collection("profile")
    .doc(uid)
    .get()
    .then((snapshot) => snapshot.data())
    .catch((error) => {
      throw new TypeError(error);
    });
  if (!profile) throw "profile not found";

  return {
    myID: uid,
    myTheme: profile.details.theme,
    myNotification: profile.notifications.length,
  };
};

export default async (req, res) => {
  try {
    const profile = await verifyRefresh(req.body.myRefresh);
    return res.status(200).json(profile);
  } catch (error) {
    // console.log(error);
    return res.status(401).send(false);
  }
};
