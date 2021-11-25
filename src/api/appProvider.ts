import { fileItem } from "../interfaces/design";
import HttpClient from "./httpClient";


console.log("process.env.PUBLIC_URL.trim()", process.env.PUBLIC_URL.trim());
export const CDN_domain = process.env.PUBLIC_URL.trim() !== "" ? process.env.PUBLIC_URL + "/" : "./assets";
let provider = "appproviderv3.aspx";
const API_KEY = "apikey";
let apikey:string;
let cacheLocation: string = '';

export const build = "v3";
const REMOTE_SERVER = `https://${build}.explorug.com`;
export const domain = REMOTE_SERVER;
export const assetsDomain =
  build === "v3" ? "https://d1tvaiszosdaib.cloudfront.net" : `${domain}/Assets`;


const getCacheLocationFromUrl = (url: string) => url.split("/")[2];
const processPath = (path:string, thumbFromCDN = true) => {
  const s = path.split("/").map(encodeURIComponent);
  if (s[1] === "Assets" && thumbFromCDN) {
    const ss = s.slice(2);
    return `${assetsDomain}/${ss.join("/")}`;
  } else {
    return `${domain}${path}`;
  }
};
export const getApiKey = () => {
  if (!apikey) apikey = sessionStorage.getItem(API_KEY) || '';
  return apikey;
};

const postHttpClient = (data:FormData, config={}, sendErrorReport = true) => {
  return new Promise((resolve, reject) => {
    HttpClient.post(`${domain}/${provider}`, data, config)
      .then((response) => resolve(response.data))
      .catch((error) => {
        //if (sendErrorReport) postErrorReport(error, data);
        reject(error);
      });
  });
};

const postWithRetry = (data:FormData) => {
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
export const fetchApiKey = ({ username, password, encrypted = false }: {username: string; password: string, encrypted:boolean}) =>  {
  let data = new FormData();
  data.append("action", "login");
  data.append("username", username);
  data.append("password", password);
  if (encrypted) {
    data.append("encrypted", (encrypted).toString());
  }
  return new Promise((resolve, reject) => {
    postWithRetry(data)
      .then((res:any) => {
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
  const username = 'o1dd' ;//sessionStorage.getItem("username") || "";
  const password = 'oodd';//sessionStorage.getItem("password") || "";
  const key =  sessionStorage.getItem(API_KEY) ||'';
  return new Promise((resolve, reject) => {
 if (key !== "") {
      fetchApiKey({username, password, encrypted:true})
        .then((key) => {
          return;
        })
        .catch(()=>{reject("NO_LOGIN_PAGE")});
    } else {
      const key = sessionStorage.getItem(API_KEY);
      if (key) resolve(key);
      else reject("NO_LOGIN_PAGE");
      return;
    }
  });
};
export const fetchDesignList = ({struct}:{struct: boolean}) =>  {
  //const { struct } = params;
  let data = new FormData();
  data.append("action", "designlist");
  data.append("key", getApiKey());
  if (struct) {
    data.append("mode", "struct");
  }
  return new Promise((resolve, reject)=>{
    postHttpClient(data)
    .then(resolve)
    .catch((err)=>{
      reject(err)
    })
  })
};

export const getDesignThumbnails = ({designs}: {designs:fileItem[]})=>{
  const fullpaths = designs.map((item) => item.fullPath);
  const thumbFromCDN = true;
  const showThumbTexture = false;
  let data = new FormData();
  data.append("action", "designthumbs");
  data.append("key", getApiKey());
  data.append("files", JSON.stringify(fullpaths));
  if (showThumbTexture) data.append("texture", '1');
  return postWithRetry(data).then((thumbList:any)=>{
    return designs.map((childFile)=>{
      const item = thumbList.find((item:any) => item &&  item.Name === childFile.fullPath);
      let add = {};
      if (item) {
        //const hash = MD5(JSON.stringify(item.Props));
        const path = processPath(item.Thumb, thumbFromCDN);
        let thumbUrl = `${path}`;
        add = { thumbUrl, designProps: item.Props };
        cacheLocation = getCacheLocationFromUrl(item.Thumb);
      }
      return { ...childFile, ...add };
    })
  })
}