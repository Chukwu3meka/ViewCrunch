import { deleteImages, uploadImages, saveTempImage, deleteTempImage } from "@utils/serverFunctions";
import firebaseAdmin from "@utils/firebaseServer";

const retouchArticle = async ({ author: { myAuthorID }, title, tag, content, markdownImages, articleId, formerImagesUrl }) => {
  const images = [],
    imagesURL = [],
    pryImageURL = [];

  // console.log(content);

  for (const x of content) {
    if (typeof x === "object") {
      if (x.image.match(/\bhttps?:\/\/\S+/gi)) {
        content[content.indexOf(x)] = `![${title}](${x.image})`;
      } else {
        images.push(await saveTempImage(x.image, `${articleId}@${content.indexOf(x)}.png`));
      }
    }
  }

  if (images?.length) {
    for (const x of images) {
      await uploadImages({
        tempLocation: x,
        myAuthorID,
        title: `${title}@${images.indexOf(x)}`,
      })
        .then(async (url) => {
          imagesURL.push(url);
          await deleteTempImage(x);
        })
        .catch((err) => {});
    }
  }

  // console.log(content);

  const markdown = [...content]
    .map((x) => {
      if (typeof x === "string") return x;
      if (typeof x === "object") {
        const imageURL = imagesURL.shift();
        if (!pryImageURL.length) pryImageURL.push(imageURL);
        return `![${title}](${imageURL})`;
      }
    })
    .flat(Infinity)
    .join("\n");

  if (formerImagesUrl?.length) {
    const imagesToBeDeleted = [],
      // currentImagesUrl = markdown?.match(/\bhttps?:\/\/\S+/gi).map((x) => x.slice(0, -1));
      currentImagesUrl = markdown?.match(/\bhttps?:\/\/\S+/gi).map((x) => decodeURIComponent(x.slice(0, -1)));

    for (const url of formerImagesUrl) {
      if (!currentImagesUrl.includes(decodeURIComponent(url))) imagesToBeDeleted.push(url);
    }

    if (imagesToBeDeleted?.length) {
      for (const url of imagesToBeDeleted) {
        await deleteImages({ downloadUrl: url });
      }
    }
  }

  firebaseAdmin
    .firestore()
    .collection("view")
    .doc(articleId)
    .update({
      title: {
        data: title,
        length: title.split(" ").length,
      },
      date: firebaseAdmin.firestore.Timestamp.now(),
      tag,
      imageUrl: pryImageURL[0] || `/images/${tag}.png`,
      markdown,
    })
    .then()
    .catch((error) => {
      throw new TypeError(error);
    });

  return "success";
};

export default async (req, res) => {
  try {
    const { description, profile, title, content, keywords, crunch, moderator, oldContent } = req.body;
    throw new TypeError("error");

    console.log(oldContent, content);

    const link = await publishHandler({ profile, title, description, content, keywords, crunch, moderator });
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
