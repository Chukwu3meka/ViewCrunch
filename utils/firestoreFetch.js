const newsRef = firestore.collection("news");
const quoteRef = firestore.collection("quote");
const articleRef = firestore.collection("article");
const profileRef = firestore.collection("profile");

import * as db from "@source/tempdb";
import { firestore } from "@utils/firebaseClient";
import { ref, htmlToString, range, toHref, toId, shortNumber } from "@utils/clientFunctions";

export const isHandleTaken = async (handle) => {
  return await profileRef
    .doc(handle)
    .get()
    .then((docSnapshot) => (docSnapshot.exists ? true : false))
    .catch();
  // .catch((err) => console.log(err));
};

export const fetchProfile = (handle) => {
  // return profileRef
  //   .doc(handle)
  //   .get()
  //   .then((snapshot) => {
  //     if (snapshot.exists) return snapshot.data();
  //     return [];
  //   });
  if (!db.viewer) return { error: true };
  return db.viewer.find((x) => x.handle === handle);
};

export const fetchSpaces = async (handle) => {
  const {
    spaces,
    chat: { following },
    error,
  } = await fetchProfile(handle);
  if (error || !spaces?.length) return { error: true };

  const spacesDetails = spaces?.map(({ title }) => ({
    id: `${title.replace(/ /g, "-").toLowerCase()}`,
    title,
    coverPicture: `/images/${range(0, 40)}.png`,
    primaryPicture: `/images/${range(0, 40)}.png`,
    members: range(700, 7000000),
    dateCreated: db.date(),
    about: `
        Occaecat eu laboris in reprehenderit esse sit labore velit minim tempor exercitation dolore commodo. Cupidatat ex ex minim velit irure labore cillum cillum deserunt magna cillum. Mollit voluptate est culpa ex in dolor irure aute cupidatat labore tempor nostrud esse et. Quis labore ea velit do commodo culpa laboris aliqua veniam magna. Eu pariatur veniam aliquip est duis ullamco tempor anim. Adipisicing dolore ex aute anim anim ex incididunt cillum magna exercitation enim nostrud adipisicing.`,
    moderators: db.name1.map((name) => `@${name.replace(/ /g, "_").toLowerCase()}`.substr(0, 13)).slice(0, 3),
    followers: db.name1.map((name) => `@${name.replace(/ /g, "_").toLowerCase()}`.substr(0, 13)),
  }));

  return { spaces: spacesDetails, myFollowing: following, error: false };
};

export const isTitleTaken = async (title) => {
  return false; // return await articleRef
  //   .doc(toId(title, "-"))
  //   .get()
  //   .then((docSnapshot) => (docSnapshot.exists ? true : false));
  // // .catch((err) => console.log(err));
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
    // fix date convertion here from firebase
    // x.date = x.date.toDate().toDateString();
    x.id = toHref({ author: handle, title: x?.title });
    x.rating =
      (x.views > 1000 ? 1 : 0) +
      (x.views > 100 ? 1 : 0) +
      (x.downvote < x.upvote / 5 ? 1 : 0) +
      (x.upvote > x.views / 10 / 2 ? 1 : 0) +
      1;
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
          link: toHref({ title: sortDate[0].title, author: handle }),
          title: sortDate[0].title,
          // label: sortDate[0].date.toDate().toDateString(),
          label: sortDate[0].date,
        },
        lastArticle: {
          link: toHref({ title: sortDate[totalView].title, author: handle }),
          title: sortDate[totalView].title,
          label: sortDate[totalView].date,
        },
        highestRating: {
          link: toHref({ title: sortRating[0].title, author: handle }),
          title: `${sortRating[0].title} @ ${shortNumber(sortRating[0].upvote)}`,
        },
        worstRating: {
          link: toHref({ title: sortRating[totalView].title, author: handle }),
          title: `${sortRating[totalView].title} @ ${shortNumber(sortRating[totalView].upvote)}`,
        },
        mostView: { link: toHref({ title: sortViews[0].title, author: handle }), title: sortViews[0].title, label: sortViews[0].views },
        leastView: {
          link: toHref({ title: sortViews[totalView].title, author: handle }),
          title: sortViews[totalView].title,
          label: sortViews[totalView].views,
        },
      };
    } else {
      const emptyHistory = {
        link: null,
        title: null,
        label: 0,
      };
      return {
        firstArticle: emptyHistory,
        lastArticle: emptyHistory,
        highestRating: emptyHistory,
        worstRating: emptyHistory,
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

export const fetchArticles = async ({ limit = 5, navTag, lastVisible, articlesRead }) => {
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
      space,
      pryImage,
      author,
      viewers: { length: viewers },
      title: { data: title },
    } = x;

    const { displayName, profilePicture } = db.viewer?.find((x) => x.handle === author);

    return {
      title,
      pryImage,
      content,
      space,
      author,
      viewers,
      displayName,
      profilePicture,
    };
  });

  return { articles: articles.slice(0, limit), propsLastVisible: limit };
};

export const fetchArticle = async ({ author, viewHref, myHandle }) => {
  // let content;
  // await firestore
  //   .collection("article")
  //   .doc(articleId)
  //   .get()
  //   .then(async (snapshot) => {
  //     if (snapshot.exists) {
  //       const {
  //         tag,
  //         date,
  //         markdown,
  //         comments: fullComments,
  //         imageUrl,
  //         authorId,
  //         title: { data: title },
  //         view: { length: viewLength, data: viewData },
  //         rating: { data: ratingData, average: avgRating, length: noOfRating },
  //       } = snapshot.data();
  //       const { handle, profilePicture } = await fetchAuthorData(authorId);
  //       const comments = [];
  //       if (fullComments.length) {
  //         for (const { authorId, comment, date } of fullComments) {
  //           const { handle, profilePicture } = await fetchAuthorData(authorId);
  //           comments.push({ comment, date: date.toDate().toDateString(), handle, profilePicture });
  //         }
  //       }
  //       content = {
  //         tag,
  //         title,
  //         handle,
  //         markdown,
  //         authorId,
  //         imageUrl,
  //         viewData,
  //         avgRating,
  //         ratingData,
  //         noOfRating,
  //         viewLength,
  //         profilePicture,
  //         date: date.toDate().toDateString(),
  //         comments,
  //       };
  //     }
  //   })
  //   .catch((err) => {});

  // const w = db.view?.filter((x) => x.title.data == viewHref.replace(/-/g, " "));

  // db.view.forEach((x) => {
  //   console.log(viewHref.replace(/-/g, " "), x.title.data.toLowerCase(), );
  // });

  // const full_view = db.view?.find((x) => viewHref.replace(/-/g, " ") == x.title.data.toLowerCase());
  console.log("here");
  const full_view = await db.view?.find((x) => viewHref == x.id);

  // const full_view = db.view?.find((x) => x.author === author);

  const {
    space,
    title: { data: title },
    date,
    content,
    pryImage,
    comments: commentsList,
    viewers,
    upvote,
    downvote,
  } = full_view;

  const {
    displayName,
    profilePicture,
    social: { linkedinHandle, twitterHandle, facebookHandle },
    about,
    views,
  } = db.viewer?.find((x) => x.handle === author);

  // const { favourite = false, blacklist = false } = myHandle ? db.viewer?.find((x) => x.handle === myHandle) : [];
  const { favourite = [], blacklist = [] } = myHandle ? db.viewer?.find((x) => x.handle === myHandle) : [];

  const viewInFavourite = favourite,
    viewInBlacklist = blacklist;

  // console.log(commentsList);
  const comments = [];
  if (commentsList?.length) {
    for (const { author, comment, date } of commentsList) {
      const { displayName, profilePicture } = db.viewer?.find((x) => x.handle === author);
      comments.push({ comment, date, displayName, profilePicture });
    }
  }

  // console.log(comments);

  let featuredPost = [];
  views?.length && featuredPost.push(views[range(0, views.length - 1)]);
  views?.length > 1 && featuredPost.push(views[range(0, views.length - 1)]);
  featuredPost = featuredPost?.length && featuredPost.filter((v, i, a) => a.indexOf(v) === i);

  const getSimilarPost = (index) => ({
    author: db.view[index].author,
    title: db.view[index].title.data,
    pryImage: db.view[index].pryImage,
  });
  const similarPost = [
    getSimilarPost(range(0, db.view.length - 1)),
    getSimilarPost(range(0, db.view.length - 1)),
    getSimilarPost(range(0, db.view.length - 1)),
  ];

  // console.log(similarPost);

  const view = {
    title,
    content,
    pryImage,
    space,
    comments,
    date,

    viewers,
    upvote,
    downvote,

    author,
    displayName,
    profilePicture,
    about,

    featuredPost,
    similarPost,

    linkedinHandle,
    twitterHandle,
    facebookHandle,

    viewInFavourite,
    viewInBlacklist,
  };

  const advert = {
    company: "SoccerMASS",
    description:
      "Reprehenderit id commodo cupidatat excepteur dolore. Pariatur eu consequat pariatur voluptate aliquip culpa exercitation consectetur aliquip dolor.",
    image: `/images/${range(0, 40)}.png`,
    href: "https://www.soccermass.com",
  };

  console.log(view);

  return {
    view,
    error: !view,
    advert,
  };
};

export const fetchHomePageData = async () => {
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
      .map(({ author, title: { data: title }, viewers: { length: viewers }, pryImage }) => ({
        author,
        title,
        pryImage,
        viewers,
      })),
    newsFlash: db.news.map(({ flash, source, newsLink, date }) => ({ flash, source, newsLink, date })),

    primaryArticles: db.view
      .filter((x) => x.title.length >= 15)
      .slice(0, 3)
      .map((doc) => {
        const {
          title: { data: title },
          date,
          author,
          space,
          pryImage,
        } = doc;
        const { displayName, profilePicture } = db.viewer?.find((x) => x.handle === author);
        return { title, date, space, pryImage, displayName, profilePicture, author };
      }),

    quoteOfTheDay: db.quotes[db.quotes.length - 1],
  };
};

export const fetchViewscape = async (viewscapeId) => {
  const spaceDetails = {
    id: `${viewscapeId.replace(/ /g, "-").toLowerCase()}`,
    title: viewscapeId,
    coverPicture: `/images/${range(0, 40)}.png`,
    primaryPicture: `/images/${range(0, 40)}.png`,
    members: range(700, 7000000),
    dateCreated: db.date(),
    about: `
      Occaecat eu laboris in reprehenderit esse sit labore velit minim tempor exercitation dolore commodo. Cupidatat ex ex minim velit irure labore cillum cillum deserunt magna cillum. Mollit voluptate est culpa ex in dolor irure aute cupidatat labore tempor nostrud esse et. Quis labore ea velit do commodo culpa laboris aliqua veniam magna. Eu pariatur veniam aliquip est duis ullamco tempor anim. Adipisicing dolore ex aute anim anim ex incididunt cillum magna exercitation enim nostrud adipisicing.`,
    moderators: db.name1.map((name) => `@${name.replace(/ /g, "_").toLowerCase()}`).slice(0, 3),
    followers: db.name1.map((name) => `@${name.replace(/ /g, "_").toLowerCase()}`),
  };

  const views = db.view.map((x) => {
    const {
      content,
      space,
      pryImage,
      author,
      viewers: { length: viewers },
      title: { data: title },
    } = x;

    const { displayName, profilePicture } = db.viewer?.find((x) => x.handle === author);

    return {
      title,
      pryImage,
      content,
      space,
      author,
      viewers,
      displayName,
      profilePicture,
    };
  });

  const limit = 7;
  return { spaceDetails, views: views.slice(0, limit), propsLastVisible: limit, error: !spaceDetails || !views.length || null };
};
