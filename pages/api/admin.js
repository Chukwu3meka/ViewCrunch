import { toId } from "@utils/clientFunctions";
import { firestore } from "@utils/firebaseServer";

import { FieldValue, Timestamp } from "firebase-admin/firestore";

export default async (req, res) => {
  try {
    if (process.env.NODE_ENV !== "development") throw new TypeError("authentication failed");

    // keywords / description;

    // await firestore
    //   .collection("view")
    //   .get()
    //   .then(async (snap) => {
    //     for (const doc of snap.docs) {
    //       await firestore.collection("view").doc(doc.id).update({
    //         "status.moderator": "zqWXUjfcFXPGKzgN3HCvoFuOz043",
    //         "stat.author": "zqWXUjfcFXPGKzgN3HCvoFuOz043",
    //       });
    //     }
    //   });

    await firestore
      .collection("profile")
      .doc("zqWXUjfcFXPGKzgN3HCvoFuOz043")
      .get()
      .then(async (snap) => {
        const doc = snap.data();

        await firestore
          .collection("profile")
          .doc(snap.id)
          .update({
            "notification.unread": 5,

            "notification.messages": [
              {
                message: "About ViewCrunch: To understand more on what ViewCrunch is all about",
                date: Timestamp.now(),
                href: "/info/about",
                seen: false,
                icon: "achievement",
              },
              {
                date: Timestamp.now(),
                message:
                  "Terms and Conditions: Visit the link at the bottom of any page on ViewCrunch to read more on our Terms and Conditions",
                icon: "info",
                href: "/info/terms",
                seen: false,
              },
              {
                date: Timestamp.now(),
                message: "FAQ: Frequently Asked Question: To view frequently asked questions, check out our",
                href: "/info/faq",
                icon: "info",
                seen: false,
              },
              {
                date: Timestamp.now(),
                message: "Privacy Policy: Visit the link at the bottom of any page on ViewCrunch to read more on our Privacy Policy",
                href: "/info/privacy",
                icon: "info",
                seen: false,
              },
              {
                date: Timestamp.now(),
                message: "Advertise: You have a product or service, you want to advertise ViewCrunch",
                href: "/info/advertise",
                icon: "finance",
                seen: false,
              },
              {
                date: Timestamp.now(),
                message: "Contact Us, if you have a direct messag for us, reach out to one of our agents",
                icon: "info",
                href: "/info/contactus",
                seen: false,
              },
              {
                date: Timestamp.now(),
                message: "It is with great joy in our heart, that we welcome you to ViewCrunch: Views and Crunches",
                icon: "info",
                seen: false,
              },
            ],
          });
      });

    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
