import firebaseAdmin from "@utils/firebaseServer";

const verifyRefresh = async (myRefresh) => {
  const { access_token: token } = await fetch(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/x-www-form-urlencoded" }),
    body: `grant_type=refresh_token&refresh_token=${myRefresh}`,
    credentials: "same-origin",
  }).then((res) => res.json());

  console.log("handle string", token, myRefresh);
  if (!token) return "invalid user";

  return await firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .then(async (decodedToken) => {
      const handle = await firebaseAdmin
        .auth()
        .getUser(decodedToken?.uid)
        .then((user) => user.displayName);

      if (!handle.startsWith("@")) return { myHandle: handle };
      if (!handle) throw new TypeError("invalid user");

      const profile = await firebaseAdmin
        .firestore()
        .collection("profile")
        .doc(handle)
        .get()
        .then((snapshot) => snapshot.data())
        .catch((error) => {
          throw new TypeError(error);
        });

      return {
        myHandle: handle,
        myTheme: profile.stat?.theme,
        myNotification: profile.notification?.length,
        myProfilePicture: profile.profilePicture,
        myCoverPicture: profile.coverPicture,
        myDisplayName: profile.displayName,
        myProfession: profile.profession,
        mySeen: profile.stat?.seen,
      };
    })
    .catch((error) => {
      throw new TypeError(error);
    });
};

export default async (req, res) => {
  try {
    const profile = await verifyRefresh(req.body.myRefresh);
    if (profile === "invalid user") throw new TypeError("Invalid User");
    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(401).json({});
  }
};
