import { time2read, toId } from "@utils/clientFunctions";
import { firestore } from "@utils/firebaseServer";
import { uploadToFirestorage } from "@utils/serverFunctions";

import { Timestamp } from "firebase-admin/firestore";

const publishHandler = async ({ title, keywords, description, content, myID, crunch }) => {
  const view = {
    comments: [],
    content: null,
    stat: {
      author: myID,
      crunch,
      date: Timestamp.now(),
      image: null,
      description,
      keywords,
      readTime: time2read(content.join()),
      viewLink: null,
    },
    status: {
      visible: false,
      date: Timestamp.now(),
      description: crunch === "community" ? "Published in my name" : "Awaiting Moderator approval",
      moderator: null,
    },
    title,
    votes: {
      downvote: [],
      total: 0,
      upvote: [],
    },
  };

  return await firestore
    .collection("view")
    .add(view)
    .then(async (x) => {
      const { id: viewId } = x;

      // add images to storage and get their url
      const pathToImages = [];
      for (const [index, x] of content.entries()) {
        if (typeof x === "object") {
          const imageURL = await uploadToFirestorage({
            myID,
            image: x.image,
            viewId: `${viewId}_${index}.png`,
          });

          pathToImages.push(imageURL);
        }
      }

      // update main values in view

      await firestore
        .collection("view")
        .doc(viewId)
        .update({
          "stat.image": pathToImages[0] || "no-image-view.png",
          "status.visible": crunch === "community" ? true : false,
          "stat.viewLink": toId(`${title}-${viewId}`, false),
          "status.moderator": crunch === "community" ? "Community" : null,
          content: content
            .map((x, index) => {
              if (typeof x === "string") return x;
              if (typeof x === "object") return `<Image src="${pathToImages.shift()}" alt="${title} ~ ${index}" layout="fill" />`;
            })
            .flat(Infinity)
            .join("\n"),
        })
        .catch((err) => {
          console.log(err);
          throw "Unable to update main view content";
        });

      return `/view/${toId(title)}-${viewId}`;
    })
    .catch((err) => {
      // console.log(err);
      throw "Unable to publish view";
    });
};

export default async (req, res) => {
  try {
    const { title, keywords, description, content, myID, crunch } = req.body;
    const link = await publishHandler({ title, keywords, description, content, myID, crunch });
    return res.status(200).json({ link });
  } catch (error) {
    let errMsg;
    switch (error) {
      case "suspended":
        errMsg = "Author's account suspended";
        break;
      default:
        errMsg = "An Error occured";
        break;
    }

    // console.log("error", error);
    return res.status(401).json({ errMsg });
  }
};

// limit size of payload
export const config = { api: { bodyParser: { sizeLimit: "30mb" } } };
