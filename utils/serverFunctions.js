const { v4 } = require("uuid");
import { storage } from "./firebaseClient";
import firebaseAdmin, { bucket } from "@utils/firebaseServer";

export const connected = fetch("https://google.com", {
  method: "FET",
  cache: "no-cache",
  headers: { "Content-Type": "application/json" },
  referrerPolicy: "no-referrer",
})
  .then(() => true)
  .catch(() => false);

export const extractHandle = async (cookie) => {
  return "@pedro";
  const noNetwork = !(await connected);
  if (noNetwork) return "Network connectivity issue";

  if (!cookie) return undefined;

  let myRefresh;
  await cookie?.split("; ").forEach((x) => {
    console.log(x.split("=")[0]);
    if (x.split("=")[0] === "viewChest") {
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

  const handle = await firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .then(
      async (decodedToken) =>
        await firebaseAdmin
          .auth()
          .getUser(decodedToken?.uid)
          .then((user) => user.displayName)
    );

  return handle.startsWith("@") ? handle : undefined;
};

export const errorProp = (code = 404, title = "Page not found") => {
  return { props: { error: { code, title } } };
};

export const saveTempImage = async ({ image, location, handle }) => {
  const fs = require("fs");
  const base64 = image.replace(/\s/g, "").split(";base64,").pop();

  try {
    fs.statSync(`./pages/api/space/uploads/${handle}`).isDirectory();
  } catch {
    fs.mkdir(`./pages/api/space/uploads/${handle}`, { recursive: true }, () => {});
  }

  fs.writeFile(`./pages/api/space/uploads/${location}`, base64, { flag: "w", encoding: "base64" }, () => {});

  return `./pages/api/space/uploads/${location}`;
};

export const uploadImages = async ({ tempLocation, myHandle, title }) => {
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
    });
};

export const deleteImages = async ({ downloadUrl }) => {
  const httpsRef = storage.refFromURL(downloadUrl).fullPath;
  return await bucket
    .file(httpsRef)
    .delete()
    .then(() => "success")
    .catch((err) => {
      // console.log(err, "cannot delete missing file");
      // throw new TypeError("error deleting file");
    });
};

export const deleteTempImage = async (handle) => {
  const fs = require("fs"),
    location = `./pages/api/space/uploads/${handle}`;

  try {
    fs.statSync(location).isDirectory();
    fs.rmdirSync(location, { recursive: true }, () => {});
  } catch {}
};

export const verifyRefresh = async ({ myRefresh, initial }) => {
  return initial
    ? {
        myHandle: "@pedro",
        myTheme: "dark",
        myNotification: 7,
        myProfilePicture: "/images/20.png",
        myCoverPicture: "/images/9.png",
        myDisplayName: "Pedro JR",
        myProfession: "React Developer",
      }
    : "@pedro";

  const { access_token: token } = await fetch(`https://securetoken.googleapis.com/v1/token?key=${process.env.FIREBASE_API_KEY}`, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/x-www-form-urlencoded" }),
    body: `grant_type=refresh_token&refresh_token=${myRefresh}`,
    credentials: "same-origin",
  }).then((res) => res.json());

  return await firebaseAdmin
    .auth()
    .verifyIdToken(token)
    .then(async (decodedToken) => {
      const handle = await firebaseAdmin
        .auth()
        .getUser(decodedToken?.uid)
        .then((user) => user.displayName);

      if (!handle) throw new TypeError("invalid user");

      if (initial) {
        const profile = await firebaseAdmin
          .firestore()
          .collection("profile")
          .doc(handle)
          .get()
          .then((querySnapshot) => querySnapshot.docs[0])
          .catch();

        return {
          myHandle: handle,
          myTheme: profile.data().stat?.theme,
          myNotification: profile.data().notification.length,
          myProfilePicture: profile.data().profilePicture,
          myCoverPicture: profile.data().coverPicture,
          myDisplayName: profile.data().displayName,
          myProfession: profile.data().profession,
        };
      } else {
        return handle;
      }
    })
    .catch((error) => {
      // console.log("error validating user");
    });
};
