import { MD5 } from "./md5";

export const getPathOffile = (fileFullPath: string) => {
  const sp = fileFullPath.split("/");
  sp.pop();
  return sp.join("/");
};

export const createUriSafe = (uriString: string) => {
  const enc = uriString.split("/").map(encodeURIComponent);
  return enc.join("/");
};
export const leftFillNum = (num: number, targetLength: number) => num.toString().padStart(targetLength, "0");

export const convertTilePointToName = (i: number, j: number) => `${leftFillNum(i, 2)}_${leftFillNum(j, 2)}`;

export const generateHash = (details: any, fullPath = "") => {
  const des = JSON.stringify(details);
  return MD5(des + fullPath);
};

export const getPriceFromPath = (path: string) => {
  var folderName = "";
  if (path && path !== "") {
    folderName = path.split("/")[1];
    folderName = folderName.split(" ")[0];
  }
  return folderName;
};
