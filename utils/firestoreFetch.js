const newsRef = firestore.collection("news");
const viewRef = firestore.collection("view");
const crunchRef = firestore.collection("crunch");
const profileRef = firestore.collection("profile");

import * as db from "@source/tempdb";
import { firestore } from "@utils/firebaseClient";
import { range, toId, shortNumber, viewIdToPath } from "@utils/clientFunctions";

export const isHandleTaken = async (handle) => {
  return await profileRef
    .doc(handle)
    .get()
    .then((docSnapshot) => (docSnapshot.exists ? true : false))
    .catch((error) => {
      // console.log(error);
      return true;
    });
};

export const fetchProfile = async (handle) => {
  return profileRef
    .doc(handle)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) return snapshot.data();
      return null;
    })
    .catch((error) => {
      // console.log(error)
      return null;
    });
};

export const fetchCrunches = async (handle) => {
  const {
    crunches: myCrunches,
    chat: { following: myFollowing },
  } = await fetchProfile(handle);

  if (typeof myCrunches !== "object") return { error: true };

  const crunches = [];

  for (const [key, value] of Object.entries(myCrunches)) {
    const crunch = {
      id: key,
      roles: value,
      ...(await crunchRef
        .doc(key)
        .get()
        .then((snapshot) => ({
          ...snapshot.data(),
          dateCreated: snapshot.data().dateCreated.toDate().toDateString(),
        }))
        .catch((error) => {
          // console.log(error)
        })),
    };

    crunches.push(crunch);
  }

  return { crunches, myFollowing, error: false };
};

// export const fetchCrunch = async (viewscapeId) => {
//   const crunchDetails = {
//     id: `${viewscapeId.replace(/ /g, "-").toLowerCase()}`,
//     title: viewscapeId,
//     coverPicture: `/images/${range(0, 40)}.png`,
//     primaryPicture: `/images/${range(0, 40)}.png`,
//     members: range(700, 7000000),
//     dateCreated: db.date(),
//     about: `
//       Occaecat eu laboris in reprehenderit esse sit labore velit minim tempor exercitation dolore commodo. Cupidatat ex ex minim velit irure labore cillum cillum deserunt magna cillum. Mollit voluptate est culpa ex in dolor irure aute cupidatat labore tempor nostrud esse et. Quis labore ea velit do commodo culpa laboris aliqua veniam magna. Eu pariatur veniam aliquip est duis ullamco tempor anim. Adipisicing dolore ex aute anim anim ex incididunt cillum magna exercitation enim nostrud adipisicing.`,
//     moderators: db.name1.map((name) => `@${name.replace(/ /g, "_").toLowerCase()}`).slice(0, 3),
//     followers: db.name1.map((name) => `@${name.replace(/ /g, "_").toLowerCase()}`),
//   };

//   const views = db.view.map((x) => {
//     const {
//       content,
//       crunch,
//       pryImage,
//       author,
//       upvote: { length: upvote },
//       title: { data: title },
//     } = x;

//     const { displayName, profilePicture } = db.viewer?.find((x) => x.handle === author);

//     return {
//       title,
//       pryImage,
//       content,
//       crunch,
//       author,
//       upvote,
//       displayName,
//       profilePicture,
//     };
//   });

//   return { crunchDetails, views: views.slice(0, 7), propsLastVisible: 7, error: !crunchDetails || !views.length || null };
// };

export const fetchProfileData = async (handle) => {
  const viewerData = await fetchProfile(handle);
  // authorData.profileCreated = authorData.profileCreated.toDate().toDateString();
  if (!viewerData?.handle) return { error: "authorId is invalid" };

  // const articles = [];
  // await articleRef
  //   .where("authorId", "==", authorId)
  //   .get()
  //   .then((querySnapshot) => {
  //     for (const doc of querySnapshot.docs) {
  //       const id = doc.id,
  //         {
  //           title: { data: title },
  //           date,
  //           rating: { average: rating, length: ratingLength },
  //           view: { length: view },
  //           imageUrl,
  //         } = doc.data();

  //       articles.push({
  //         id,
  //         view,
  //         date,
  //         title,
  //         rating,
  //         imageUrl,
  //         ratingLength,
  //       });
  //     }
  //   })
  //   .catch(() => {});

  viewerData?.published?.forEach((x) => {
    // x.date = x.date.toDate().toDateString();
    x.id = `/${handle}/${toId(x?.title)}`;
  });

  viewerData.avgVote = Math.round(viewerData?.stat.voteReceived / viewerData?.published.length);
  viewerData.avgAudience = Math.round(viewerData?.stat.audience / viewerData?.published.length);
  viewerData.handle = handle;

  const viewerHistoryFunc = () => {
    const totalView = viewerData?.published.length - 1;

    if (totalView) {
      const sortDate = [...viewerData?.published].sort((a, b) => new Date(a.date) - new Date(b.date)),
        sortRating = [...viewerData?.published].sort((a, b) => b.upvote - a.upvote),
        sortViews = [...viewerData?.published].sort((a, b) => b.views - a.views);

      return {
        firstArticle: {
          link: `/${handle}/${toId(sortDate[0].title)}`,
          title: sortDate[0].title,
          // label: sortDate[0].date.toDate().toDateString(),
          label: sortDate[0].date,
        },
        lastArticle: {
          link: `/${handle}/${toId(sortDate[totalView].title)}`,
          title: sortDate[totalView].title,
          label: sortDate[totalView].date,
        },
        highestRating: {
          link: `/${handle}/${toId(sortRating[0].title)}`,
          title: `${sortRating[0].title} @ ${shortNumber(sortRating[0].upvote)}`,
        },
        leastRating: {
          link: `/${handle}/${toId(sortRating[totalView].title)}`,
          title: `${sortRating[totalView].title} @ ${shortNumber(sortRating[totalView].upvote)}`,
        },
        mostView: { link: `/${handle}/${toId(sortViews[0].title)}`, title: sortViews[0].title, label: sortViews[0].views },
        leastView: {
          link: `/${handle}/${toId(sortViews[totalView].title)}`,
          title: sortViews[totalView].title,
          label: sortViews[totalView].views,
        },
      };
    } else {
      const emptyHistory = { link: null, title: null, label: 0 };
      return {
        firstArticle: emptyHistory,
        lastArticle: emptyHistory,
        highestRating: emptyHistory,
        leastRating: emptyHistory,
        mostView: emptyHistory,
        leastView: emptyHistory,
      };
    }
  };

  return { viewerData, viewerHistory: await viewerHistoryFunc() };
};

export const fetchChat = async ({ handle }) => {
  const { followers: followersList, following: followingList, blocked: blockedList } = db.viewer?.find((x) => x.handle === handle).chat;

  const generateList = (list) =>
    list.map((handle) => {
      const { displayName, profilePicture, profession, published, coverPicture, about, social, stat } = db.viewer?.find(
        (x) => x.handle === handle
      );
      return { displayName, profilePicture, profession, published: published.length, coverPicture, about, social, stat, handle };
    });

  const followers = generateList(followersList),
    following = generateList(followingList),
    blocked = generateList(blockedList);

  return { followers, following, blocked };
};

export const fetchView = async ({ author, view: id, myHandle }) => {
  const view = toId(author, id),
    url = toId(`${author}/${id}`),
    authorData = await fetchProfile(author);

  console.log(authorData);

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

  const {
    crunch,
    title: { data: title },
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
    ].flat(Infinity);

  const data = {
    id: view,
    url,
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
          seen: profile?.stat?.seen,
          blacklist: profile?.blacklist,
          viewInFavourite: profile?.favourite?.find((x) => x.url === url) ? true : false,
          viewInBlacklist: profile?.blacklist?.find((x) => x.url === url) ? true : false,
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
        const id = doc.id,
          {
            author,
            title: { data: title },
            pryImage,
          } = doc.data();

        if (
          data.post.similarPost.length < 3 ||
          data.viewer.seen.some((x) => x.view !== id) ||
          data.viewer.blacklist.some((x) => x.title !== title)
        ) {
          data.post.similarPost.push({ author, title, pryImage, id });
        }
      }
    })
    .catch((error) => {
      // console.log(error);
    });

  data.post.similarPost = data.post.similarPost.filter((x) => x.id !== view);
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

export const fetchViews = async ({ myHandle, lastVisible, crunch = null, blacklist = [] }) => {
  console.log("0000", { lastVisible });

  const secondary = [],
    profile = myHandle && lastVisible !== "no other view" ? await fetchProfile(myHandle) : null;

  if (profile) {
    if (typeof profile.crunches === "object") {
      const crunches = [];

      for (const [key] of Object.entries(profile.crunches)) {
        crunches.push(key);
      }

      crunch = crunches;
      blacklist = profile.blacklist.map((x) => x.url);
    }
  }

  const secondaryRef = crunch
    ? await viewRef.where("crunch", "array-contains-any", crunch).where("visible.status", "==", true).orderBy("date", "desc")
    : await viewRef.where("visible.status", "==", true).orderBy("date", "desc");

  const getPrimary = async (querySnapshot) => {
    if (!querySnapshot?.docs?.length) return (lastVisible = "no other view");
    lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
    // lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1].ref.path;

    for (const doc of querySnapshot.docs) {
      const {
        title: { data: title },
        author,
        crunch,
        pryImage,
        content,
        upvote: { length: upvote },
      } = doc.data();

      const path = viewIdToPath(doc.id);

      if (!blacklist.includes(path)) {
        const { displayName, profilePicture } = await fetchProfile(author);

        secondary.push({
          crunch,
          content,
          title,
          pryImage,
          displayName,
          profilePicture,
          upvote,
          path,
        });
      }
    }
  };

  let i = 0;
  while (secondary.length < 4 && lastVisible !== "no other view" && i < 3) {
    i++;
    await (lastVisible ? secondaryRef.startAfter(lastVisible) : secondaryRef)
      .limit(5 - secondary.length)
      .get()
      .then(async (querySnapshot) => {
        await getPrimary(querySnapshot).catch((e) => {
          console.log(e);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }

  console.log("1111", { lastVisible });

  return {
    lastVisible: JSON.stringify(lastVisible),
    // lastVisible,
    // lastVisible: lastVisible.ref.path,
    secondary,
    crunch,
    blacklist,
  };
};

export const fetchHomeData = async ({ crunch, blacklist }) => {
  const primary = [],
    highlight = [];
  let lastVisible;

  const primaryRef = crunch
    ? await viewRef
        .where("crunch", "array-contains-any", crunch)
        .where("visible.status", "==", true)
        .where("title.length", ">=", 7)
        .orderBy("title.length")
        .orderBy("date", "desc")
    : await viewRef.where("visible.status", "==", true).where("title.length", ">=", 7).orderBy("title.length").orderBy("date", "desc");

  const getPrimary = async (querySnapshot) => {
    if (!querySnapshot?.docs?.length) {
      lastVisible = "no other view";
      return;
    }

    // lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1].ref.path;
    lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    for (const doc of querySnapshot.docs) {
      const {
        title: { data: title },
        date,
        author,
        crunch,
        pryImage,
      } = doc.data();

      const path = viewIdToPath(doc.id);

      if (!blacklist.includes(path)) {
        const { displayName, profilePicture } = await fetchProfile(author);

        blacklist.push(path);
        primary.push({
          title,
          date: date.toDate().toDateString(),
          crunch,
          path,
          pryImage,
          displayName,
          profilePicture,
          author,
        });
      }
    }
  };

  let i = 0;
  while (primary.length < 4 && lastVisible !== "no other view" && i < 4) {
    i++;
    await (lastVisible ? primaryRef.startAfter(lastVisible) : primaryRef)
      .limit(4 - primary.length)
      .get()
      .then(async (querySnapshot) => {
        await getPrimary(querySnapshot);
        //     ref(primaryRef, lastVisible)
        // export const ref = (docRef, lastVisible) => (lastVisible ? docRef.startAfter(lastVisible) : docRef).get();
      })
      .catch((e) => {
        // console.log(e);
      });
  }

  i = 0;
  lastVisible = undefined;

  const highlightRef = crunch
    ? await viewRef
        .where("crunch", "array-contains-any", crunch)
        .where("visible.status", "==", true)
        .where("title.length", "==", 3)
        .orderBy("date", "desc")
    : await viewRef.where("visible.status", "==", true).where("title.length", "==", 3).orderBy("date", "desc");

  const getHighlight = async (querySnapshot) => {
    if (!querySnapshot?.docs?.length) {
      lastVisible = "no other view";
      return;
    }

    // lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1].ref.path;
    lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];

    for (const doc of querySnapshot.docs) {
      const {
        title: { data: title },
        upvote: { length: upvote },
        pryImage,
      } = doc.data();

      const path = viewIdToPath(doc.id);

      if (!blacklist.includes(path)) {
        blacklist.push(path);
        highlight.push({ title, pryImage, upvote, path });
      }
    }
  };

  while (highlight.length < 3 && lastVisible !== "no other view" && i < 3) {
    i++;
    await await (lastVisible ? highlightRef.startAfter(lastVisible) : highlightRef)
      .limit(3 - highlight.length)
      .get()
      .then(async (querySnapshot) => {
        await getHighlight(querySnapshot);
        // ref(highlightRef, lastVisible)
      })
      .catch((e) => {
        // console.log(e);
      });
  }

  const newsFlash = await newsRef
    .orderBy("date", "desc")
    .limit(5)
    .get()
    .then((querySnapshot) => {
      const tempArray = [];

      for (const doc of querySnapshot.docs) {
        const { flash, source, newsLink, date } = doc.data();
        tempArray.push({ flash, source, newsLink, date: date.toDate().toDateString() });
      }

      return tempArray;
    })
    .catch((e) => null);

  return { highlight, newsFlash, primary };
};

// crunch = [
//   "universal",
//   "lifehack",
//   "career-101",
//   "justnow",
//   "software-developers",
//   "cyber-security",
//   "politics",
//   "warfare",
//   "catholic-church",
//   "investment",
// ],
// blacklist = [{ url: "ViewCrunch-blacklist", title: "ViewCrunch-blacklist" }],
