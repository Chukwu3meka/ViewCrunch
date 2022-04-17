const { dateCalculator, toId } = require("@utils/clientFunctions");
const { profileFromRefresh } = require("@utils/serverFunctions");

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

module.exports = {
  crunch_ID: crunch_ID,
};
