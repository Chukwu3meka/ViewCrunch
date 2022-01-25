const newsRef = firestore.collection("news");
const viewRef = firestore.collection("view");
const crunchRef = firestore.collection("crunch");
const profileRef = firestore.collection("profile");

import * as db from "@source/tempdb";
import firebase, { firestore } from "@utils/firebaseClient";
import { range, toId, shortNumber, refToPath, dateCalculator } from "@utils/clientFunctions";

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
      return null;
    });
};

export const fetchCrunches = async (handle) => {
  if (!handle) return { error: true };

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
          // console.log({ crunches: error });
        })),
    };

    crunches.push(crunch);
  }

  return { crunches, myFollowing, error: false };
};

export const fetchCrunch = async (viewscapeId) => {
  console.log("needs editing");
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
};

export const fetchProfileData = async (handle) => {
  const viewerData = await fetchProfile(handle);
  if (!viewerData?.displayName) return { error: "authorId is invalid" };

  const published = [];
  for (const [key, value] of Object.entries(viewerData?.published)) {
    published.push({ ref: key, ...value, date: value.date.toDate().toDateString(), path: refToPath(key) });
  }

  viewerData.handle = handle;
  viewerData.published = published;
  viewerData.stat.profileCreated = viewerData.stat.profileCreated.toDate().toDateString();

  const viewerHistoryFunc = () => {
    const totalView = viewerData.published.length - 1;

    if (viewerData.published.length) {
      const sortDate = [...viewerData.published].sort((a, b) => new Date(a.date) - new Date(b.date)),
        sortUpvote = [...viewerData.published].sort((a, b) => b.upvote - a.upvote),
        sortDownvote = [...viewerData.published].sort((a, b) => b.downvote - a.downvote);

      return {
        date1: {
          path: sortDate[0].path,
          label: `${sortDate[0].title} published ${sortDate[0].date}`,
        },
        date2: {
          path: sortDate[totalView].path,
          label: `${sortDate[totalView].date} published ${sortDate[totalView].title}`,
        },
        upvote1: {
          path: sortUpvote[0].path,
          label: `${sortUpvote[0].title} @ ${shortNumber(sortUpvote[0].upvote)}`,
        },
        upvote2: {
          path: sortUpvote[totalView].path,
          label: `${sortUpvote[totalView].title} @ ${shortNumber(sortUpvote[totalView].upvote)}`,
        },
        downvote1: {
          path: sortDownvote[0].path,
          label: `${sortDownvote[0].title} @ ${shortNumber(sortDownvote[0].downvote)}`,
        },
        downvote2: {
          path: sortDownvote[totalView].path,
          label: `${sortDownvote[totalView].title} @ ${shortNumber(sortDownvote[totalView].downvote)}`,
        },
      };
    } else {
      const emptyHistory = { path: null, label: null };
      return {
        date1: emptyHistory,
        date2: emptyHistory,
        upvote1: emptyHistory,
        upvote2: emptyHistory,
        downvote1: emptyHistory,
        downvote2: emptyHistory,
      };
    }
  };
  viewerData.viewerHistory = await viewerHistoryFunc();

  return { viewerData };
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

export const fetchHomeViews = async ({ crunch, blacklist }) => {
  const newsFlash = await newsRef
    .orderBy("date", "desc")
    .limit(3)
    .get()
    .then((querySnapshot) => {
      const tempArray = [];

      for (const doc of querySnapshot.docs) {
        const { flash, date } = doc.data();
        tempArray.push({
          newsLink: doc.id,
          flash: flash?.split("@@@")[0],
          date: date.toDate().toDateString(),
        });
      }

      return tempArray;
    })
    .catch((error) => {
      // console.log({ news: error });
      return { error: "Server unable to fetch view" };
    });

  const primary = [];
  await viewRef
    .where("crunch", "array-contains-any", crunch)
    .where("visible.status", "==", true)
    .where("title.length", ">=", 10)
    .orderBy("title.length")
    .orderBy("date", "desc")
    .orderBy("title.path")
    .limit(3)
    .get()
    .then(async (documentSnapshots) => {
      if (documentSnapshots?.docs?.length) {
        for (const doc of documentSnapshots.docs) {
          const {
            title: { data: title, path },
            date,
            author,
            crunch,
            pryImage,
          } = doc.data();

          if (!blacklist.includes(path)) {
            blacklist.push(path);
            const { displayName, profilePicture } = await fetchProfile(author);

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
      }
    })
    .catch((error) => {
      return { error: "Server unable to fetch view" };
      // console.log({ primary: error });
    });

  const highlight = [];
  await viewRef
    .where("crunch", "array-contains-any", crunch)
    .where("visible.status", "==", true)
    .where("title.length", "==", 3)
    .orderBy("date", "desc")
    .orderBy("title.path")
    .limit(3)
    .get()
    .then(async (documentSnapshots) => {
      if (documentSnapshots?.docs?.length) {
        for (const doc of documentSnapshots.docs) {
          const {
            title: { data: title, path },
            upvote: { length: upvote },
            pryImage,
          } = doc.data();

          if (!blacklist.includes(path)) {
            blacklist.push(path);

            highlight.push({ title, pryImage, upvote, path });
          }
        }
      }
    })
    .catch((error) => {
      return { error: "Server unable to fetch view" };
      // console.log({ highlight: error });
    });

  return { highlight, newsFlash, primary };
};

export const oldfetchViews = async ({ myHandle, crunch, lastVisible, blacklist = [] }) => {
  const secondary = [],
    profile = myHandle ? await fetchProfile(myHandle) : null;

  if (profile) {
    if (!crunch && typeof profile.crunches === "object") {
      const crunches = [];
      for (const [key] of Object.entries(profile.crunches)) {
        crunches.push(key);
      }
      crunch = crunches;
      blacklist = [];
      profile.blacklist.map((x) => blacklist.push(x.url));
    }
  }

  if (!crunch) {
    crunch = [
      "universal",
      "lifehack",
      "career-101",
      "justnow",
      "software-developers",
      "cyber-security",
      "politics",
      "warfare",
      "catholic-church",
      "investment",
    ];
  }

  const initialReq =
    lastVisible === "initial request" ? await fetchHomeViews({ crunch, blacklist }) : { initialReq: "request is empty" };

  if (initialReq?.error) return { error: "Unable to fetch primary data" };

  let i = 0;
  const ref = await viewRef
    .where("crunch", "array-contains-any", crunch)
    .where("visible.status", "==", true)
    .orderBy("date", "desc")
    .orderBy("title.path");

  while (secondary.length < 3 && lastVisible && i < 2) {
    i++;
    await (lastVisible && lastVisible !== "initial request"
      ? ref
          .startAfter(firebase.firestore.Timestamp.fromDate(new Date(JSON.parse(lastVisible.date)), lastVisible.path))
          .limit(3 - secondary.length)
      : ref.limit(5)
    )
      .get()
      .then(async (documentSnapshots) => {
        if (!documentSnapshots?.docs?.length) return (lastVisible = "last view");

        lastVisible = {
          date: JSON.stringify(documentSnapshots.docs[documentSnapshots.docs.length - 1].data().date.toDate()),
          path: documentSnapshots.docs[documentSnapshots.docs.length - 1].data().title.path,
        };

        for (const doc of documentSnapshots.docs) {
          const {
            title: { data: title, path },
            author,
            crunch,
            pryImage,
            content,
            upvote: { length: upvote },
          } = doc.data();

          if (!blacklist.includes(path)) {
            blacklist.push(path);
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
      })
      .catch((error) => {
        return { error: "Server unable to fetch view" };
        // console.log({ secondary: error });
      });
  }

  return { ...initialReq, crunch, blacklist, secondary, lastVisible };
};

export const fetchViews = async ({ handle, blacklist, lastVisible }) => {
  if (!blacklist) {
    blacklist = await fetchProfile(handle).blacklist;
  }

  const ref = viewRef.where("visible.status", "==", true).orderBy("stat.date", "desc");

  const views = await (lastVisible
    ? ref
        .startAfter(firebase.firestore.Timestamp.fromDate(new Date(JSON.parse(lastVisible.date)), lastVisible.title))
        .limit(5 - secondary.length)
    : ref.limit(7)
  )
    .get()
    .then(async (snapshot) => {
      if (!snapshot?.docs?.length) return (lastVisible = "last view");

      const views = [];

      if (snapshot.docs?.length) {
        for (const doc of snapshot.docs) {
          const {
            title,
            content,
            stat: { author, crunch, date, readTime, keyword, image, viewLink },
          } = doc.data();

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

        return views;
      }
    })
    .catch((err) => {
      // console.log(err);
      throw err;
    });

  return { lastVisible, views, blacklist };
};

export const fetchViewForRetouch = async ({ ref, myHandle }) => {
  try {
    const [, author] = ref.split("@");
    if (`@${author}` !== myHandle) return { error: "View belongs to someone else" };

    const view = await viewRef
      .doc(ref)
      .get()
      .then((snapshot) => {
        if (snapshot.exists) return snapshot.data();
        throw new TypeError("snapshot does not exist");
      })
      .catch((err) => {
        throw new TypeError(err);
      });

    if (!view) return { error: "Unable to locate view" };
    const {
      crunch,
      content,
      keywords,
      description,
      title: { data: title },
    } = view;

    return { content, title, description, keywords, crunch: crunch[0] };
  } catch (err) {
    // console.log(err);
    return { error: "Error fetching view" };
  }
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
