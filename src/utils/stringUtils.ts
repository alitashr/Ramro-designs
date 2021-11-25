export const getPathOffile = (fileFullPath: string) => {
  const sp = fileFullPath.split("/");
  sp.pop();
  return sp.join("/");
};

export const createUriSafe = (uriString : string) => {
  const enc = uriString.split("/").map(encodeURIComponent);
  return enc.join("/");
};
