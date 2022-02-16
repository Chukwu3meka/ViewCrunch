const { v4 } = require("uuid");
// import firebaseAdmin, { bucket } from "@utils/firebaseServer";

const connected = fetch("https://google.com", {
  method: "FET",
  cache: "no-cache",
  headers: { "Content-Type": "application/json" },
  referrerPolicy: "no-referrer",
})
  .then(() => true)
  .catch(() => false);

export const profileFromRefresh = async ({ refresh, cookie }) => {
  const { auth, firestore } = await require("@utils/firebaseServer");

  if (!refresh) {
    const noNetwork = !(await connected);
    if (noNetwork) throw 1000;
    if (!cookie) throw 1001;

    let cookieRefresh;

    await cookie?.split("; ").forEach((x) => {
      if (x.split("=")[0] === "ViewCrunch") {
        cookieRefresh = x.split("=")[1];
      }
    });

    if (!cookieRefresh) throw 1002;
    refresh = cookieRefresh;
  }
  if (!refresh) throw 1003;

  const { access_token: token } = await fetch(
    `https://securetoken.googleapis.com/v1/token?key=${JSON.parse(process.env.NEXT_PUBLIC_CLIENT).apiKey}`,
    {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/x-www-form-urlencoded" }),
      body: `grant_type=refresh_token&refresh_token=${refresh}`,
      credentials: "same-origin",
    }
  ).then((res) => res.json());
  if (!token) throw 1004;

  const uid = await auth
    .verifyIdToken(token)
    .then(({ uid }) => uid)
    .catch((err) => {
      throw 1005;
    });
  if (!uid) throw 1005;

  const profile = await firestore
    .collection("profile")
    .doc(uid)
    .get()
    .then((snapshot) => {
      const notification = [];
      let unseen = 0;

      for (const [key, value] of Object.entries(snapshot.data().notification)) {
        notification.push({
          ...value,
          message: key,
          date: value.date.toDate().toDateString(),
        });
        unseen = unseen + (value.seen ? 0 : 1);
      }

      return {
        id: snapshot.id,
        ...snapshot.data(),
        notification: {
          unseen,
          messages: notification,
        },
      };
    })
    .catch((error) => {
      throw error;
    });

  if (!profile) throw 1006;
  return profile;
};

export const uploadToFirestorage = async ({ image, myHandle, imageTitle }) => {
  // try {
  //   if (!imageTitle || !myHandle || !image) throw new TypeError("incomplete parameters");
  //   const accessToken = v4(),
  //     base64 = image.replace(/\s/g, "").split(";base64,").pop(),
  //     imageBuffer = new Buffer.from(base64, "base64");
  //   return await bucket.file(`images/${myHandle}/${imageTitle}`).save(
  //     imageBuffer,
  //     {
  //       metadata: {
  //         contentType: "image/png",
  //         metadata: {
  //           firebaseStorageDownloadTokens: accessToken,
  //         },
  //       },
  //     },
  //     (err) => {
  //       if (err) {
  //         throw new TypeError(`uploadImages ${err}`);
  //       } else {
  //         return `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_STOR}/o/${encodeURIComponent(
  //           `images/${myHandle}/${imageTitle}`
  //         )}?alt=media&token=${accessToken}`;
  //       }
  //     }
  //   );
  // } catch (err) {
  //   // console.log({ err });
  // }
};

export const deleteImages = async ({ title, content, myHandle, deleteType }) => {
  // try {
  //   const extractStorageLinks = () => {
  //     const links = [];
  //     if (deleteType === "retouch") {
  //       // sort this to prevent deletion of other users image
  //       content?.forEach((x) => {
  //         links.push(x);
  //       });
  //       // console.log({ deleteType, title, myHandle, content });
  //     } else {
  //       const imagePaths = content.match(
  //         /\bhttps:\/\/firebasestorage.googleapis.com\/v0\/b\/viewcrunch-2018.appspot.com\/o\/images%2F%40\S+/gi
  //       );
  //       for (const x of imagePaths) {
  //         const linkHandle = decodeURIComponent(
  //           x.split("https://firebasestorage.googleapis.com/v0/b/viewcrunch-2018.appspot.com/o/images%2F")[1].split("%2F")[0]
  //         );
  //         const linkTitle = decodeURIComponent(
  //           x
  //             .split("https://firebasestorage.googleapis.com/v0/b/viewcrunch-2018.appspot.com/o/images%2F")[1]
  //             .split("%2F")[1]
  //             .split(/~\d.png/)[0]
  //         );
  //         if ((linkHandle.startsWith("@@") ? linkHandle.substr(1) : linkHandle) === myHandle && linkTitle === title) links.push(x);
  //       }
  //     }
  //     return links;
  //   };
  //   const imageLinks = extractStorageLinks();
  //   if (imageLinks) {
  //     for (const downloadUrl of imageLinks) {
  //       const path = decodeURIComponent(downloadUrl.split("o/")[1].split("?")[0]);
  //       await bucket
  //         .file(path)
  //         .delete()
  //         .then(() => true)
  //         .catch((err) => {
  //           throw new TypeError(`deleteImages ${err}`);
  //         });
  //     }
  //   } else {
  //     return true;
  //   }
  // } catch (err) {
  //   // console.log(err);
  //   throw new TypeError(`deleteImages ${err}`);
  // }
};

// "      https://firebasestorage.googleapis.com/v0/b/viewcrunch-2018.appspot.com/o/images%2F%40maduekwepedro%2FWealth%3A%20Freedom%20or%20not~1.png?alt=media&token=db2b4cca-31ae-4ac4-981f-3cf07d10e602
// "

export const convertContentToArray = async (content) => {
  // const contentArray = [],
  //   formerImagesUrl = [];
  // content = await content?.replace(/<Image src="/g, `\n<Image src="`).replace(/layout="fill" \/>/g, `layout="fill" />\n`);
  // for (const x of content?.split("\n")) {
  //   if (x.match(/<Image src="(?=.*" layout="fill" \/>)/gi)) {
  //     const image = x.replace(/<Image src="/g, "").split(`" alt`)[0];
  //     await contentArray.push({ image });
  //     await formerImagesUrl.push(image);
  //   } else {
  //     await contentArray.push(x);
  //   }
  // }
  // return { contentArray, formerImagesUrl };
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
};

/*
 ****************************************************************************
 ***************************** DISCONNECTED *********************************
 ****************************************************************************
 */

// export const uploadImages = async ({ tempLocation, myHandle, title }) => {
//   try {
//     const accessToken = v4();
//     if (!tempLocation || !myHandle || !title) throw new TypeError("incomplete parameters");

//     return await bucket
//       .upload(tempLocation, {
//         destination: `images/@${myHandle}/${title}.png`,
//         gzip: true,
//         uploadType: "media",
//         metadata: {
//           contentType: "image/png",
//           metadata: {
//             firebaseStorageDownloadTokens: accessToken,
//           },
//         },
//       })
//       .then((data) => {
//         const viewDir = data[0];
//         return Promise.resolve(
//           `https://firebasestorage.googleapis.com/v0/b/${process.env.NEXT_PUBLIC_STOR}/o/${encodeURIComponent(
//             viewDir.name
//           )}?alt=media&token=${accessToken}`
//         );
//       })
//       .catch((error) => {
//         throw new TypeError(`uploadImages ${error}`);
//       });
//   } catch (error) {
//     console.log(error);
//     throw new TypeError(`uploadImages ${error}`);
//   }
// };

// export const deleteTempImage = async ({ location, api = "crunch" }) => {
//   try {
//     const fs = require("fs"),
//       path = `./pages/api/${api}/uploads/${location}`;
//     try {
//       fs.statSync(path).isDirectory();
//       fs.rmdirSync(path, { recursive: true }, () => {});
//     } catch (error) {
//       throw new TypeError(`deleteTempImages ${error}`);
//     }
//   } catch (error) {
//     throw new TypeError(`deleteTempImages ${error}`);
//     // console.log(error);
//   }
// };

// here

// const initCrunchImageUpload = async (path) => {
//   try {
//     const fs = require("fs");
//     if (!fs.existsSync(path)) {
//       await fs.mkdirSync(path, { recursive: true });
//     }
//   } catch (error) {
//     console.log("init fatal error", error);
//   }
// };

// const getDirectories = (source) => {
//   const fs = require("fs");
//   console.log({
//     source: fs
//       .readdirSync(source, { withFileTypes: true })
//       .filter((dirent) => dirent.isDirectory())
//       .map((dirent) => dirent.name),
//   });
// };
// //   getDirectories("/");

// export const saveTempImage = async ({ image, myHandle, api = "crunch", imageTitle }) => {
//   return console.log("saveTempImage is deprecated in server functions");
// };
