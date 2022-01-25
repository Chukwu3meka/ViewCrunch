export const noOfWord = (x = "") => x.split(" ").length;

export const sleep = (time) => {
  return new Promise((resolve) => setTimeout(resolve, time * 1000));
};

export const trimString = (string = "undefined", lenght = 0) => {
  string = string.toString();
  return string.length > lenght ? `${string.substring(0, lenght).trim()}...` : string;
};

export const time2read = (view = "") => {
  // view = htmlToString(view);
  const wordCount = noOfWord(view);
  const estimatedTime = (wordCount / 200).toFixed(2);
  const seconds = (Number(estimatedTime.split(".")[1]) * 0.6).toPrecision(2);
  const minutes = Math.round(Number(estimatedTime));
  return minutes <= 0 ? `${Math.round(seconds)} sec view` : `${minutes} min view`;
};

export const range = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

export const shortNumber = (x) => {
  const num = Math.round(Number(x));
  if (!Number.isInteger(num)) return "Not a number";
  const numLen = num.toString().length;
  if (numLen <= 3) return num;
  const notation = numLen >= 4 && numLen <= 6 ? "K" : numLen >= 7 && numLen <= 9 ? "M" : "B";
  const denoted = (no) =>
    `${num.toString().substring(0, no)}${
      num.toString().substring(no, no + 1) >= 1 ? `.${num.toString().substring(no, no + 1)}` : ""
    }${notation}`;

  return [4, 7, 10].includes(numLen) ? denoted(1) : [5, 8, 11].includes(numLen) ? denoted(2) : denoted(3);
};

export const fetcher = (url, data) => {
  return fetch(url, {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: data,
    credentials: "same-origin",
  }).then((res) => res.json());
};

export const refToPath = (ref) => `/@${ref.split("@")[1]}/${ref.split("@")[2]}`;

// export const ref = (docRef, lastVisible) => (lastVisible ? docRef.startAfter(lastVisible) : docRef).get();

const imageObjectConverter = (blob) => {
  return new Promise((resolve, reject) => {
    let content = "";
    const reader = new FileReader();
    reader.onloadend = (e) => {
      content = e.target.result;
      resolve(content);
    };
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(blob);
  });
};

export const imageObject = async (image) => {
  const content = await imageObjectConverter(image);
  const result = content.split(/\r\n|\n/);
  return result[0];
};

// export const extractMarkdownImages = async ({ markdown }) => {
//   return await markdown.match(/(?<=!\[(.*?)]\()(.*?)(?=\s*\))/gi);
// };

// export const htmlToString = (content = <div>nothing to convert</div>) => {
//   // const server = require("react-dom/server");
//   // // return content;
//   // return server
//   //   .renderToStaticMarkup(content)
//   //   .replace(/<[^>]+>/g, "")
//   //   .replace(/<img (.*?)\/>/g, "")
//   //   .replace(/<!--(.*?)-->/g, "");
//   //   .trim()
//   //   .replace(/&amp;/g, "&")
//   //   .replace(/&lt;/g, "<")
//   //   .replace(/&gt;/g, ">")
//   //   .replace(/&quot;/g, '"')
//   //   .replace(/&#x27;/g, "'")
//   //   .replace(/&#x2F;/g, "/");
// };

export const chunkArray = ({ array = [], chunkSize = 13 }) => {
  if (!array.length) return [];
  const chunk = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunk.push(array.slice(i, i + chunkSize));
  }
  return chunk;
};

export const dateCalculator = ({ date, days }) => {
  const diffInDays = Math.round((new Date() - new Date(date)) / (1000 * 60 * 60 * 24)) - 1;

  if (days) return diffInDays;

  switch (true) {
    case diffInDays < 7:
      return diffInDays < 1 ? "today" : diffInDays < 2 ? "Yesterday" : `${diffInDays} days ago`;
    case diffInDays < 28:
      return diffInDays > 7 ? `${Math.ceil(diffInDays / 7)} weeks ago` : "Last  week";
    case diffInDays < 365:
      return diffInDays > 30 ? `${Math.ceil(diffInDays / 30)} months ago` : "Last month";
    case diffInDays < 3650:
      return diffInDays > 365 ? `${Math.ceil(diffInDays / 365)} years ago` : "Last year";
    default:
      // return diffInDays >= 3650 ? `${Math.ceil(diffInDays / 3650)} decades past` : "A decade past";
      return date;
  }
};

// export const toId = (a, b) => (b ? `${a}@${b}`.replace(/ /g, "-").toLowerCase() : a.replace(/ /g, "-").toLowerCase());
export const toId = (a) => a.replace(/ /g, "-").toLowerCase();

export const dateDiff = (date) => Math.round((new Date() - new Date(date)) / (1000 * 60 * 60 * 24)) - 1;

//filter to remove duplicate .filter((v, i, a) => a.indexOf(v) === i);
