import firebaseAdmin from "@utils/firebaseServer";

const handler = async ({ myHandle, title, url, list, append }) => {
  try {
    const profileRef = firebaseAdmin.firestore().collection("profile").doc(myHandle);

    return await firebaseAdmin.firestore().runTransaction(async (t) => {
      const doc = await t.get(profileRef);
      const { favourite, blacklist } = doc.data();

      const newFavourite =
        (list === "blacklist" && append) || (list === "favourite" && !append)
          ? favourite.filter((x) => x.url !== url)
          : list === "favourite" && append
          ? [...favourite, { title, url }]
          : favourite;

      const newBlacklist =
        (list === "favourite" && append) || (list === "blacklist" && !append)
          ? blacklist.filter((x) => x.url !== url)
          : list === "blacklist" && append
          ? [...blacklist, { title, url }]
          : blacklist;

      t.update(profileRef, { favourite: newFavourite, blacklist: newBlacklist });

      return { favourite: newFavourite, blacklist: newBlacklist, status: true };
    });
  } catch (error) {
    throw new TypeError(error);
  }
};

export default async (req, res) => {
  try {
    const { myHandle, title, url, list, append } = req.body;
    const result = await handler({ myHandle, title, url, list, append });
    return res.status(200).json(result);
  } catch (error) {
    // console.log(error);
    return res.status(401).json({ status: false });
  }
};
