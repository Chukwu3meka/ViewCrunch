import firebaseAdmin from "@utils/firebaseServer";

const verifyRefresh = async (myRefresh) => {
  const { access_token: token } = await fetch(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/x-www-form-urlencoded" }),
    body: `grant_type=refresh_token&refresh_token=${myRefresh}`,
    credentials: "same-origin",
  }).then((res) => res.json());

  return await firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .then(async (decodedToken) => {
      const handle = await firebaseAdmin
        .auth()
        .getUser(decodedToken?.uid)
        .then((user) => user.displayName);

      if (!handle.startsWith("@")) return { myHandle };
      if (!handle) throw new TypeError("invalid user");

      const profile = await firebaseAdmin
        .firestore()
        .collection("profile")
        .doc(handle)
        .get()
        .then((querySnapshot) => querySnapshot.docs[0])
        .catch();

      return {
        myHandle: handle,
        myTheme: profile.data().stat?.theme,
        myNotification: profile.data().notification?.length,
        myProfilePicture: profile.data().profilePicture,
        myCoverPicture: profile.data().coverPicture,
        myDisplayName: profile.data().displayName,
        myProfession: profile.data().profession,
      };
    })
    .catch((error) => {
      console.log(error);
    });
};

export default async (req, res) => {
  try {
    return res.status(200).json({
      myHandle: "@pedro",
      myTheme: "dark",
      myNotification: 13,
      myProfilePicture: "/images/20.png",
      myCoverPicture: "/images/9.png",
      myDisplayName: "Pedro JR",
      myProfession: "React Developer",
      mySeen: [
        "what-is-the-use-of-dynamics-routes-in-next-js-without-creating-the-popular-custom-server-and-limiting-the-capabilities-of-next-js",
        "my-favorite-top--10-daily-life-hacks-that-keeps-me-going,-are-not-limited-to-safety,-performance,-rules-playing-but---satisfaction-and-efficiency",
        "in-sint-ex-est-nulla-ad.",
        "proident-aliquip-do-sunt-et-sint-consequat-aute.",
        "culpa-nostrud-dolor-anim-non-ut-est-do-ea-aute-amet-dolor-pariatur-ea.",
        "ea-sunt-eu-non-irure.",
        "nostrud-laboris-aute-fugiat-ullamco-ipsum-et-eiusmod-amet-reprehenderit-fugiat-deserunt.",
      ],
    });

    const profile = await verifyRefresh(req.body.myRefresh);

    return res.status(200).json(profile);
  } catch (error) {
    console.log(error);
    return res.status(401).send(undefined);
  }
};
