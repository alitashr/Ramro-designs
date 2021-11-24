console.log("process.env.PUBLIC_URL.trim()", process.env.PUBLIC_URL.trim())
export const CDN_domain =
  process.env.PUBLIC_URL.trim() !== "" ? process.env.PUBLIC_URL + "/" : "./assets";
