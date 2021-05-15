import { toId } from "@utils/clientFunctions";
import firebaseAdmin from "@utils/firebaseServer";

const initialCrunches = [
  "Universal",
  "Lifehack",
  "Career 101",
  "Justnow",
  "Software Developers",
  "Cyber Security",
  "Politics",
  "Warfare",
  "Catholic Church",
  "Investment",
];

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
      const profilePicture = handle === "maduekwepedro" ? "/images/ViewCrunch.webp" : user.photoURL || "/images/ViewCrunch.webp",
        profileCreated = user.metadata.creationTime,
        displayName = user.displayName.replace(/ViewCrunch_new-user_/g, "");

      await firebaseAdmin
        .firestore()
        .collection("profile")
        .doc(`@${handle}`)
        .set({
          profilePicture,
          about: "new Viewer and Writer",
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
          roles: { comment: true, vote: true, suspended: false, moderate: true, createCrunch: true },
          crunches: initialCrunches
            .map((title) => ({
              id: toId(title),
              roles: { publish: true, retouch: true, moderate: handle === "maduekwepedro" ? true : false },
            }))
            .reduce((acc, cur) => ({ ...acc, [cur.id]: cur.roles }), {}),
          favourite: [],
          blacklist: [],
          published: [],
          chat: {
            followers: handle === "maduekwepedro" ? [] : ["@maduekwepedro"],
            blocked: [],
            following: handle === "maduekwepedro" ? [] : ["@maduekwepedro"],
          },
          social: {
            twitterHandle: handle,
            facebookHandle: handle,
            linkedinHandle: handle,
          },
          stat: {
            voteSent: 0,
            voteReceived: 0,
            audience: 0,
            profileCreated,
            seen: [],
            theme: handle === "maduekwepedro" ? "dark" : "light",
          },
        })
        .then(async () => {
          await firebaseAdmin
            .auth()
            .updateUser(uid, {
              displayName: `@${handle}`,
            })
            .then(async () => {
              for (const x of initialCrunches) {
                if (handle === "maduekwepedro") {
                  await firebaseAdmin
                    .firestore()
                    .collection("crunch")
                    .doc(toId(x))
                    .set({
                      title: x,
                      coverPicture: "/images/ViewCrunch-cover.webp",
                      primaryPicture: "/images/ViewCrunch.webp",
                      dateCreated: firebaseAdmin.firestore.Timestamp.now(),
                      about: `${x} was invented by Maduekwe Pedro for all`,
                      moderators: ["@maduekwepedro"],
                      followers: ["@maduekwepedro"],
                      inventor: ["@maduekwepedro"],
                    });
                }
                await firebaseAdmin
                  .firestore()
                  .collection("crunch")
                  .doc(toId(x))
                  .update({
                    followers: firebaseAdmin.firestore.FieldValue.arrayUnion(`@${handle}`),
                  })
                  .then()
                  .catch((error) => {
                    throw new TypeError(error);
                  });
              }
            })
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
