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

const initCrunchImageUpload = async (path) => {
  try {
    const fs = require("fs");
    if (!fs.existsSync(path)) {
      await fs.mkdirSync(path, { recursive: true });
    }
  } catch (error) {
    console.log("init fatal error", error);
  }
};

export const saveTempImage = async ({ image, location, handle, api = "crunch", firebaseAdmin }) => {
  const fs = require("fs"),
    { resolve } = require("path"),
    handleDir = `${path}/${handle}`,
    viewDir = `${path}/${location}`,
    { readdirSync, mkdir } = require("fs"),
    base64 = image.replace(/\s/g, "").split(";base64,").pop();

  try {
    console.log("here");
    const getDirectories = (source) =>
      readdirSync(source, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
    console.log("here2");

    console.log("api", getDirectories("./.next/server/pages/api"));

    console.log("here3");
    const path = `${process.env.NODE_ENV !== "development" ? "./.next/server" : "./"}pages/api/${api}/uploads`;
    console.log("here4");

    console.log("making");
    // console.log(path, getDirectories(path));
    console.log(path, getDirectories(`./.next/server/pages`));
    console.log(path, getDirectories(`./.next/server/pages/api`));
    console.log(path, getDirectories(`./.next/server/pages/api/crunch`));
    // console.log(path, getDirectories(`./.next/server/pages/api/crunch/uploads`));

    console.log("making");

    fs.mkdir(handleDir, { recursive: true }, (err) => {
      console.log("heeeeeeeeeeeeeeeeee");
      if (err) {
        console.log("err", err);
      } else {
        console.log("no error");
      }
      console.log("ooooooooooooooooooooooooooo");
    });

    const createDirectories = (pathname = handleDir) => {
      const __dirname = resolve();
      console.log("__dirname", __dirname);
      pathname = pathname.replace(/^\.*\/|\/?[^\/]+\.[a-z]+|\/$/g, ""); // Remove leading directory markers, and remove ending /file-name.extension
      console.log("pathname", pathname);
      mkdir(resolve(__dirname, pathname), { recursive: true }, (e) => {
        if (e) {
          console.log("e", e);
        } else {
          console.log("Success");
        }
      });
    };

    createDirectories();
    // });

    return;
    // fs.mkdirSync(viewDir, { recursive: true });
    // if (!fs.existsSync(handleDir)) {
    //   fs.mkdirSync(handleDir, (err) => {
    //     console.log("does not exists 1", err);
    //     fs.mkdirSync(handleDir, { recursive: true }, (err) => {
    //       console.log("does not exists 2", err);
    //     });
    //   });
    // }

    return "SAVEtEMPiMAGE hald";

    console.log("SAVEtEMPiMAGE 1");
    // await firebaseAdmin.firestore().collection("report").doc("aaa").set({ upload: "upload" });
    if (fs.existsSync(handleDir)) {
      console.log("exixst");
      await firebaseAdmin.firestore().collection("report").doc("aaa").set({ upload: "exists" });
      fs.writeFileSync(viewDir, base64, { flag: "w", encoding: "base64" }, async (error) => {
        console.log("SAVEtEMPiMAGE 1", error);
        await firebaseAdmin.firestore().collection("report").doc("aaa").set({ upload: error });
      });
      console.log("exixst complete");
      await firebaseAdmin.firestore().collection("report").doc("aaa").set({ upload: "exists complete" });
      console.log("SAVEtEMPiMAGE complete");
      await firebaseAdmin.firestore().collection("report").doc("aaa").set({ upload: "complete" });
      return viewDir;
    } else {
      console.log("non exixst");
      await firebaseAdmin.firestore().collection("report").doc("aaa").set({ upload1: "not-exists" });

      try {
        fs.mkdirSync(handleDir, { recursive: true }, (err) => {
          console.log(`deleteTempImages ${err}`);
        });
        try {
          console.log("making viewDir comp;lete");
          fs.writeFileSync(viewDir, base64, { flag: "w", encoding: "base64" }, async (error) => {
            console.log("SAVEtEMPiMAGE 010", error);
            await firebaseAdmin.firestore().collection("report").doc("aaa").set({ upload: error });
          });
        } catch (err) {
          console.log("non exixst complete: 0", err);
        }
      } catch (err) {
        console.log("non exixst complete:", err);
      }

      // holdon
      // try {
      // console.log("making viewDir");
      // await firebaseAdmin.firestore().collection("report").doc("aaa").set({ upload: `making viewDir` });
      // fs.mkdir(viewDir, { recursive: true } ,function (err) {
      //   if (err) {
      //     console.log("error", err);
      //   } else {
      //     console.log("no error", err);
      //   }
      // });
      // return;

      // await fs.mkdir(viewDir, { recursive: true }, async function (error) {
      //   console.log("making viewDir comp;lete");
      //   if (error) {
      //     console.log("error making viewDir", error);
      //     await firebaseAdmin
      //       .firestore()
      //       .collection("report")
      //       .doc("aaa")
      //       .set({ upload: `"error making viewDir"${error}` });
      //   } else {
      //     console.log("making viewDir comp;lete");
      //     await firebaseAdmin.firestore().collection("report").doc("aaa").set({ upload: `making viewDir comp;lete` });
      //     fs.writeFile(viewDir, base64, { flag: "w", encoding: "base64" }, async (error) => {
      //       console.log("SAVEtEMPiMAGE 010", error);
      //       await firebaseAdmin.firestore().collection("report").doc("aaa").set({ upload: error });
      //     });
      //     console.log("completed");
      //     return viewDir;
      //   }
      // });
      console.log("making viewDir comp;lete 2222222222");

      // } catch (error) {
      //   console.log("SAVEtEMPiMAGE mid fatal error", error);
      //   await firebaseAdmin
      //     .firestore()
      //     .collection("report")
      //     .doc("aaa")
      //     .set({ upload: `catch mid error ${error}` });
      // }
      // console.log("writting");
      // await firebaseAdmin.firestore().collection("report").doc("aaa").set({ upload: "writtin" });
      // await fs.writeFileSync(viewDir, base64, { flag: "w", encoding: "base64" }, async (error) => {
      //   console.log("writting error", error);
      //   await firebaseAdmin
      //     .firestore()
      //     .collection("report")
      //     .doc("aaa")
      //     .set({ upload: `"writting error": ${error}` });
      // });
      // console.log("writting completet");
      // console.log("SAVEtEMPiMAGE complete");
      // await firebaseAdmin.firestore().collection("report").doc("aaa").set({ upload: "complete" });
      //     return viewDir;
    }
  } catch (error) {
    console.log("SAVEtEMPiMAGE 4 fatal error", error);
    // await firebaseAdmin
    //   .firestore()
    //   .collection("report")
    //   .doc("aaa")
    //   .set({ upload: `catch error ${error}` });
  }

  // if (fs.existsSync(handleDir)) {
  //   fs.writeFileSync(viewDir, base64, { flag: "w", encoding: "base64" }, (error) => {
  //     console.log("SAVEtEMPiMAGE 1", error);
  //   });
  //   return viewDir;
  // } else {
  //   fs.mkdirSync(viewDir, { recursive: true }, (error) => {
  //     console.log("SAVEtEMPiMAGE 2", error);
  //   });
  //   fs.writeFileSync(viewDir, base64, { flag: "w", encoding: "base64" }, (error) => {
  //     console.log("SAVEtEMPiMAGE 3", error);
  //   });
  //   return viewDir;
  // }

  //   if (!fs.existsSync(`./pages/api/${api}/uploads/${handle}`)) {
  //   fs.mkdir(`./pages/api/${api}/uploads/${handle}`, { recursive: true }, (e) => {
  //     console.log("sfafdsfsd", e);
  //   });
  // }
  // try {
  //   fs.statSync(`./pages/api/${api}/uploads/${handle}`).isDirectory();
  // } catch (error) {
  //   throw new TypeError("SAVEtEMPiMAGE", error);
  //   fs.mkdir(`./pages/api/${api}/uploads/${handle}`, { recursive: true }, () => {});
  // }
  // fs.writeFile(`./pages/api/${api}/uploads/${location}`, base64, { flag: "w", encoding: "base64" }, () => {});
  // return `./pages/api/${api}/uploads/${location}`;
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
        const viewDir = data[0];
        return Promise.resolve(
          `https://firebasestorage.googleapis.com/v0/b/${process.env.FIREBASE_STORAGE_BUCKET}/o/${encodeURIComponent(
            viewDir.name
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
      .viewDir(httpsRef)
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
