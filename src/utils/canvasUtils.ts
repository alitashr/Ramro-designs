import { CDN_domain } from "../api/appProvider";

var mainLogoImgLoaded = false;
const canvas = document.createElement("canvas");

export const getLogoCanvas = (): PromiseLike<HTMLCanvasElement> => {
  return new Promise((resolve, reject) => {
    if (mainLogoImgLoaded) {
      resolve(canvas);
    } else {
      var image = new Image();
      image.src = `${CDN_domain}/icons/logo.png`;
      const cxt = canvas.getContext("2d");

      image.onload = function () {
        canvas.width = image.width;
        canvas.height = image.height;
        cxt?.drawImage(image, 0, 0, image.width, image.height);
        mainLogoImgLoaded = true;
        resolve(canvas);
      };
      image.onerror = function () {
        reject("could not load logo image");
      };
    }
  });
};


export const createCanvas = (w:number, h:number) => {
  var canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  return canvas;
};