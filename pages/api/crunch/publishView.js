import { toId } from "@utils/clientFunctions";
import firebaseAdmin from "@utils/firebaseServer";
import { uploadImages, saveTempImage, deleteTempImage, initCrunchImageUpload } from "@utils/serverFunctions";

const publishHandler = async ({ profile: { myHandle }, title, description, content, keywords, crunch, moderator }) => {
  const images = [],
    imagesURL = [],
    pryImageURL = [],
    viewID = toId(myHandle, title),
    viewURL = `${myHandle}/${toId(title)}`,
    viewRef = firebaseAdmin.firestore().collection("view").doc(viewID),
    profileRef = firebaseAdmin.firestore().collection("profile").doc(myHandle);

  // console.log("here 0");

  // const getd = () =>
  //   fs
  //     .readdirSync("./pages/api/crunch", { withFileTypes: true })
  //     .filter((dirent) => dirent.isDirectory())
  //     .map((dirent) => dirent.name);

  // console.log(getd());

  await initCrunchImageUpload(`./pages/api/crunch/uploads/${myHandle}`);

  for (const x of content) {
    if (typeof x === "object") {
      images.push(
        await saveTempImage({ image: x.image, location: `${viewURL}@${content.indexOf(x)}.png`, handle: myHandle, firebaseAdmin })
      );
    }
  }

  console.log("here 4354543534");

  const articleHasImage = images.length;

  console.log({ articleHasImage, images });
  // return;

  firebaseAdmin.firestore().collection("report").doc("aaa").set({ link1: true });

  if (articleHasImage) {
    for (const tempLocation of images) {
      await uploadImages({
        tempLocation,
        myHandle,
        title: `${title}@${images.indexOf(tempLocation)}`,
      })
        .then((url) => {
          console.log({ url });
          imagesURL.push(url);
        })
        .catch((error) => {
          throw new TypeError(error);
        });
    }
  }

  firebaseAdmin.firestore().collection("report").doc("aaa").set({ link2: true });

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

  firebaseAdmin.firestore().collection("report").doc("aaa").set({
    pry: pryImageURL[0],
    title,
    viewURL,
    crunch,
    myHandle,
    moderator,
  });

  firebaseAdmin.firestore().collection("report").doc("aaa").set({ link3: true });

  const newView = {
    title: {
      data: title,
      length: title.split(" ").length,
      path: `/${viewURL}`,
    },
    date: firebaseAdmin.firestore.Timestamp.now(),
    author: myHandle,
    pryImage: pryImageURL[0] || `/images/no-image.webp`,
    content: viewContent,
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

  firebaseAdmin.firestore().collection("report").doc("aaa").set({ link4: true });

  await viewRef
    .set({ ...newView })
    .then(async () => {
      await profileRef
        .update({
          [`published.${viewID}`]: {
            title,
            date: firebaseAdmin.firestore.Timestamp.now(),
            pryImage: pryImageURL[0] || `/images/no-image.webp`,
            upvote: 0,
            downvote: 0,
          },
          "stat.seen": firebaseAdmin.firestore.FieldValue.arrayUnion(viewID),
        })
        .then(async () => {
          await deleteTempImage({ location: myHandle });
        })
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
    const { description, profile, title, content, keywords, crunch, moderator } = req.body;
    const link = await publishHandler({ profile, title, description, content, keywords, crunch, moderator });
    return res.status(200).json({ link });
  } catch (error) {
    await firebaseAdmin
      .firestore()
      .collection("contactus")
      .add({
        name: error,
        date: firebaseAdmin.firestore.Timestamp.now(),
      })
      .then()
      .catch((error) => {
        // throw new TypeError(error);
      });
    console.log("error", error);
    firebaseAdmin.firestore().collection("report").doc("aaa").set({ link4: true });

    firebaseAdmin.firestore().collection("report").doc("aaa").set({ link5: error });

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
