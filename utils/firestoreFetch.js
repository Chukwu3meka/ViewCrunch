import { collection, query, where, doc, getDoc, getDocs, orderBy, limit, startAfter, Timestamp } from "firebase/firestore";

import { firestore } from "@utils/firebaseClient";

import { range, toId, dateCalculator, errorProp } from "@utils/clientFunctions";

const viewRef = collection(firestore, "view");
const crunchRef = collection(firestore, "crunch");

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
          details: { displayName, profileLink },
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

export const fetchViews = async ({ myID, blacklist, lastVisible, initialFetch }) => {
  try {
    let bookmarks;

    if (initialFetch && myID) {
      const profile = await fetchProfile(myID)
        .then((x) => x)
        .catch((e) => {
          throw "wrong user ID";
        });

      blacklist = profile.blacklist;
      bookmarks = profile.bookmarks;
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
            picture: { profile: profilePicture },
            details: { profileLink, displayName },
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
            viewID: viewLink.split("-")[viewLink.split("-").length - 1],
            date: dateCalculator({ date: date.toDate().toDateString() }),
          });

          lastVisible = { title, date: JSON.stringify(date.toDate()) };
        }
      }
    } else {
      lastVisible = "last view";
    }

    return { lastVisible: lastVisible || "lastview", views, blacklist, bookmarks };
  } catch (error) {
    console.log(error);

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
        picture: { profile: profilePicture },
        details: {
          about,
          displayName,
          profileLink,
          social: { linkedin, twitter, facebook },
        },
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
            twitter,
            linkedin,
            facebook,
            displayName,
            profileLink,
            profilePicture,
          },
          viewID: viewLink?.split("-")[viewLink?.split("-").length - 1],
        },
      };
    } else {
      return errorProp(400, "Unable to fetch Data");
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") console.log(error);
    return { error: true };
  }
};
