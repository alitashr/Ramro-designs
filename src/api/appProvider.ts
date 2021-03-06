import { resolve } from "dns";
import { fileItem } from "../interfaces/design";
import { createCanvas, getLogoCanvas } from "../utils/canvasUtils";
import { convertTilePointToName, createUriSafe } from "../utils/stringUtils";
import HttpClient from "./httpClient";
import { readImage } from "../utils/domUtils";

console.log("process.env.PUBLIC_URL.trim()", process.env.PUBLIC_URL.trim());
export const CDN_domain = process.env.PUBLIC_URL.trim() !== "" ? process.env.PUBLIC_URL + "/" : "./assets";
let provider = "appproviderv3.aspx";
const API_KEY = "apikey";
let apikey: string;
let cacheLocation: string = "";

export const build = "v3";
const REMOTE_SERVER = `https://${build}.explorug.com`;
export const domain = REMOTE_SERVER;
export const assetsDomain = build === "v3" ? "https://d1tvaiszosdaib.cloudfront.net" : `${domain}/Assets`;

const getCacheLocationFromUrl = (url: string) => url.split("/")[2];
const processPath = (path: string, thumbFromCDN = true) => {
  const s = path.split("/").map(encodeURIComponent);
  if (s[1] === "Assets" && thumbFromCDN) {
    const ss = s.slice(2);
    return `${assetsDomain}/${ss.join("/")}`;
  } else {
    return `${domain}${createUriSafe(path)}`;
  }
};
export const getApiKey = () => {
  if (!apikey) apikey = sessionStorage.getItem(API_KEY) || "";
  return apikey;
};

const postHttpClient = (data: FormData, config = {}, sendErrorReport = true) => {
  return new Promise((resolve, reject) => {
    HttpClient.post(`${domain}/${provider}`, data, config)
      .then((response) => resolve(response.data))
      .catch((error) => {
        //if (sendErrorReport) postErrorReport(error, data);
        reject(error);
      });
  });
};

const postWithRetry = (data: FormData) => {
  return new Promise((resolve, reject) => {
    let numtries = 0;
    const fetchData = () => {
      postHttpClient(data, {}, false)
        .then(resolve)
        .catch((error) => {
          numtries++;
          if (numtries <= 5) fetchData();
          else {
            //postErrorReport(error, data);
            reject(error);
          }
        });
    };
    fetchData();
  });
};
export const fetchApiKey = ({
  username,
  password,
  encrypted = false,
}: {
  username: string;
  password: string;
  encrypted: boolean;
}) => {
  let data = new FormData();
  data.append("action", "login");
  data.append("username", username);
  data.append("password", password);
  if (encrypted) {
    data.append("encrypted", encrypted.toString());
  }
  return new Promise((resolve, reject) => {
    postWithRetry(data)
      .then((res: any) => {
        const key = res.Key;
        if (!key) reject("INVALID CREDENTIALS");
        else {
          sessionStorage.setItem("page", username);
          sessionStorage.setItem(API_KEY, key);
          resolve(key);
        }
      })
      .catch(reject);
  });
};

export const login = () => {
  const username = "o1dd"; //sessionStorage.getItem("username") || "";
  const password = "oodd"; //sessionStorage.getItem("password") || "";
  const key = sessionStorage.getItem(API_KEY) || "";
  return new Promise((resolve, reject) => {
    if (key !== "") {
      fetchApiKey({ username, password, encrypted: true })
        .then((key) => {
          return;
        })
        .catch(() => {
          reject("NO_LOGIN_PAGE");
        });
    } else {
      const key = sessionStorage.getItem(API_KEY);
      if (key) resolve(key);
      else reject("NO_LOGIN_PAGE");
      return;
    }
  });
};
export const fetchDesignList = ({ struct }: { struct: boolean }) => {
  //const { struct } = params;
  let data = new FormData();
  data.append("action", "designlist");
  data.append("key", getApiKey());
  if (struct) {
    data.append("mode", "struct");
  }
  return new Promise((resolve, reject) => {
    postHttpClient(data)
      .then(resolve)
      .catch((err) => {
        reject(err);
      });
  });
};

export const getDesignThumbnails = ({ designs }: { designs: fileItem[] }) => {
  const fullpaths = designs.map((item) => item.fullPath);
  const thumbFromCDN = true;
  const showThumbTexture = false;
  let data = new FormData();
  data.append("action", "designthumbs");
  data.append("key", getApiKey());
  data.append("files", JSON.stringify(fullpaths));
  if (showThumbTexture) data.append("texture", "1");
  return postWithRetry(data).then((thumbList: any) => {
    return designs.map((childFile) => {
      const item = thumbList.find((item: any) => item && item.Name === childFile.fullPath);
      let add = {};
      if (item) {
        //const hash = MD5(JSON.stringify(item.Props));
        const path = processPath(item.Thumb, thumbFromCDN);
        let thumbUrl = `${path}`;
        add = { thumbUrl, designProps: item.Props };
        cacheLocation = getCacheLocationFromUrl(item.Thumb);
      }
      return { ...childFile, ...add };
    });
  });
};

export const fetch1xFullDesign = (fileFullPath: string) => {
  //const { struct } = params;
  let data = new FormData();
  data.append("action", "rendereddesign");
  data.append("key", getApiKey());
  data.append("file", fileFullPath);
  return new Promise((resolve, reject) => {
    postHttpClient(data)
      .then(resolve)
      .catch((err) => {
        reject(err);
      });
  });
};

const fetchVisualizationTiles = ({
  file,
  zoom,
  tiles,
  props,
  felt = 0,
}: {
  file: string;
  zoom: number;
  tiles: any;
  props: any;
  felt: number;
}) => {
  felt = felt ? 1 : 0;
  let data = new FormData();
  data.append("action", "visualizationtiles");
  data.append("key", getApiKey());
  data.append("file", file);
  data.append("zoom", zoom + "");
  data.append("felt", felt + "");
  data.append("tiles", JSON.stringify(tiles));
  if (props) data.append("props", JSON.stringify(props));
  //return postHttpClient(data).then(processPath);
  return postWithRetry(data);
};
interface getRenderedDesignProps {
  fullpath: string;
  designDetails: any;
  Width: number;
  Height: number;
  KLRatio: number;
  applyKLRatio: boolean;
  zoom: number;
  hash?: string;
}
interface tilepoint {
  x: number;
  y: number;
  z: number;
  name: string;
  image?: HTMLImageElement;
}
export const getRenderedDesign = async (props: getRenderedDesignProps) => {
  var { fullpath, hash, designDetails, Width, Height, applyKLRatio = true, zoom = 1, KLRatio } = props;

  return new Promise((resolve, reject) => {
    const tileSize = 256;
    const canvasWidth = Width * zoom;
    const canvasHeight = Height * zoom;
    if (!applyKLRatio) KLRatio = 1;

    const canvas = createCanvas(canvasWidth, canvasHeight * KLRatio);

    let xTotal = Math.floor((canvasWidth - 1) / 256) + 1;
    let yTotal = Math.floor((canvasHeight - 1) / 256) + 1;
    let tilepoints: tilepoint[] = [];
    for (let x = 0; x < xTotal; x++) {
      for (let y = 0; y < yTotal; y++) {
        tilepoints.push({ x, y, z: zoom, name: convertTilePointToName(x, y) });
      }
    }
    const context = canvas.getContext("2d");

    fetchVisualizationTiles({
      file: fullpath,
      zoom: 1,
      felt: 0,
      props: designDetails,
      tiles: tilepoints.map((item) => item.name),
    }).then((basePath) => {
      if (basePath && typeof basePath === "string") {
        basePath = processPath(basePath);
      }
      let tileImagesLoaded = 0;

      // console.log("returnnewPromise -> basePath", basePath, tilepoints);
      tilepoints.forEach((tilePoint, index) => {
        const img = document.createElement("img");
        img.setAttribute("crossOrigin", "Anonymous");
        const { name } = tilePoint;
        let filename = `${basePath}/${name}.rendered.jpg`;
        if (hash && hash !== "") {
          filename = `${filename}?t=${hash}`;
        }
        img.src = filename;
        tilePoint.image = img;
        img.onload = () => {
          drawSingleTileInDesignCanvas(index);
          if (tileImagesLoaded + 1 === tilepoints.length) {
            drawWaterMarkIfNeeded();
          }
          tileImagesLoaded++;
        };
      });
      const drawSingleTileInDesignCanvas = (index: number) => {
        const tilepoint = tilepoints[index];
        const startX = tilepoint.x * tileSize;
        const startY = tilepoint.y * tileSize * KLRatio;
        if (tilepoint.image)
          context?.drawImage(tilepoint.image, startX, startY, tilepoint.image.width, tilepoint.image.height * KLRatio);
      };
    });

    function drawWaterMarkIfNeeded() {
      const hasWatermark = true,
        logoUrl = `${CDN_domain}/icons/logo.png`,
        watWid = 100,
        opacity = 0.5,
        position = [0.5, 0.5];

      if (!hasWatermark || !logoUrl) {
        resolve(canvas);
        return;
      }
      getLogoCanvas().then((logoCanvas: HTMLCanvasElement) => {
        if (logoCanvas) {
          const width = watWid * 3 * zoom;
          const height = (logoCanvas.height * width) / logoCanvas.width;

          let padding = 15;
          const padx = position[1] === 0.0 ? -padding : position[1] === 1.0 ? padding : 0;
          const pady = position[0] === 0.0 ? -padding : position[0] === 1.0 ? padding : 0;
          const startx = position[1] * (canvasWidth - width) - padx;
          const starty = position[0] * (canvasHeight - height) - pady;

          if (context?.globalAlpha) context.globalAlpha = opacity;
          context?.drawImage(logoCanvas, startx, starty, width, height);
          resolve(canvas);
        }
      });
    }
  });
};
