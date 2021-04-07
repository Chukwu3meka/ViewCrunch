import firebaseAdmin from "@utils/firebaseServer";
import { verifyRefresh } from "@utils/serverFunctions";

export default async (req, res) => {
  try {
    const { myRefresh, initial } = req.body,
      profile = await verifyRefresh({ myRefresh, initial });

    if (profile) return res.status(200).json(profile);
  } catch (error) {
    return res.status(401).json({});
  }
};
