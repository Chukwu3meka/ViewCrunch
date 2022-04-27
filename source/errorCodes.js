const errorCodes = {
  1000: { code: 404, title: "Internet not connected" },
  1001: { code: 401, title: "You're not authenticated" },
  1002: { code: 400, title: "Cookies tampered" },
  1003: { code: 400, title: "Refresh Token not returned" },
  1004: { code: 400, title: "Invalid Refresh Token" },
  1005: { code: 400, title: "Invalid UID" },
  1006: { code: 400, title: "Profile not found" },
  1007: { code: 400, title: "Profile is Suspended temporarily" },
  1008: { code: 451, title: "Writing disabled for this user" },
  1009: { code: 400, title: "" },
  1010: { code: 400, title: "" },
  1011: { code: 400, title: "" },
};

export default errorCodes;
