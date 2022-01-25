const viewRef = firestore.collection("view");
const crunchRef = firestore.collection("crunch");
const profileRef = firestore.collection("profile");

import firebase, { firestore } from "@utils/firebaseClient";
import { range, toId, dateCalculator } from "@utils/clientFunctions";

export const fetchProfile = async (handle) => {
  return await profileRef
    .doc(handle)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) return snapshot.data();
      throw "author not found";
    })
    .catch((error) => {
      return null;
    });
};

export const fetchView = async ({ author, view: id, myHandle }) => {
  const view = toId(author, id),
    authorData = await fetchProfile(author);

  if (!authorData) return { error: "Author does not exist" };
  if (authorData.suspended) return { error: "Author is suspended" };

  const {
    about,
    published,
    displayName,
    profilePicture,
    social: { linkedinHandle, twitterHandle, facebookHandle },
  } = authorData;

  const full_view = await viewRef
    .doc(view)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) return snapshot.data();
      return { error: "View not found" };
    })
    .catch((error) => {
      return { error: "View not found" };
      // console.log(error);
    });

  if (full_view.error) return { error: "View does not exist" };

  const {
    crunch,
    title: { data: title, path },
    date,
    content,
    pryImage,
    // comments: commentsList,
    upvote,
    downvote,
    description,
    keywords,
  } = full_view;

  if (!full_view.visible.status && full_view.visible.moderator !== "ViewCrunch" && full_view.visible.data !== "just published")
    return { error: "View is hidden" };

  if (author !== full_view.author) return { error: "Wrong Author specified" };

  // const comments = [];
  // if (commentsList?.length) {
  //   for (const { author, comment, date } of commentsList) {
  //     const { displayName, profilePicture } = db.viewer?.find((x) => x.handle === author);
  //     comments.push({ comment, date, displayName, profilePicture });
  //   }
  // }

  const featuredPost1 = [];
  for (const [key, value] of Object.entries(published)) {
    featuredPost1.push({ title: value.title, id: key });
  }
  const featuredPost2 = featuredPost1.filter((x) => x.id !== view),
    featuredPost3 = [
      featuredPost2?.length && featuredPost2.splice(range(0, featuredPost2.length - 1), 1),
      featuredPost2?.length && featuredPost2.splice(range(0, featuredPost2.length - 1), 1),
    ]
      .flat(Infinity)
      .map(({ title, id }) => ({ title, id: `/${id.split("@").join("/")}`.replace("//", "/@") }));

  const data = {
    id: view,
    path,
    title,
    content,
    pryImage,
    description,
    keywords,
    crunch: crunch[0],
    comments: [],
    date: date.toDate().toDateString(),
    upvote,
    downvote,
    author: {
      about,
      author,
      displayName,
      twitterHandle,
      profilePicture,
      linkedinHandle,
      facebookHandle,
    },
    post: {
      featuredPost: featuredPost3,
      similarPost: [],
    },
  };

  if (myHandle) {
    const profile = await fetchProfile(myHandle);

    data.viewer = profile
      ? {
          blacklist: profile?.blacklist,
          viewInFavourite: profile?.favourite?.find((x) => x.url === path) ? true : false,
          viewInBlacklist: profile?.blacklist?.find((x) => x.url === path) ? true : false,
        }
      : {};
  }

  await viewRef
    .where("crunch", "array-contains-any", crunch)
    .where("visible.status", "==", true)
    .orderBy("date", "desc")
    .limit(5)
    .get()
    .then((snapshot) => {
      if (!snapshot?.docs?.length) return;

      for (const doc of snapshot.docs) {
        // const id = doc.id,
        const {
          author,
          title: { data: title, path: id },
          pryImage,
        } = doc.data();

        if (data.post.similarPost.length < 3 || data.viewer.blacklist.some((x) => x.title !== title)) {
          data.post.similarPost.push({ author, title, pryImage, id });
        }
      }
    })
    .catch((err) => {
      // console.log(err);
      return { error: "View has issues" };
    });

  data.post.similarPost = data.post.similarPost.filter((x) => x.id !== `/${view.split("@").join("/")}`.replace("//", "/@"));

  if (!data) return { error: "Error occured while fetching data" };
  const advert = {
    company: "SoccerMASS",
    description: "No. 1 free competitive online Soccer Manager game, with added tactics and realistic transfer.",
    image: `/images/ads/soccermass.webp`,
    href: "https://www.soccermass.com",
  };

  return {
    view: data,
    advert,
  };
};

export const fetchViews = async ({ handle, blacklist, lastVisible }) => {
  if (!blacklist && handle) {
    blacklist = await fetchProfile(handle)
      .then((x) => x.blacklist)
      .catch((e) => []);
  } else {
    blacklist = [];
  }

  const ref = viewRef.where("visible.status", "==", true).orderBy("stat.date", "desc");

  const views = await (lastVisible
    ? ref.startAfter(firebase.firestore.Timestamp.fromDate(new Date(JSON.parse(lastVisible.date)), lastVisible.title)).limit(5)
    : ref.limit(7)
  )
    .get()
    .then(async (snapshot) => {
      const views = [];
      if (snapshot.docs?.length) {
        for (const doc of snapshot.docs) {
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
              viewLink,
              readTime,
              displayName,
              profileLink,
              profilePicture,
              date: dateCalculator({ date: date.toDate().toDateString() }),
              crunchLink: `/crunch/${toId(crunch)}`,
            });

            // console.log();
            lastVisible = { title, date: JSON.stringify(date.toDate()) };
          }
        }

        return views;
      } else {
        lastVisible = "last view";
        return null;
      }
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });

  return { lastVisible, views, blacklist };
};

export const fetchTrending = async () => {
  const trending = [];
  await viewRef
    .where("visible.status", "==", true)
    .orderBy("upvote.votes", "desc")
    .orderBy("stat.date", "desc")
    .limit(6)
    .get()
    .then(async (documentSnapshots) => {
      if (documentSnapshots?.docs?.length) {
        for (const doc of documentSnapshots.docs) {
          const {
            title,
            stat: { author, crunch, link, date },
          } = doc.data();

          const {
            displayName,
            stat: { profileLink },
          } = await fetchProfile(author);

          trending.push({
            link,
            title,
            crunch,
            profileLink,
            displayName,
            crunchLink: `/crunch/${crunch}`,
            date: date.toDate().toDateString(),
            image: "/images/ViewCrunch-cover.webp",
          });
        }
      } else {
        throw "No document found";
      }
    })
    .catch((error) => {
      // console.log({ error });
      return { error: "Server unable to fetch view" };
    });

  return { trending };
};

export const fetchNavCrunches = async () => {
  try {
    const snapshot = await crunchRef.orderBy("dateCreated").get();

    const last = snapshot.docs[range(0, snapshot.docs.length - 5)];

    const crunches = await crunchRef
      .orderBy("dateCreated")
      .startAfter(last.data().dateCreated)
      .limit(13)
      .get()
      .then((snapshot) => {
        const crunches = [];
        for (const doc of snapshot.docs) {
          const title = doc.data().title;
          crunches.push({
            title,
            link: `/crunch/${`${title}-${doc.id}`.replace(/ /g, "-").toLowerCase()}`,
          });
        }
        return crunches;
      })
      .catch((e) => {
        throw e;
      });

    return { crunches, error: false };
  } catch (error) {
    return { error: true };
  }
};
