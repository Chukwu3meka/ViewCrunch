const { v4 } = require("uuid");
import { storage } from "./firebaseClient";
import firebaseAdmin, { bucket } from "@utils/firebaseServer";

const connected = fetch("https://google.com", {
  method: "FET",
  cache: "no-cache",
  headers: { "Content-Type": "application/json" },
  referrerPolicy: "no-referrer",
})
  .then(() => true)
  .catch(() => false);

export const extractHandle = async (cookie) => {
  const noNetwork = !(await connected);
  if (noNetwork) return "Network connectivity issue";

  if (!cookie) return undefined;

  let myRefresh;
  await cookie?.split("; ").forEach((x) => {
    if (x.split("=")[0] === "ViewCrunch") {
      myRefresh = x.split("=")[1];
    }
  });

  if (!myRefresh) return undefined;

  const { access_token: token } = await fetch(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/x-www-form-urlencoded" }),
    body: `grant_type=refresh_token&refresh_token=${myRefresh}`,
    credentials: "same-origin",
  }).then((res) => res.json());

  if (!token) return undefined;

  const handle = await firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .then(
      async (decodedToken) =>
        await firebaseAdmin
          .auth()
          .getUser(decodedToken?.uid)
          .then((user) => user.displayName)
    )
    .catch((error) => {
      throw new TypeError(error);
    });

  return handle.startsWith("@") ? handle : undefined;
};

export const errorProp = (code = 404, title = "Page not found") => ({ props: { error: { code, title } } });

export const saveTempImage = async ({ image, location, handle, api = "crunch" }) => {
  const fs = require("fs");
  const base64 = image.replace(/\s/g, "").split(";base64,").pop();
  // try {
  // if (!fs.existsSync(`./pages/api/${api}/uploads/${handle}`)) {
  //   fs.mkdir(`./pages/api/${api}/uploads/${handle}`, { recursive: true }, (e) => {
  //     console.log("sfafdsfsd", e);
  //   });
  // }
  try {
    fs.statSync(`./pages/api/${api}/uploads/${handle}`).isDirectory();
  } catch (error) {
    throw new TypeError("SAVEtEMPiMAGE", error);
    fs.mkdir(`./pages/api/${api}/uploads/${handle}`, { recursive: true }, () => {});
  }
  fs.writeFile(`./pages/api/${api}/uploads/${location}`, base64, { flag: "w", encoding: "base64" }, () => {});
  return `./pages/api/${api}/uploads/${location}`;
  // } catch (error) {
  //   console.log("error", error);
  // }
};

export const uploadImages = async ({ tempLocation, myHandle, title }) => {
  try {
    const accessToken = v4();
    if (!tempLocation || !myHandle || !title) throw new TypeError("incomplete parameters");

    return await bucket
      .upload(tempLocation, {
        destination: `images/@${myHandle}/${title}.png`,
        gzip: true,
        uploadType: "media",
        metadata: {
          contentType: "image/png",
          metadata: {
            firebaseStorageDownloadTokens: accessToken,
          },
        },
      })
      .then((data) => {
        const file = data[0];
        return Promise.resolve(
          `https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(
            file.name
          )}?alt=media&token=${accessToken}`
        );
      })
      .catch((error) => {
        throw new TypeError(`uploadImages ${error}`);
      });
  } catch (error) {
    console.log(error);
    throw new TypeError(`uploadImages ${error}`);
  }
};

export const deleteImages = async ({ downloadUrl }) => {
  try {
    const httpsRef = storage.refFromURL(downloadUrl).fullPath;
    return await bucket
      .file(httpsRef)
      .delete()
      .then(() => "success")
      .catch((error) => {
        throw new TypeError(`deleteImages ${error}`);
      });
  } catch (error) {
    console.log(error);
    throw new TypeError(`deleteImages ${error}`);
  }
};

export const deleteTempImage = async ({ location, api = "crunch" }) => {
  try {
    const fs = require("fs"),
      path = `./pages/api/${api}/uploads/${location}`;
    try {
      fs.statSync(path).isDirectory();
      fs.rmdirSync(path, { recursive: true }, () => {});
    } catch (error) {
      throw new TypeError(`deleteTempImages ${error}`);
    }
  } catch (error) {
    throw new TypeError(`deleteTempImages ${error}`);
    // console.log(error);
  }
};

// here
export const convertContentToArray = async (content) => {
  const contentArray = [],
    formerImagesUrl = [];
  content = await content?.replace(/<Image src="/g, `\n<Image src="`).replace(/layout="fill" \/>/g, `layout="fill" />\n`);

  for (const x of content?.split("\n")) {
    if (x.match(/<Image src="(?=.*" layout="fill" \/>)/gi)) {
      const image = x.replace(/<Image src="/g, "").split(`" alt`)[0];
      await contentArray.push({ image });
      await formerImagesUrl.push(image);
    } else {
      await contentArray.push(x);
    }
  }

  // export const createMarkdownArray = async (markdown) => {
  //   const markdownArray = [];

  //   for (const x of markdown?.split("\n")) {
  //     if (x.match(/\bhttps?:\/\/\S+/gi)?.[0]) {
  //       await markdownArray.push({ image: x.match(/\bhttps?:\/\/\S+/gi)[0].slice(0, -1) });
  //     } else {
  //       await markdownArray.push(x);
  //     }
  //   }

  //   return await markdownArray;
  // };

  // const formerImagesUrl = viewToBeModified.content
  //   ?.filter((x) => typeof x === "object")
  //   .map(({ image }) => image)
  //   .join(" ")
  //   ?.match(/\bhttps?:\/\/\S+/gi);

  return { contentArray, formerImagesUrl };
};
