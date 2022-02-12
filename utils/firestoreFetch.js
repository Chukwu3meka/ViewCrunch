import { collection, query, where, doc, getDoc, getDocs, orderBy, limit, startAfter, Timestamp } from "firebase/firestore";

import { firestore } from "@utils/firebaseClient";

import { range, toId, dateCalculator } from "@utils/clientFunctions";

const viewRef = collection(firestore, "view");
const crunchRef = collection(firestore, "crunch");

const errorProp = (code = 404, title = "Page not found") => ({
  error: { code, title },
});

export const fetchProfile = async (uid) => {
  try {
    const profileRef = doc(firestore, "profile", uid);
    const snapshot = await getDoc(profileRef);

    if (snapshot.exists()) return snapshot.data();

    return null;
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.log(error);
    return null;
  }
};

export const fetchHomeData = async () => {
  try {
    const trending = [];
    const trendingSnapshot = await getDocs(
      query(viewRef, where("status.data", "==", "visible"), orderBy("votes.total", "desc"), orderBy("stat.date", "desc"), limit(6))
    );

    if (trendingSnapshot.size) {
      for (const doc of trendingSnapshot.docs) {
        const {
          title,
          stat: { author, crunch, viewLink, date },
        } = doc.data();

        const {
          displayName,
          stat: { profileLink },
        } = await fetchProfile(author);

        trending.push({
          title,
          crunch,
          profileLink,
          displayName,
          viewLink: `/view/${viewLink}`,
          crunchLink: `/crunch/${doc.id}`,
          date: date.toDate().toDateString(),
        });
      }
    }

    const crunches = [];
    const crunchesSnapshot = await getDocs(query(crunchRef, where("suspended", "==", false), orderBy("date"), limit(13)));

    if (crunchesSnapshot.size) {
      for (const doc of crunchesSnapshot.docs) {
        const title = doc.data().title;
        crunches.push({
          title,
          link: `/crunch/${doc.id}`,
        });
      }
    }

    return { error: false, trending, crunches };
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.log(error);
    return errorProp(400, "Unable to fetch Data");
  }
};

export const fetchViews = async ({ handle, blacklist, lastVisible }) => {
  try {
    if (!blacklist && handle) {
      blacklist = await fetchProfile(handle)
        .then((x) => x.blacklist)
        .catch((e) => []);
    } else {
      blacklist = [];
    }

    const viewsSnapshot = await getDocs(
      lastVisible
        ? query(
            viewRef,
            where("status.data", "==", "visible"),
            orderBy("stat.date", "desc"),
            startAfter(Timestamp.fromDate(new Date(JSON.parse(lastVisible.date)), lastVisible.title)),
            limit(5)
          )
        : query(viewRef, where("status.data", "==", "visible"), orderBy("stat.date", "desc"), limit(7))
    );

    const views = [];

    if (viewsSnapshot.size) {
      for (const doc of viewsSnapshot.docs) {
        const {
          title,
          content,
          stat: { author, crunch, date, readTime, keyword, image, viewLink },
        } = doc.data();

        if (!blacklist.includes(author)) {
          const {
            displayName,
            profilePicture,
            stat: { profileLink },
          } = await fetchProfile(author);

          views.push({
            image,
            title,
            author,
            crunch,
            keyword,
            content,
            readTime,
            displayName,
            profileLink,
            profilePicture,
            viewLink: `/view/${viewLink}`,
            crunchLink: toId(`/crunch/${crunch}`),
            date: dateCalculator({ date: date.toDate().toDateString() }),
          });

          lastVisible = { title, date: JSON.stringify(date.toDate()) };
        }
      }
    } else {
      lastVisible = "last view";
    }

    return { lastVisible, views, blacklist };
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.log(error);
    return { lastVisible, views: null, blacklist };
  }
};

export const fetchView = async (viewLink) => {
  try {
    const viewSnapshot = await getDocs(query(viewRef, where("stat.viewLink", "==", viewLink), limit(1)));

    if (viewSnapshot.size) {
      const {
        comments,
        content,
        title,
        votes,
        stat: { author, crunch, date, image, keyword, readTime, viewLink, description },
      } = viewSnapshot.docs[0].data();

      const {
        about,
        displayName,
        profilePicture,
        social: { linkedinHandle, twitterHandle, facebookHandle },
        stat: { profileLink },
      } = await fetchProfile(author);

      return {
        pageData: {
          view: {
            comments,
            content,
            votes,
            title,
            author,
            crunch,
            crunchLink: toId(`/crunch/${crunch}`),
            date: date.toDate().toDateString(),
            image,
            keyword,
            readTime,
            description: description || title,
          },
          author: {
            about,
            author,
            displayName,
            profileLink,
            profilePicture,
            linkedinHandle,
            twitterHandle,
            facebookHandle,
          },
          viewID: viewLink?.split("-")[viewLink?.split("-").length - 1],
        },
      };
    } else {
      return errorProp(400, "Unable to fetch Data");
    }

    // const profileRef = doc(firestore, "profile", uid);
    // const snapshot = await getDoc(profileRef);

    // if (snapshot.exists()) return snapshot.data();

    // return null;

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
    //     }
    //   })
    //   .catch((e) => {
    //     // console.log(e);
    //     return { error: e };
    //   });
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.log(error);
    return { error: true };
  }
};
