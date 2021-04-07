const sanitize = (value) => {
  const maps = { "&": "&amp", "<": "&lt", ">": "&gt", '"': "&quot", "'": "&#x27", "/": "&#x2F" };
  const sanitizeReg = /[&<>"'/"]/gi;
  const sanitized = value.replace(sanitizeReg, (match) => maps[match]);
  return sanitized;
};
const validate = (valueType, value) => {
  switch (valueType) {
    case "text": {
      const newValue = value;
      const reg = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s\-']{2,200}$/gim;
      let status = reg.test(newValue.trim());
      if (status === true) return sanitize(newValue);
      return false;
    }
    case "handle": {
      const handle = value?.startsWith("@") ? value.substr(1).toLowerCase() : undefined;
      const status = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.\s@!~#^$*']{2,14}$/gim.test(handle);
      console.log(status, value, handle);
      if (status) return value;
      return undefined;
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
