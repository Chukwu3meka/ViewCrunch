import { toId } from "@utils/clientFunctions";
import firebaseAdmin from "@utils/firebaseServer";
import { uploadImages, saveTempImage, deleteTempImage } from "@utils/serverFunctions";

const publishHandler = async ({ profile: { myHandle }, title, description, content, keywords, crunch, moderator }) => {
  const images = [],
    imagesURL = [],
    pryImageURL = [],
    viewURL = `${myHandle}/${toId(title)}`,
    viewID = toId(`${myHandle}~${title}`),
    viewRef = firebaseAdmin.firestore().collection("view").doc(viewID),
    profileRef = firebaseAdmin.firestore().collection("profile").doc(myHandle);

  for (const x of content) {
    if (typeof x === "object")
      images.push(await saveTempImage({ image: x.image, location: `${viewURL}@${content.indexOf(x)}.png`, handle: myHandle }));
  }

  const articleHasImage = images.length;

  if (articleHasImage) {
    for (const tempLocation of images) {
      await uploadImages({
        tempLocation,
        myHandle,
        title: `${title}@${images.indexOf(tempLocation)}`,
      })
        .then((url) => {
          imagesURL.push(url);
        })
        .catch((error) => {
          throw new TypeError(error);
        });
    }
  }

  const viewContent = [...content]
    .map((x) => {
      if (typeof x === "string") return x;
      if (typeof x === "object") {
        const imageURL = imagesURL.shift();
        if (!pryImageURL.length) pryImageURL.push(imageURL);
        return `<Image src="${imageURL}" alt="${title}" layout="fill" />`;
      }
    })
    .flat(Infinity)
    .join("\n");

  const newView = {
    title: {
      data: title,
      length: title.split(" ").length,
    },
    date: firebaseAdmin.firestore.Timestamp.now(),
    author: myHandle,
    crunch,
    pryImage: pryImageURL[0] || `/images/no-image.webp`,
    content: viewContent,
    keywords,
    description,
    comments: [],
    upvote: [],
    downvote: [],
    keywords,
    description,
    crunch,
    visible: moderator ? true : false,
  };

  viewRef
    .set({ ...newView })
    .then(async () => {
      await firebaseAdmin;
      profileRef.set({
        [`published.${viewID}`]: {
          title,
          date: firebaseAdmin.firestore.Timestamp.now(),
          pryImage: pryImageURL[0] || `/images/no-image.webp`,
          upvote: 0,
          downvote: 0,
        },
        "stat.seen": firebaseAdmin.firestore.FieldValue.arrayUnion(viewID),
      });

      await deleteTempImage(myHandle);
    })
    .catch((error) => {
      throw new TypeError(error);
    });

  return `/${viewURL}`;
};

export default async (req, res) => {
  try {
    const { description, profile, title, content, keywords, crunch, moderator } = req.body;
    const link = await publishHandler({ profile, title, description, content, keywords, crunch, moderator });
    return res.status(200).json({ link });
  } catch (error) {
    // console.log(error);
    return res.status(401).json({ link: false });
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "30mb",
    },
  },
};
