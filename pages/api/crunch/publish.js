import { toId } from "@utils/clientFunctions";
import firebaseAdmin from "@utils/firebaseServer";
import { uploadToFirestorage } from "@utils/serverFunctions";

const publishHandler = async ({ profile: { myHandle }, title, description, content, keywords, crunch, moderator }) => {
  const images = [],
    viewID = toId(myHandle, title),
    viewURL = `${myHandle}/${toId(title)}`;

  const newView = {
    title: {
      data: title,
      length: title.split(" ").length,
      path: `/${viewURL}`,
    },
    date: firebaseAdmin.firestore.Timestamp.now(),
    author: myHandle,
    comments: [],
    upvote: [],
    downvote: [],
    keywords,
    description,
    crunch: [crunch],
    visible: {
      moderator: myHandle,
      date: firebaseAdmin.firestore.Timestamp.now(),
      status: moderator ? true : false,
      data: moderator ? "published by a moderator" : "just published",
    },
  };

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

  newView.pryImage = images[0] || `/images/no-image.webp`;
  newView.content = [...content]
    .map((x) => {
      if (typeof x === "string") return x;
      if (typeof x === "object") return `<Image src="${images.shift()}" alt="${title}" layout="fill" />`;
    })
    .flat(Infinity)
    .join("\n");

  await firebaseAdmin
    .firestore()
    .collection("view")
    .doc(viewID)
    .set(newView)
    .then(async () => {
      await firebaseAdmin
        .firestore()
        .collection("profile")
        .doc(myHandle)
        .update({
          [`published.${viewID}`]: {
            title: newView.title.data,
            date: newView.date,
            pryImage: newView.pryImage,
            upvote: 0,
            downvote: 0,
          },
        })
        .then(() => {})
        .catch((error) => {
          throw new TypeError(error);
        });
    })
    .catch((error) => {
      throw new TypeError(error);
    });

  return `/${viewURL}`;
};

export default async (req, res) => {
  try {
    const { title, keywords, description, content, myID, crunch } = req.body;

    const link = await publishHandler({ profile, title, description, content, keywords, crunch, moderator });
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
