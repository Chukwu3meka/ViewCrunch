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
          .doc("backup copy")
          .update({
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
              "Contact Us, if you have a direct messag for us, reach out to one of our agents": {
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
          });
      });

    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};
