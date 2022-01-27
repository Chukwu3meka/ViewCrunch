import firebaseAdmin from "@utils/firebaseServer";

const verifyRefresh = async (myRefresh) => {
  const { access_token: token } = await fetch(`https://securetoken.googleapis.com/v1/token?key=${process.env.NEXT_PUBLIC_API}`, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/x-www-form-urlencoded" }),
    body: `grant_type=refresh_token&refresh_token=${myRefresh}`,
    credentials: "same-origin",
  }).then((res) => res.json());

  if (!token) return "invalid user";

  // const email = await auth.verifyIdToken(token);
  // console.log(email);

  console.log("server", "auth", firebaseAdmin);
  // return await auth
  //   .verifyIdToken(token)
  //   .then(async (decodedToken) => {
  // const handle = await firebaseAdmin
  //   .auth()
  //   .getUser(decodedToken?.uid)
  //   .then((user) => user.displayName);

  // if (!handle.startsWith("@")) return { myHandle: handle };
  // if (!handle) throw new TypeError("invalid user");

  // const profile = await firebaseAdmin
  //   .firestore()
  //   .collection("profile")
  //   .doc(handle)
  //   .get()
  //   .then((snapshot) => ({ ...snapshot.data(), id: snapshot.id }))
  //   .catch((error) => {
  //     throw new TypeError(error);
  //   });

  // return {
  //   myHandle: handle,
  //   myID: profile.id,
  //   myTheme: profile.stat?.theme,
  //   myNotification: profile.notification?.length,
  //   myProfilePicture: profile.profilePicture,
  //   myCoverPicture: profile.coverPicture,
  //   myDisplayName: profile.displayName,
  //   myProfession: profile.profession,
  // };
  // })
  // .catch((err) => {
  //   console.log("server err", { err });

  //   throw new TypeError(err);
  // });
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
