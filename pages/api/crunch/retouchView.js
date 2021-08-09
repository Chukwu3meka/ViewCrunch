import { toId } from "@utils/clientFunctions";
import firebaseAdmin from "@utils/firebaseServer";
import { uploadToFirestorage } from "@utils/serverFunctions";

import { deleteImages, uploadImages, saveTempImage, deleteTempImage } from "@utils/serverFunctions";

const retouchHandler = async ({ profile: { myHandle }, title, description, content, keywords, crunch, moderator, oldContent }) => {
  const images = [],
    viewID = toId(myHandle, title),
    viewURL = `${myHandle}/${toId(title)}`;

  const newData = {
    lastUpdate: firebaseAdmin.firestore.Timestamp.now(),
    keywords,
    description,
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

  newData.content = [...content]
    .map((x) => {
      if (typeof x === "string") return x;
      if (typeof x === "object") return `<Image src="${images.shift()}" alt="${title}" layout="fill" />`;
    })
    .flat(Infinity)
    .join("\n");
  const imageTags = newData.content.match(/<Image src="[^"]*"[^>]*>/gm).map((x) => {
    console.log(x);
  });
  throw new TypeError("werewre");

  return;
  newData.pryImage = "" || `/images/no-image.webp`;

  await firebaseAdmin
    .firestore()
    .collection("view")
    .doc(viewID)
    .set(newData)
    .then(async () => {
      await firebaseAdmin
        .firestore()
        .collection("profile")
        .doc(myHandle)
        .update({
          [`published.${viewID}`]: {
            pryImage: newView.pryImage,
          },
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

  // console.log(content);

  // for (const x of content) {
  //   if (typeof x === "object") {
  //     if (x.image.match(/\bhttps?:\/\/\S+/gi)) {
  //       content[content.indexOf(x)] = `![${title}](${x.image})`;
  //     } else {
  //       images.push(await saveTempImage(x.image, `${articleId}@${content.indexOf(x)}.png`));
  //     }
  //   }
  // }

  // if (images?.length) {
  //   for (const x of images) {
  //     await uploadImages({
  //       tempLocation: x,
  //       myAuthorID,
  //       title: `${title}@${images.indexOf(x)}`,
  //     })
  //       .then(async (url) => {
  //         imagesURL.push(url);
  //         await deleteTempImage(x);
  //       })
  //       .catch((err) => {});
  //   }
  // }

  // console.log(content);

  // const markdown = [...content]
  //   .map((x) => {
  //     if (typeof x === "string") return x;
  //     if (typeof x === "object") {
  //       const imageURL = imagesURL.shift();
  //       if (!pryImageURL.length) pryImageURL.push(imageURL);
  //       return `![${title}](${imageURL})`;
  //     }
  //   })
  //   .flat(Infinity)
  //   .join("\n");

  // if (formerImagesUrl?.length) {
  //   const imagesToBeDeleted = [],
  //     // currentImagesUrl = markdown?.match(/\bhttps?:\/\/\S+/gi).map((x) => x.slice(0, -1));
  //     currentImagesUrl = markdown?.match(/\bhttps?:\/\/\S+/gi).map((x) => decodeURIComponent(x.slice(0, -1)));

  //   for (const url of formerImagesUrl) {
  //     if (!currentImagesUrl.includes(decodeURIComponent(url))) imagesToBeDeleted.push(url);
  //   }

  //   if (imagesToBeDeleted?.length) {
  //     for (const url of imagesToBeDeleted) {
  //       await deleteImages({ downloadUrl: url });
  //     }
  //   }
  // }

  // firebaseAdmin
  //   .firestore()
  //   .collection("view")
  //   .doc(articleId)
  //   .update({
  //     title: {
  //       data: title,
  //       length: title.split(" ").length,
  //     },
  //     date: firebaseAdmin.firestore.Timestamp.now(),
  //     tag,
  //     imageUrl: pryImageURL[0] || `/images/${tag}.png`,
  //     markdown,
  //   })
  //   .then()
  //   .catch((error) => {
  //     throw new TypeError(error);
  //   });

  // return "success";
};

export default async (req, res) => {
  try {
    const { description, profile, title, content, keywords, crunch, moderator, oldContent } = req.body;
    const link = await retouchHandler({ profile, title, description, content, keywords, crunch, moderator, oldContent });
    return res.status(200).json({ link });
  } catch (error) {
    console.log("error", error);
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
