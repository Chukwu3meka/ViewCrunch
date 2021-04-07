const profile = (
  state = {
    // myProfilePicture: "/images/20.png",
    // myCoverPicture: "/images/9.png",
    // myHandle: "@pedro",
    // myDisplayName: "Pedro JR",
    // myToken: "jkfgdjkfg889d989d89d",
    // myProfession: "React Developer",
    // myNotification: 10,
    // myTheme: "dark",
  },
  { type, payload }
) => {
  switch (type) {
    case "SET_PROFILE":
      return { ...payload };
    default:
      return state;
  }
};

export default profile;
