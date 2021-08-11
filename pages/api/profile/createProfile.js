import { toId } from "@utils/clientFunctions";
import firebaseAdmin from "@utils/firebaseServer";

const initialCrunches = [
  "Justnow",
  "Warfare",
  "Politics",
  "Lifehack",
  "Universal",
  "Career 101",
  "Investment",
  "Catholic Church",
  "Cyber Security",
  "Software Developers",
];

const createProfileHandler = async ({ handle, myRefresh }) => {
  const { access_token: token } = await fetch(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/x-www-form-urlencoded" }),
    body: `grant_type=refresh_token&refresh_token=${myRefresh}`,
    credentials: "same-origin",
  }).then((res) => res.json());

  console.log({ token });

  const uid = await firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => decodedToken?.uid);

  console.log({ uid });

  await firebaseAdmin
    .auth()
    .getUser(uid)
    .then(async (user) => {
      console.log({ user });
      const profilePicture = handle === "maduekwepedro" ? "/images/ViewCrunch-cover.webp" : user.photoURL || "/images/ViewCrunch.webp",
        profileCreated = user.metadata.creationTime,
        displayName = user.providerData[0].displayName;
      // displayName = user.displayName.replace(/ViewCrunch_new-user_/g, "");

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
              link: "/info/about",
              title: "About ViewCrunch",
            },
            {
              body: "Visit the link at the bottom of any page on ViewCrunch to read more on our terms and conditions",
              link: "/info/terms",
              title: "Terms and Conditions",
            },
            {
              body: "Visit the link at the bottom of any page on ViewCrunch to read more on our privacy policy",
              link: "/info/privacy",
              title: "Privacy Policy",
            },
            {
              body: "To view frequently asked questions, check out our FAQ",
              link: "/info/faq",
              title: "FAQ: Frequently Asked Question",
            },
            { body: "Have a product or service to advertise on ViewCrunch", link: "/info/advertise", title: "Advertise" },
            { body: "Contact us here", link: "/info/contactus", title: "Contact Us" },
          ],
          roles: { comment: true, vote: true, suspended: false, moderate: true, createCrunch: true },
          crunches: initialCrunches
            .map((title) => ({
              id: toId(title),
              roles: { publish: true, retouch: true, moderate: handle === "maduekwepedro" ? true : false },
            }))
            .reduce((acc, cur) => ({ ...acc, [cur.id]: cur.roles }), {}),
          favourite: [
            { link: "/info/advertise", title: "Have a product or service to advertise on ViewCrunch" },
            { link: "/info/contactus", title: "Make suggestions here, or reach out to our team" },
          ],
          blacklist: [],
          published: {},
          chat: {
            followers: handle === "maduekwepedro" ? [] : ["@maduekwepedro"],
            blocked: [],
            following: handle === "maduekwepedro" ? [] : ["@maduekwepedro"],
          },
          social: {
            twitterHandle: handle,
            facebookHandle: handle,
            linkedinHandle: handle,
            website: `https://viewcrunch.com/${handle}`,
          },
          stat: {
            profileCreated: firebaseAdmin.firestore.Timestamp.fromDate(new Date(JSON.parse(profileCreated))),
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
                    throw new TypeError(`catch 1${error}`);
                  });
              }
            })
            .catch((error) => {
              throw new TypeError(`catch 2${error}`);
            });
        })
        .catch((error) => {
          throw new TypeError(`catch 3${error}`);
        });
    });
};

export default async (req, res) => {
  try {
    const { handle, myRefresh } = req.body;
    console.log({ handle, myRefresh });
    if (handle === "maduekwepedro") throw new TypeError("Reserved handle");
    await createProfileHandler({ handle, myRefresh });
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
