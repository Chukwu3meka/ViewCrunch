import { range, toId } from "@utils/clientFunctions";
export const date = () => new Date(range(2018, 2020), range(0, 11), range(0, 30)).toDateString();

export const name1 = [
  "Pedro",
  "Dorothy",
  "Camilla",
  "Bob",
  "Mayor",
  "Micheal",
  "Yungcode",
  "Pablo",
  "Kross",
  "Mario Puzo",
  "Crucifixio",
  "Maximillian",
  "Kolbe",
  "Sacramento",
  "Francis",
  "Uriel",
  "Immobile",
  "Spray",
  "Ocean",
  "Yung",
  "Benjamin",
  "Franklin",
  "Roosevelt",
  "Ward",
  "Tyga",
  "Wayne",
  "Silva",
  "Future",
  "Morning Dew",
  "ViewCrunch",
];

const name2 = [
  "Universal",
  "Lifehack",
  "Career 101",
  "Justnow",
  "Software Developers",
  "Cyber Security",
  "Politics",
  "Warfare",
  "Catholic Church",
  "Investment",
];

const name3 = [
  "What is the use of dynamics routes in Next JS without creating the popular custom server and limiting the capabilities of Next JS",
  "My Favorite Top  10 daily life hacks that keeps me going, are not limited to Safety, Performance, Rules Playing but   Satisfaction and Efficiency",
  "In sint ex est nulla ad.",
  "Proident aliquip do sunt et sint consequat aute.",
  "Culpa nostrud dolor anim non ut est do ea aute amet dolor pariatur ea.",
  "Ea sunt eu non irure.",
  "Nostrud laboris aute fugiat ullamco ipsum et eiusmod amet reprehenderit fugiat deserunt.",
  "Labore enim qui laborum aliqua irure pariatur laborum ut ullamco anim esse aute veniam.",
  "Cupidatat pariatur velit incididunt non voluptate.",
  "Est ad exercitation enim aliquip in ex eiusmod cillum.",
  "Ad cupidatat qui irure aute esse sunt reprehenderit minim nulla excepteur enim ullamco est tempor.",
  "Why you should use Local Storage over  Cookies in your next  Next JS web application without considering any pros or cons",
  "Benefits of Carrots",
  "Outcome of Covid-19",
  "Ea occaecat labore Lorem nisi elit veniam dolore proident.",
  "Mollit ullamco pariatur consequat eu pariatur mollit quis ipsum do ex veniam officia exercitation elit.",
  "Sunt minim sunt ea laborum cupidatat anim exercitation quis incididunt nulla.",
  "Duis anim ullamco ex consectetur non.",
  "Veniam Lorem occaecat dolor nostrud amet ea ex officia aute adipisicing labore Lorem. Do adipisicing sunt qui laboris exercitation enim.",
  "Proident mollit ad ex occaecat amet tempor ullamco amet consectetur aute exercitation id.",
  "Sunt sunt duis aliqua nostrud veniam deserunt excepteur officia exercitation eiusmod aute mollit tempor pariatur. Adipisicing occaecat irure sint pariatur duis eiusmod id fugiat pariatur ex.",
  "Books Top Picks",
  "Countries with the best data",
  "latest trend in tech",
];

const profession = [
  "React developer",
  "Student",
  "Bsc Computer Science",
  "Cupidatat anim id deserunt tempor sit pariatur deserunt anim proident eiusmod nostrud deserunt exercitation pariatur.",
  "Duis do laborum irure culpa consectetur sit officia commodo voluptate enim aliqua ut minim.",
  "Excepteur elit irure amet anim eu exercitation laboris culpa veniam ut Lorem.",
  "Enim culpa officia deserunt sit quis id eu et.",
  "Sint consectetur cillum adipisicing nostrud magna est elit ullamco quis nulla quis officia enim eiusmod.",
  "Qui ea labore non aliquip labore.",
];

const content = `<b>Wealth advice: The rules of wealth</b>
<h2>we are there</h2>
  <ol>
        <li>
          Anybody can make money - it isn't selective or discriminatory 
          <Image src="/images/${range(0, 10)}.png" alt="title" layout="fill" />
        </li>
<code>console.log("hey")
const jass = "Jazza"
// this is an oustanding code block design
jass.map()
</code>
        <li>Decide your definition of wealth </li>
        <li> Most people are too lazy to be lazy </li>
        <li> Understand your money is a consequence, not a reward <Image src="/images/${range(
          11,
          15
        )}.png" alt="title" layout="fill" /> </li>
        <li> If you see money as the solution you'll find it becomes the problem  </li>
        <li> You can make lots of money, you can enjoy your job, and sleep nights </li>
        <li> Know the differnces between price and value </li>
        <li> It harder to manage yourself than it is to manage your money </li>
        <li> It's never to late to start getting wealthy <Image src="/images/${range(16, 20)}.png" alt="title" layout="fill" /> </li>
        <li> You have to work hard to get rich enough not to have to work hard </li>
        <li> Small economies won't make you wealthy but they will make you miserable</li>
        <li> Spend less than you earn</li>
        <li> Don't borrow money - unless you really, really have to</li>
        <li> Cultivate a skill and it'll repay you over and over again <Image src="/images/${range(
          21,
          30
        )}.png" alt="title" layout="fill" /></li>
        <li> Don't be to busy earning a living to make some money </li>
        <li> Don't believe you can always win </li>
        <li> Don't answer ads that promise get-rich-quick schemes - it won't be you who get rich quick</li>
        <li> Don't ever believe you are only worth what you are being paid</li>
        <li> Shop for quality <Image src="/images/${range(31, 40)}.png" alt="title" layout="fill" /></li>
        <li> Never lend money to friends or family unless you are prepared to write it off</li>
      </ol>`;

export const viewer = name1.map((name) => ({
  handle: toId(`@${name}`),
  profilePicture: `/images/${range(0, 40)}.png`,
  coverPicture: `/images/${range(0, 40)}.png`,
  about:
    "Adipisicing nulla adipisicing irure culpa aute cillum. Commodo nulla culpa proident id commodo esse fugiat officia velit. Cillum qui                reprehenderit adipisicing id.",

  roles: { comment: true, vote: true, suspended: false, moderate: true, createCrunch: true },
  crunches: name2.map((title) => ({ title: toId(title), roles: { publish: true, delete: true, retouch: true, moderate: false } })),
  displayName: name,
  profession: profession[range(0, profession.length - 1)],
  notification: [
    {
      body: "To understand more on what ViewCrunch is all about visit this page at anytime",
      link: "/control/faq#about",
      title: "About ViewCrunch",
    },
    {
      body: "Visit the link at the bottom of any page on ViewCrunch to read more on our 'terms and condition' and 'privacy policy'",
      link: "/control/faq",
      title: "FAQ: Frequently Asked Question",
    },
    { body: "Have a product or service to advertise on ViewCrunch", link: "/control/adverise", title: "Advertise" },
    { body: "Make suggestions here, or contact the developer", link: "/control/contact", title: "Contact Us" },
  ],
  favourite: [
    { link: "/control/adverise", title: "Have a product or service to advertise on ViewCrunch" },
    { link: "/control/contact", title: "Make suggestions here, or contact the developer" },
  ],
  blacklist: [],
  published: name3.map((title) => ({
    title,
    id: toId(title),
    date: date(),
    views: range(0, 4000000),
    pryImage: `/images/${range(0, 40)}.png`,
    upvote: range(0, 700000),
    downvote: range(0, 100000),
    crunch: range(0, name2.length - 1),

    // [`published.${viewId}`]: {
    //   title,
    //   date: firebaseAdmin.firestore.Timestamp.now(),
    //   pryImage: pryImageURL[0] || `/images/no-image.webp`,
    //   title,
    //   upvote: 0,
    //   downvote: 0,
    //   crunch,
    // },
  })),
  chat: {
    blocked: name1.map((handle) => toId(`@${handle || "Pedro JR"}`)).slice(0, 3),
    following: name1.map((handle) => toId(`@${handle || "Pedro JR"}`)).slice(3, 20),
    followers: name1.map((handle) => toId(`@${handle || "Pedro JR"}`)).slice(20, name1.length - 1),
  },
  social: {
    twitterHandle: "ViewCrunch",
    facebookHandle: "ViewCrunch",
    linkedinHandle: "ViewCrunch",
    personalWebsite: "https://www.ViewCrunch.com",
  },
  stat: {
    voteSent: range(0, 10000000),
    voteReceived: range(0, 10000000),
    audience: range(0, 100000),
    profileCreated: date(),
    seen: name3.slice(0, 7).map((title) => ({ viewId: toId(title), author: "@maduekwepedro" })),
    theme: "dark",
  },
}));

const generateComment = () => ({
  author: `@${toId(name1[range(0, name1.length - 1)])}`,
  date: date(),
  comment: "nothing much written here, just a sample comment",
});

export const view = name3.map((title) => ({
  id: toId(title),
  title: {
    data: title,
    length: title.split(" ").length,
  },
  date: date(),
  author: viewer[range(0, viewer.length - 1)].handle,
  crunch: name2[range(0, name2.length - 1)],
  pryImage: `/images/${range(1, 40)}.png`,
  content,
  keywords: "keywords",
  description: "description",
  comments: [...Array(range(0, 100)).keys()].map(() => generateComment()),
  upvote: [...Array(range(0, 10000)).keys()].map(() => "@pedro"),
  downvote: [...Array(range(0, 10000)).keys()].map(() => "@pedro"),
  visible: false,
}));

export const news = [
  {
    flash: `SoccerMASS.com set to release awesome Interface and Experience; Full remodeling of football and player activies being discussed`,
    source: "SoccerMASS",
    newsLink: "https://www.soccermass.com",
    date: date(),
  },
  {
    flash: `'Not Justice': Anger in Louisville after Breonna Taylor charges; Court silence provokes justice`,
    source: "france24",
    newsLink: "https://www.france24.com",
    date: date(),
  },
  {
    flash: "Persucution around the world, from third world countries to full democratic nations",
    source: "ViewCrunch",
    newsLink: "https://www.ViewCrunch.com",
    date: date(),
  },
  {
    flash: `Two police officers shot after grand jury decides not to pursue murder or manslaughter charge in 26-year-old's death`,
    source: "france24",
    newsLink: "https://www.france24.com",
    date: date(),
  },
  {
    flash:
      "How do we tackle an 'infodemic' amid a pandemic?; Approaching two years since the onset of Covid-19, yet no lasting solution",
    source: "Aljazeera",
    newsLink: "https://www.aljazeera.com",
    date: date(),
  },
];
