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
    let unseen = 0;

    for (const value of Object.values(profile.data().notification)) {
      unseen = unseen + (value.seen ? 0 : 1);
    }

    return { myID: uid, myTheme: profile.data()?.details?.theme, myNotification: unseen };
  } else {
    await profileRef.set({
      about: "",
      blacklist: [],
      following: [],
      followers: [],
      bookmarks: [],
      notification: {
        "About ViewCrunch: To understand more on what ViewCrunch is all about": {
          date: Timestamp.now(),
          href: "/info/about",
          seen: false,
          icon: "achievement",
        },
        "Terms and Conditions: Visit the link at the bottom of any page on ViewCrunch to read more on our Terms and Conditions": {
          date: Timestamp.now(),
          icon: "info",
          href: "/info/terms",
          seen: false,
        },
        "FAQ: Frequently Asked Question: To view frequently asked questions, check out our": {
          date: Timestamp.now(),
          href: "/info/faq",
          icon: "info",
          seen: false,
        },
        "Privacy Policy: Visit the link at the bottom of any page on ViewCrunch to read more on our Privacy Policy": {
          date: Timestamp.now(),
          href: "/info/privacy",
          icon: "info",
          seen: false,
        },
        "Advertise: You have a product or service, you want to advertise ViewCrunch": {
          date: Timestamp.now(),
          href: "/info/advertise",
          icon: "finance",
          seen: false,
        },
        "Contact Us, if you have a direct message for us, reach out to one of our agents": {
          date: Timestamp.now(),
          icon: "info",
          href: "/info/contactus",
          seen: false,
        },
        "It is with great joy in our heart, that we welcome you to ViewCrunch: Views and Crunches": {
          date: Timestamp.now(),
          icon: "info",
          seen: false,
        },
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
