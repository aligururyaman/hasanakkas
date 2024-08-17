const toSlug = (str) => {
  if (typeof str !== "string") {
    return "";
  }
  return str
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "");
};

export default toSlug;
