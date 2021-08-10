import { toId } from "@utils/clientFunctions";
import firebaseAdmin from "@utils/firebaseServer";
import { uploadToFirestorage, deleteImages } from "@utils/serverFunctions";

const retouchHandler = async ({ profile: { myHandle }, title, description, content, keywords, crunch, moderator, oldContent }) => {
  const images = [],
    viewID = toId(myHandle, title),
    viewURL = `${myHandle}/${toId(title)}`;

  for (const x of content) {
    if (typeof x === "object") {
      images.push(
        await uploadToFirestorage({
          image: x.image,
          imageTitle: `${title}~${content.indexOf(x) + 1}.png`,
          myHandle,
        })
      );
    }
  }

  const updatedView = {
    keywords,
    description,
    content: [...content]
      ?.map((x) => {
        if (typeof x === "string") return x;
        if (typeof x === "object") return `<Image src="${images.shift()}" alt="${title}" layout="fill" />`;
      })
      .flat(Infinity)
      .join("\n"),
    lastUpdate: firebaseAdmin.firestore.Timestamp.now(),
  };

  const imagesToBeDeleted = [],
    oldContentImages = oldContent.match(/<Image src="[^"]*"[^>]*>/gm)?.map((x) => x.split('src="')[1].split('"')[0]) || [],
    newContentImages = updatedView.content.match(/<Image src="[^"]*"[^>]*>/gm)?.map((x) => x.split('src="')[1].split('"')[0]) || [];

  oldContentImages?.forEach((x) => {
    if (!newContentImages.includes(x)) imagesToBeDeleted.push(x);
  });

  if (imagesToBeDeleted?.length) await deleteImages({ deleteType: "retouch", title, myHandle, content: imagesToBeDeleted });
  updatedView.pryImage = newContentImages[0] || `/images/no-image.webp`;

  await firebaseAdmin
    .firestore()
    .collection("view")
    .doc(viewID)
    .update(updatedView)
    .then(async () => {
      await firebaseAdmin
        .firestore()
        .collection("profile")
        .doc(myHandle)
        .update({
          [`published.${viewID}.pryImage`]: updatedView.pryImage,
        })
        .then(() => {})
        .catch((err) => {
          throw new TypeError(err);
        });
    })
    .catch((err) => {
      throw new TypeError(err);
    });

  return `/${viewURL}`;
};

export default async (req, res) => {
  try {
    const { description, profile, title, content, keywords, crunch, moderator, oldContent } = req.body;
    const link = await retouchHandler({ profile, title, description, content, keywords, crunch, moderator, oldContent });
    return res.status(200).json({ link });
  } catch (error) {
    // console.log("error", error);
    return res.status(401).json({ link: undefined });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "30mb",
    },
  },
};
