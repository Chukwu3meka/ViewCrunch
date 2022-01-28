import { firestore } from "@utils/firebaseClient";
import { collection, query, where, doc, getDoc, getDocs, orderBy, limit } from "firebase/firestore";

import { range, toId, dateCalculator } from "@utils/clientFunctions";

const viewCollection = collection(firestore, "view");
const crunchCollection = collection(firestore, "crunch");
const profileCollection = collection(firestore, "profile");

export const fetchProfile = async (handle) => {
  //   return await profileCollection
  //     .doc(handle)
  //     .get()
  //     .then((snapshot) => {
  //       if (snapshot.exists) return snapshot.data();
  //       throw "author not found";
  //     })
  //     .catch((error) => {
  //       return null;
  //     });
};

export const fetchHomeData = async () => {
  const trending = [];

  const snapshot = await getDocs(
    query(
      viewCollection,
      where("moderation.visible.status", "==", true),
      orderBy("votes.total", "desc"),
      orderBy("stat.date", "desc"),
      limit(6)
    )
  );

  console.log("snapshot", snapshot.size);

  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });

  // await viewCollection
  //   .where("moderation.visible.status", "==", true)
  //   .orderBy("votes.total", "desc")
  //   .orderBy("stat.date", "desc")
  //   .limit(6)
  //   .get()
  //   .then(async (snapshot) => {
  //     if (snapshot.size) {
  //       for (const doc of snapshot.docs) {
  //         const {
  //           title,
  //           stat: { author, crunch, viewLink, date },
  //         } = doc.data();

  //         const {
  //           displayName,
  //           stat: { profileLink },
  //         } = await fetchProfile(author);

  //         trending.push({
  //           viewLink,
  //           title,
  //           crunch,
  //           profileLink,
  //           displayName,
  //           crunchLink: `/crunch/${crunch}`,
  //           date: date.toDate().toDateString(),
  //         });
  //       }
  //     } else {
  //       throw "No document found";
  //     }
  //   })
  //   .catch((error) => {
  //     // console.log({ error });
  //     return { error: "Server unable to fetch view" };
  //   });

  // const snapshot = await crunchCollection.orderBy("dateCreated").get();

  // const last = snapshot.docs[range(0, snapshot.docs.length - 5)].data();

  // const crunches = await crunchCollection
  //   .orderBy("dateCreated")
  //   .startAfter(last.dateCreated)
  //   .limit(13)
  //   .get()
  //   .then((snapshot) => {
  //     const crunches = [];
  //     if (snapshot.size) {
  //       for (const doc of snapshot.docs) {
  //         const title = doc.data().title;
  //         crunches.push({
  //           title,
  //           link: `/crunch/${`${title}-${doc.id}`.replace(/ /g, "-").toLowerCase()}`,
  //         });
  //       }
  //     }
  //     return crunches;
  //   })
  //   .catch((e) => {
  //     console.log(e);
  //     return { error: "Server unable to fetch view" };
  //   });

  return { error: true, trending: [], crunches: [] };
};

// export const fetchViews = async ({ handle, blacklist, lastVisible }) => {
//   if (!blacklist && handle) {
//     blacklist = await fetchProfile(handle)
//       .then((x) => x.blacklist)
//       .catch((e) => []);
//   } else {
//     blacklist = [];
//   }

//   const ref = viewCollection.where("moderation.visible.status", "==", true).orderBy("stat.date", "desc");

//   const views = await (lastVisible
//     ? ref.startAfter(firebase.firestore.Timestamp.fromDate(new Date(JSON.parse(lastVisible.date)), lastVisible.title)).limit(5)
//     : ref.limit(7)
//   )
//     .get()
//     .then(async (snapshot) => {
//       const views = [];
//       if (snapshot.size) {
//         for (const doc of snapshot.docs) {
//           const {
//             title,
//             content,
//             stat: { author, crunch, date, readTime, keyword, image, viewLink },
//           } = doc.data();

//           if (!blacklist.includes(author)) {
//             const {
//               displayName,
//               profilePicture,
//               stat: { profileLink },
//             } = await fetchProfile(author);

//             views.push({
//               image,
//               title,
//               author,
//               crunch,
//               keyword,
//               content,
//               viewLink,
//               readTime,
//               displayName,
//               profileLink,
//               profilePicture,
//               date: dateCalculator({ date: date.toDate().toDateString() }),
//               crunchLink: toId(`/crunch/${crunch}`),
//             });

//             // console.log();
//             lastVisible = { title, date: JSON.stringify(date.toDate()) };
//           }
//         }

//         return views;
//       } else {
//         lastVisible = "last view";
//         return null;
//       }
//     })
//     .catch((err) => {
//       // console.log(err);
//       throw err;
//     });

//   return { lastVisible, views, blacklist };
// };

export const fetchView = async ({ viewLink }) => {
  // const snapshot = await getDocs(query(viewCollection, where("stat.viewLink", "==", viewLink), limit(1)))[0];
  // console.log("snapshot");
  // querySnapshot.forEach((doc) => {
  //   // doc.data() is never undefined for query doc snapshots
  //   console.log(doc.id, " => ", doc.data());
  // });
  // return await viewCollection
  //   .where("stat.viewLink", "==", viewLink)
  //   .limit(1)
  //   .get()
  //   .then(async (snapshot) => {
  //     if (snapshot.size) {
  //       const {
  //         comments,
  //         content,
  //         title,
  //         votes,
  //         stat: { author, crunch, date, image, keyword, readTime, viewLink },
  //       } = snapshot.docs[0].data();
  //       const authorData = await fetchProfile(author);
  //       if (!authorData) return { error: "Author does not exist" };
  //       if (authorData.suspended) return { error: "Author is suspended" };
  //       const {
  //         about,
  //         displayName,
  //         profilePicture,
  //         social: { linkedinHandle, twitterHandle, facebookHandle },
  //         stat: { profileLink },
  //       } = authorData;
  //       return {
  //         pageData: {
  //           view: {
  //             comments,
  //             content,
  //             votes,
  //             title,
  //             author,
  //             crunch,
  //             crunchLink: toId(`/crunch/${crunch}`),
  //             date: date.toDate().toDateString(),
  //             image,
  //             keyword,
  //             readTime,
  //             viewLink,
  //           },
  //           author: {
  //             about,
  //             displayName,
  //             profileLink,
  //             profilePicture,
  //             linkedinHandle,
  //             twitterHandle,
  //             facebookHandle,
  //           },
  //         },
  //       };
  //     }
  //   })
  //   .catch((e) => {
  //     // console.log(e);
  //     return { error: e };
  //   });
};
