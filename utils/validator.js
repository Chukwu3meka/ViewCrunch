const sanitize = (value) => {
  const maps = { "&": "&amp", "<": "&lt", ">": "&gt", '"': "&quot", "'": "&#x27", "/": "&#x2F" };
  const sanitizeReg = /[&<>"'/"]/gi;
  const sanitized = value.replace(sanitizeReg, (match) => maps[match]);
  return sanitized;
};
const validate = (valueType, value) => {
  switch (valueType) {
    case "handle": {
      const handle = value?.trim().startsWith("@") ? value.substr(1).toLowerCase() : "";
      // const status = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s@!~#^$*']{2,14}$/gim.test(handle);
      // const status = /^(?!.*\.\.)(?!.*\.$)[^\W][\w]{2,14}$/gim.test(handle);
      const status = /^[a-zA-Z0-9_]{3,13}$/gim.test(handle);
      if (status) return value;
      return undefined;
    }
    case "title": {
      let status = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s\-:()]{12,151}$/gim.test(value.trim());
      if (status && value.split(" ").length >= 3 && value.split(" ").length <= 20) return value;
      return undefined;
    }
    case "description": {
      let status = /^(?!.*\.\.)(?!.*\.$)[^\W][\w+.\s\-:(),?';]{49,214}$/gim.test(value.trim());
      if (status && value.split(" ").length >= 3 && value.split(" ").length <= 70) return value;
      return undefined;
    }
    case "keywords": {
      let status = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s,]{2,101}$/gim.test(value.trim());
      if (status && value.split(",").length >= 1 && value.split(",").length <= 5) return value;
      return undefined;
    }
    case "text": {
      const newValue = value;
      const reg = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s\-']{2,200}$/gim;
      let status = reg.test(newValue.trim());
      if (status === true) return sanitize(newValue);
      return false;
    }
    case "string": {
      const newValue = value;
      const reg = /^(?!.*\.\.)(?!.*\.$)[^\W][\w\W]{2,999}$/gim;
      let status = reg.test(newValue) && newValue.length > 0;
      if (status === true) return newValue;
      return false;
    }

    default:
      return false;
  }
};

export default validate;
