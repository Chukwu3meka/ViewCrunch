const sanitize = (value) => {
  const maps = { "&": "&amp", "<": "&lt", ">": "&gt", '"': "&quot", "'": "&#x27", "/": "&#x2F" };
  const sanitizeReg = /[&<>"'/"]/gi;
  const sanitized = value.replace(sanitizeReg, (match) => maps[match]);
  return sanitized;
};

const validate = (valueType, value) => {
  value = value.trim();
  switch (valueType) {
    case "handle": {
      const handle = value?.startsWith("@") ? value.substr(1).toLowerCase() : "";
      // const status = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s@!~#^$*']{2,14}$/gim.test(handle);
      // const status = /^(?!.*\.\.)(?!.*\.$)[^\W][\w]{2,14}$/gim.test(handle);
      const status = /^[a-zA-Z0-9_]{3,13}$/gim.test(handle);
      if (status && !["favourite", "news", "notification", "crunch", "info", "handle", "viewcrunch"].includes(handle)) return value;
      return undefined;
    }
    case "title": {
      let status = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s\-:()]{12,151}$/gim.test(value);
      if (status && value.split(" ").length >= 3 && value.split(" ").length <= 20) return value;
      return undefined;
    }
    case "description": {
      let status = /^(?!.*\.\.)(?!.*\.$)[^\W][\w+.\s\-:(),?';]{49,214}$/gim.test(value);
      if (status && value.split(" ").length >= 3 && value.split(" ").length <= 70) return value;
      return undefined;
    }
    case "keywords": {
      let status = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s,]{2,101}$/gim.test(value);
      if (status && value.split(",").length >= 1 && value.split(",").length <= 5) return value;
      return undefined;
    }
    case "twitterHandle":
    case "facebookHandle":
    case "linkedinHandle": {
      const status = /^[a-zA-Z0-9_-]{3,20}$/gim.test(value);
      if (status) return value;
      return undefined;
    }
    case "website": {
      const status = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{7,30}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gim.test(
        value
      );
      if (status) return value;
      return undefined;
    }
    case "displayName": {
      const status = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s\-']{3,30}$/gim.test(value);
      if (status === true) return sanitize(value);
      return false;
    }
    case "profession": {
      const status = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s\-']{5,20}$/gim.test(value);
      if (status === true) return sanitize(value);
      return false;
    }
    case "about": {
      const status = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s\-']{13,300}$/gim.test(value);
      if (status === true) return sanitize(value);
      return false;
    }
    case "email": {
      if (!value) return null;
      value = value.toLowerCase();
      const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/;
      return (reg.test(value) && value.split("@")[0].length >= 5 && value.split("@")[0].length <= 30) || null;
    }
    case "comment": {
      value = sanitize(value);
      const reg = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s\-']{30,700}$/gim;
      if (status === true) return value;
      return reg.test(value) || false;
    }

    // case "text": {
    //   const newValue = value;
    //   const reg = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s\-']{2,200}$/gim;
    //   let status = reg.test(newValue.trim());
    //   if (status === true) return sanitize(newValue);
    //   return false;
    // }
    // case "string": {
    //   const newValue = value;
    //   const reg = /^(?!.*\.\.)(?!.*\.$)[^\W][\w\W]{2,999}$/gim;
    //   let status = reg.test(newValue) && newValue.length > 0;
    //   if (status === true) return newValue;
    //   return false;
    // }

    default:
      return false;
  }
};

export default validate;
