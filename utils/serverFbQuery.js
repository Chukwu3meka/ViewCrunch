import { dateCalculator, range, toId } from "@utils/clientFunctions";
const { profileFromRefresh } = require("@utils/serverFunctions");
const { viewRef, profileRef } = require("@utils/firebaseServer");

const crunch_ID = async ({ cookie, crunchID }) => {
  const profile = (await profileFromRefresh({ cookie, optional: true })) || {};

  const { crunchRef } = await require("@utils/firebaseServer");

  return await crunchRef
    .doc(crunchID)
    .get()
    .then(async (snapshot) => {
      const { about, date, followers, picture, suspended, title, stat } = snapshot.data();

      return {
        about,
        title,
        picture,
        crunchID,
        suspended,
        follower: followers?.includes(profile.id),
        date: dateCalculator({ date: date.toDate().toDateString() }),
        ...stat,
        lastPublished: dateCalculator({ date: stat.lastPublished.toDate().toDateString() }),
      };
    })
    .catch((err) => {
      throw err;
    });
};

const crunch_index = async ({ cookie }) => {
  const profile = (await profileFromRefresh({ cookie, optional: true })) || {};

  const { crunchRef } = await require("@utils/firebaseServer"),
    { Timestamp } = require("firebase-admin/firestore"),
    otherCrunches = [],
    myCrunches = [],
    crunches = [];

  if (profile.id) {
    for (const crunch of profile.crunches) {
      const crunchID = toId(crunch);
      crunches.push(crunchID);

      await crunchRef
        .doc(crunchID)
        .get()
        .then(async (snapshot) => {
          const {
            about,
            date,
            followers,
            moderators,
            picture,
            suspended,
            title,
            stat: { totalFollowers },
          } = snapshot.data();

          myCrunches.push({
            crunchID,
            about,
            date: dateCalculator({ date: date.toDate().toDateString() }),
            follower: followers?.includes(profile.id),
            moderator: moderators?.includes(profile.id),
            picture,
            suspended,
            title,
            totalFollowers,
          });
        });
    }
  }

  let lastVisible;
  for (let loop = 0; loop < 3; loop++) {
    if (otherCrunches.length >= 5) break;
    await (lastVisible
      ? crunchRef
          .where("suspended", "==", false)
          .orderBy("stat.lastPublished", "desc")
          .startAfter(Timestamp.fromDate(new Date(JSON.parse(lastVisible.date)), lastVisible.title))
          .limit(5)
      : crunchRef.where("suspended", "==", false).orderBy("stat.lastPublished", "desc").limit(7)
    )
      .get()
      .then(async (snapshot) => {
        for (const crunch of snapshot.docs) {
          const crunchID = crunch.id,
            {
              about,
              date,
              followers,
              moderators,
              picture,
              suspended,
              title,
              stat: { totalFollowers },
            } = crunch.data();

          // take only crunches i donot follow
          if (!crunches.includes(crunchID)) {
            lastVisible = { title, date: JSON.stringify(date.toDate()) };
            otherCrunches.push({
              crunchID,
              about,
              date: dateCalculator({ date: date.toDate().toDateString() }),
              follower: followers?.includes(profile.id),
              moderator: moderators?.includes(profile.id),
              picture,
              suspended,
              title,
              totalFollowers,
            });
          }
        }
      });
  }

  return { myCrunches, otherCrunches };
};

const crunch_publish = async ({ cookie }) => {
  const profile = (await profileFromRefresh({ cookie, optional: true })) || {};

  const {
    crunches,
    status: { suspended, publish },
    details: { displayName },
  } = profile;

  if (!publish) throw 1008; //check if profile is suspended
  if (suspended) throw 1007; //check if profile is suspended

  return { crunches, displayName };
};

const notification_index = async ({ cookie }) => {
  const profile = (await profileFromRefresh({ cookie, optional: true })) || {};

  const messages = Object.entries(profile.notification)
    .map(([key, value]) => ({
      ...value,
      message: key,
      date: dateCalculator({ date: value.date.toDate().toDateString() }),
    }))
    .reverse();

  return { messages, unseen: profile.unseenNotification };
};

const bookmarks_index = async ({ cookie }) => {
  const profile = (await profileFromRefresh({ cookie, optional: true })) || {};

  const bookmarks = [];

  for (const bookmark of profile.bookmarks.reverse()) {
    await viewRef
      .doc(bookmark)
      .get()
      .then(async (snapshot) => {
        const {
          title,
          content,
          stat: { author, crunch, date, readTime, keywords, description, image, viewLink },
        } = snapshot.data();

        const { profilePicture, profileLink, displayName } = await profileRef
          .doc(author)
          .get()
          .then((snapshot) => {
            const {
              picture: { profile: profilePicture },
              details: { profileLink, displayName },
            } = snapshot.data();

            return { profilePicture, profileLink, displayName };
          });

        bookmarks.push({
          image,
          title,
          author,
          crunch,
          content,
          readTime,
          description,
          displayName,
          profileLink,
          profilePicture,
          viewLink: `/view/${viewLink}`,
          crunchLink: toId(`/crunch/${crunch}`),
          keyword: keywords[range(0, keywords.length - 1)],
          viewID: viewLink.split("-")[viewLink.split("-").length - 1],
          date: dateCalculator({ date: date.toDate().toDateString() }),
        });
      });
  }

  return bookmarks;
};

const profile_id = async ({ cookie }) => {
  const profile = (await profileFromRefresh({ cookie, optional: true })) || {};

  return {};
};

const handler = async ({ cookie }) => {
  const profile = (await profileFromRefresh({ cookie, optional: true })) || {};
};

module.exports = {
  crunch_ID: crunch_ID,
  crunch_index: crunch_index,
  crunch_publish: crunch_publish,
  notification_index: notification_index,
  bookmarks_index: bookmarks_index,
  profile_id: profile_id,
  handler: handler,
};
