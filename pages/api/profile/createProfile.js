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
    const { details, notifications } = profile.data();
    return { myID: uid, myTheme: details?.theme, myNotification: notifications?.length };
  } else {
    await profileRef.set({
      about: "",
      blacklist: [],
      following: [],
      followers: [],
      bookmarks: [],
      notification: {
        messages: [],
        unread: 0,
      },
      picture: { cover: photoURL, profile: photoURL },
      crunches: ["Lifehack", "Universal", "Career 101", "Finance", "Cyber Security", "Developers"],
      details: {
        displayName,
        theme: "light",
        profileCreated: Timestamp.now(),
        profileLink: toId(`${displayName}-${uid}`),
        social: {
          twitter: null,
          website: null,
          facebook: null,
          linkedin: null,
        },
      },
      status: {
        vote: true,
        comment: true,
        moderate: true,
        suspended: false,
        createCrunch: true,
        viewCrunchAdmin: false,
        viewCrunchSuperAdmin: false,
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
