import { toId } from "@utils/clientFunctions";
import { firestore } from "@utils/firebaseServer";
import { Timestamp } from "firebase-admin/firestore";

const createProfileHandler = async ({ uid, displayName, photoURL, refreshToken }) => {
  const { access_token: token } = await fetch(
    `https://securetoken.googleapis.com/v1/token?key=${JSON.parse(process.env.NEXT_PUBLIC_CLIENT).apiKey}`,
    {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/x-www-form-urlencoded" }),
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      credentials: "same-origin",
    }
  ).then((res) => res.json());

  if (!token) throw "invalid cookie";

  const profileRef = firestore.collection("profile").doc(uid);
  const profile = await profileRef.get();

  if (profile.exists) {
    const doc = profile.data();
    return { myID: uid, myTheme: doc?.details?.theme, myNotification: doc?.notifications?.length };
  } else {
    await profileRef.set({
      blacklist: [],
      notifications: [],
      name: displayName,
      picture: { cover: photoURL, profile: photoURL },
      social: {
        twitter: null,
        website: null,
        facebook: null,
        linkedin: null,
        profileLink: toId(`/${displayName}-${uid}`),
      },
      details: {
        crunches: ["Lifehack", "Universal", "Career 101", "Finance", "Cyber Security", "Developers"],
        moderation: { comment: true, vote: true, suspended: false, moderate: true, createCrunch: true },
        profileCreated: Timestamp.now(),
        theme: "light",
      },
    });
    return { myID: uid, myTheme: "light", myNotification: 0 };
  }
};

export default async (req, res) => {
  try {
    const { uid, displayName, photoURL, refreshToken } = req.body;
    const profile = await createProfileHandler({ uid, displayName, photoURL, refreshToken });
    return res.status(200).json(profile);
  } catch (error) {
    // console.log(error);
    return res.status(401).json(null);
  }
};
