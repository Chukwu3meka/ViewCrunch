const newsRef = firestore.collection("news");
const viewRef = firestore.collection("view");
const crunchRef = firestore.collection("crunch");
const profileRef = firestore.collection("profile");

import * as db from "@source/tempdb";
import { firestore } from "@utils/firebaseClient";
import { ref, htmlToString, range, toId, shortNumber } from "@utils/clientFunctions";

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

export const fetchProfile = (handle) => {
  return profileRef
    .doc(handle)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) return snapshot.data();
      return [];
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

export const fetchArticles = async ({ limit = 5, navTag, lastVisible }) => {
  // const articles = [],
  //   docRef = navTag
  //     ? await articleRef
  //         .where("tag", "==", navTag)
  //         .orderBy("date", "desc")
  //         .limit(limit - articles.length)
  //     : await articleRef.orderBy("date", "desc").limit(limit - articles.length);

  // const getDocs = async (querySnapshot) => {
  //   if (!querySnapshot?.docs?.length) {
  //     lastVisible = "no other article";
  //     return;
  //   }
  //   // lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1].ref.path;
  //   lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
  //   for (const doc of querySnapshot.docs) {
  //     const articleId = doc.id,
  //       {
  //         markdown,
  //         imageUrl,
  //         authorId,
  //         view: { length: viewLength },
  //         title: { data: title },
  //       } = doc.data();

  //     const { handle, profilePicture } = await fetchAuthorData(authorId);
  //     if (!articlesRead.includes(articleId)) {
  //       articles.push({
  //         title,
  //         handle,
  //         authorId,
  //         imageUrl,
  //         markdown: await formatNavBarMarkdown({ markdown }),
  //         articleId,
  //         viewLength,
  //         profilePicture,
  //       });
  //     }
  //   }
  // };

  // let i = 1;

  // while (articles.length < limit && lastVisible !== "no other article" && i <= limit) {
  //   i++;
  //   await ref(docRef, lastVisible)
  //     .then(async (querySnapshot) => {
  //       await getDocs(querySnapshot);
  //     })
  //     .catch(() => {});
  // }
  // return { articles, propsArticlesRead: articlesRead, propsLastVisible: lastVisible };

  const articles = db.view.map((x) => {
    const {
      content,
      crunch,
      pryImage,
      author,
      upvote: { length: upvote },
      title: { data: title },
    } = x;

    const { displayName, profilePicture } = db.viewer?.find((x) => x.handle === author);

    return {
      title,
      pryImage,
      content,
      crunch,
      author,
      upvote,
      displayName,
      profilePicture,
    };
  });

  return { articles: articles.slice(0, limit), propsLastVisible: limit };
};

export const fetchArticle = async ({ author, viewId, myHandle }) => {
  const validAuthor = await isHandleTaken(author);
  if (!validAuthor) return { error: "Author does not exist" };

  const full_view = await viewRef
    .doc(viewId)
    .get()
    .then((snapshot) => {
      if (snapshot.exists) return snapshot.data();
      return { error: "View not found" };
    })
    .catch((error) => {
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

  if (!full_view.visible) return { error: "View is hidden" };
  if (author !== full_view.author) return { error: "Wrong Author specified" };

  const {
    displayName,
    profilePicture,
    social: { linkedinHandle, twitterHandle, facebookHandle },
    about,
    roles: { suspended },
    published,
  } = await fetchProfile(author);
  if (suspended) return { error: "Author is suspended" };

  // const comments = [];
  // if (commentsList?.length) {
  //   for (const { author, comment, date } of commentsList) {
  //     const { displayName, profilePicture } = db.viewer?.find((x) => x.handle === author);
  //     comments.push({ comment, date, displayName, profilePicture });
  //   }
  // }

  const featuredPost = [];
  const publishedViews = [];
  for (const [key, value] of Object.entries(published)) {
    publishedViews.push({ title: value.title, id: key });
  }

  publishedViews?.length && featuredPost.push(publishedViews[range(0, publishedViews.length - 1)]);
  publishedViews?.length > 1 && featuredPost.push(publishedViews[range(0, publishedViews.length - 1)]);

  const view = {
    id: toId(title),
    title,
    content,
    pryImage,
    description,
    keywords,
    crunch,
    comments: [],
    date: date.toDate().toDateString(),
    upvote,
    downvote,
    author: {
      author,
      displayName,
      profilePicture,
      about,
      linkedinHandle,
      twitterHandle,
      facebookHandle,
    },
    post: {
      featuredPost: featuredPost.filter((x) => x.id !== viewId).filter((v, i, a) => a.indexOf(v) === i),
      similarPost: [],
    },
  };

  if (myHandle) {
    const profile = await fetchProfile(myHandle);

    view.viewer = profile
      ? {
          seen: profile?.stat?.seen,
          blacklist: profile?.blacklist,
          viewInFavourite: profile?.blacklist?.includes(toId(title)) ? true : false,
          viewInBlacklist: profile?.favourite?.includes(toId(title)) ? true : false,
        }
      : {};
  }

  await viewRef
    .where("crunch", "==", crunch)
    .where("visible", "==", true)
    .orderBy("date", "desc")
    .limit(7)
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
          view.post.similarPost.length < 3 ||
          view.viewer.seen.some((x) => x.viewId !== id) ||
          view.viewer.blacklist.some((x) => x.title !== title)
        ) {
          view.post.similarPost.push({ author, title, pryImage, id });
        }
      }
    })
    .catch((error) => {
      // console.log(error);
    });

  view.post.similarPost = view.post.similarPost.filter((x) => x.id !== viewId);
  if (!view) return { error: "Error occured while fetching view" };

  const advert = {
    company: "SoccerMASS",
    description: "No. 1 free competitive online Soccer Manager game, with added tactics and realistic transfer.",
    image: `/images/ads/soccermass.webp`,
    href: "https://www.soccermass.com",
  };

  return {
    view,
    advert,
  };
};

export const fetchHomeData = async () => {
  // const newsFlash = [],
  //   highlight = [],
  //   quoteOfTheDay = {},
  //   primaryArticles = [];

  // await articleRef
  //   .where("title.length", ">=", 15)
  //   .orderBy("title.length")
  //   .orderBy("date", "desc")
  //   .limit(5)
  //   .get()
  //   .then(async (querySnapshot) => {
  //     for (const doc of querySnapshot.docs) {
  //       const articleId = doc.id,
  //         {
  //           title: { data: title },
  //           date,
  //           authorId,
  //           tag,
  //           imageUrl,
  //         } = doc.data();
  //       const { handle, profilePicture } = await fetchAuthorData(authorId);
  //       primaryArticles.push({ articleId, title, date: date.toDate().toDateString(), tag, imageUrl, handle, profilePicture });
  //     }
  //   });

  // await newsRef
  //   .orderBy("date", "desc")
  //   .limit(5)
  //   .get()
  //   .then((querySnapshot) => {
  //     for (const doc of querySnapshot.docs) {
  //       const { flash, source, newsLink, date } = doc.data();
  //       newsFlash.push({ flash, source, newsLink, date: date.toDate().toDateString() });
  //     }
  //   });

  // await articleRef
  //   .where("title.length", "==", 3)
  //   .orderBy("date", "desc")
  //   .limit(3)
  //   .get()
  //   .then((querySnapshot) => {
  //     for (const doc of querySnapshot.docs) {
  //       const articleId = doc.id,
  //         {
  //           title: { data: title },
  //           view: { length: viewLength },
  //           imageUrl,
  //         } = doc.data();
  //       highlight.push({ articleId, title, imageUrl, viewLength });
  //     }
  //   });

  // await quoteRef
  //   .limit(1)
  //   .get()
  //   .then((querySnapshot) => {
  //     for (const quote of querySnapshot.docs) {
  //       const { phrase, author } = quote.data();
  //       quoteOfTheDay.phrase = phrase;
  //       quoteOfTheDay.author = author;
  //     }
  //   });

  // return { highlight, newsFlash, primaryArticles, quoteOfTheDay };

  return {
    highlight: db.view
      .filter((x) => x.title.length === 3)
      .slice(0, 3)
      .map(({ author, title: { data: title }, upvote: { length: upvote }, pryImage }) => ({
        author,
        title,
        pryImage,
        upvote,
      })),

    newsFlash: db.news.map(({ flash, source, newsLink, date }) => ({ flash, source, newsLink, date })),

    primaryArticles: db.view
      .filter((x) => x.title.length >= 10)
      .slice(0, 4)
      .map((doc) => {
        const {
          title: { data: title },
          date,
          author,
          crunch,
          pryImage,
        } = doc;
        const { displayName, profilePicture } = db.viewer?.find((x) => x.handle === author);
        return { title, date, crunch, pryImage, displayName, profilePicture, author };
      }),
  };
};

// export const fetchViewscape = async (viewscapeId) => {
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
