import { profileFromRefresh } from "@utils/serverFunctions";

const verifyRefresh = async (myRefresh) => {
  const profile = await profileFromRefresh({ refresh: myRefresh });
  if (!profile) throw "profile not found";

  return {
    myID: uid,
    myTheme: profile.details.theme,
    myNotification: profile.notification.unread,
  };
};

export default async (req, res) => {
  try {
    const profile = await verifyRefresh(req.body.myRefresh);
    return res.status(200).json(profile);
  } catch (error) {
    // console.log(error);
    return res.status(401).send(false);
  }
};
