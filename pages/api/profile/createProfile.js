import firebaseAdmin from "@utils/firebaseServer";

const createProfileHandler = async ({ handle, myRefresh }) => {
  const { access_token: token } = await fetch(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/x-www-form-urlencoded" }),
    body: `grant_type=refresh_token&refresh_token=${myRefresh}`,
    credentials: "same-origin",
  }).then((res) => res.json());

  const uid = await firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => decodedToken?.uid);

  await firebaseAdmin
    .auth()
    .getUser(uid)
    .then(async (user) => {
      const profilePicture = user.photoURL,
        profileCreated = user.metadata.creationTime,
        displayName = user.displayName.replace(/ViewCrunch_new-user_/g, "");

      await firebaseAdmin
        .firestore()
        .collection("profile")
        .doc(`@${handle}`)
        .set({
          profilePicture,
          about: "new Viewer and Writer",
          roles: ["comment", "upload", "active", "vote", "create", "publish", "moderate"],
          coverPicture: "/images/ViewCrunch-cover.webp",
          displayName,
          profession: "Viewer and Writter",
          notification: [
            {
              body: "To understand more on what ViewCrunch is all about visit this page at anytime",
              link: "/control/faq#about",
              title: "About ViewCrunch",
            },
            {
              body:
                "Visit the link at the bottom of any page on ViewCrunch to read more on our 'terms and condition' and 'privacy policy'",
              link: "/control/faq",
              title: "FAQ: Frequently Asked Question",
            },
            { body: "Have a product or service to advertise on ViewCrunch", link: "/control/adverise", title: "Advertise" },
            { body: "Make suggestions here, or contact the developer", link: "/control/contact", title: "Contact Us" },
          ],
          crunch: [],
          favourite: [],
          blacklist: [],
          published: [],
          chat: {
            followers: [],
            blocked: [],
            following: [],
          },
          social: {
            twitterHandle: "MaduekwePedro",
            facebookHandle: "MaduekwePedro",
            linkedinHandle: "MaduekwePedro",
          },
          stat: {
            voteSent: 0,
            voteReceived: 0,
            audience: 0,
            profileCreated,
            seen: [],
            theme: "light",
          },
        })
        .then(async () => {
          await firebaseAdmin
            .auth()
            .updateUser(uid, {
              displayName: `@${handle}`,
            })
            .then()
            .catch((error) => {
              throw new TypeError(error);
            });
        })
        .catch((error) => {
          throw new TypeError(error);
        });
    });
};

export default async (req, res) => {
  try {
    const { handle, myRefresh } = req.body;

    await createProfileHandler({ handle, myRefresh });
    return res.status(200).send(true);
  } catch (error) {
    // console.log(error);
    return res.status(401).send(false);
  }
};
