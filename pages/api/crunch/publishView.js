import { uploadImages, saveTempImage, deleteTempImage, verifyRefresh } from "@utils/serverFunctions";
import firebaseAdmin from "@utils/firebaseServer";
import { toId } from "@utils/clientFunctions";

const publishHandler = async ({ profile: { myHandle }, title, description, content, keywords, crunch }) => {
  const images = [],
    imagesURL = [],
    pryImageURL = [],
    viewURL = `${myHandle}/${toId(title)}`;

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
        .catch(() => {});
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
    viewers: [myHandle],
    upvote: [],
    downvote: [],
    keywords,
    description,
    crunch,
    disabled: false,
  };

  firebaseAdmin
    .firestore()
    .collection("view")
    .doc(toId(title))
    .set({ ...newView })
    .then(async () => {
      await firebaseAdmin
        .firestore()
        .collection("profile")
        .doc(myHandle)
        .update({
          [`published.${toId(title)}`]: {
            title,
            date: firebaseAdmin.firestore.Timestamp.now(),
            views: 1,
            pryImage: pryImageURL[0] || `/images/no-image.webp`,
          },
          "stat.seen": firebaseAdmin.firestore.FieldValue.arrayUnion(toId(title)),
        });

      await deleteTempImage(myHandle);
    })
    .catch((error) => {
      throw new TypeError(error);
    });

  return JSON.stringify(`/${viewURL}`);
};

export default async (req, res) => {
  try {
    const { description, profile, title, content, keywords, crunch } = req.body;
    // profile.myHandle = await verifyRefresh({ myRefresh: profile.myRefresh });
    const viewURL = await publishHandler({ profile, title, description, content, keywords, crunch });
    return res.status(200).json(viewURL);
  } catch (error) {
    console.log(error);
    return res.status(401).send(false);
  }
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "30mb",
    },
  },
};
