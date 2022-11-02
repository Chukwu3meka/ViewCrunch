module.exports = {
  reactStrictMode: true,
  env: {
    SERVER_URL: process.env.NODE_ENV === "production" ? "https://www.viewcrunch.com" : "http://localhost:3000",
  },
  images: {
    domains: ["platform-lookaside.fbsbx.com", "firebasestorage.googleapis.com", "scontent-atl3-2.xx.fbcdn.net", "pbs.twimg.com"],
  },
};
