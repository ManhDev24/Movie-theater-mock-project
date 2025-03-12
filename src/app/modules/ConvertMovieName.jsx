export const MovieNameToSlug = (str) => {
  return str.toLowerCase().replace(/\s+/g, "-");
};
export const MovieNameFromSlug = (slug) => {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
